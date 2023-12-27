import axios from "axios";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { useState, useMemo } from "react";

import AboutMe from "./components/AboutMe/AboutMe";
import DriverDetails from "./components/DriverDetails/DriverDetails";
import Drivers from "./components/Drivers/Drivers";
import Landing from "./components/Landing/Landing";
import Login from "./components/Login/Login";
import NavBar from "./components/NavBar/NavBar";
import PageNotFound from "./components/PageNotFound/PageNotFound";
import RegisterDriver from "./components/RegisterDriver/RegisterDriver";
import RegisterUser from "./components/RegisterUser/RegisterUser";

function App() {
  const [access, setAccess] = useState({ access: false });
  const [drivers, setDrivers] = useState([]);
  const navigate = useNavigate();
  const URL_SERVER = import.meta.env.VITE_URL_SERVER;

  async function searchAll() {
    const URL_SEARCHALL = `${URL_SERVER}/`;

    try {
      const { data } = await axios(URL_SEARCHALL);

      if (data[0].name) {
        setDrivers(data);
      }
    } catch (error) {
      window.alert(error.response.data.error);
    }
  }

  async function login({ email, password }) {
    const URL_LOGIN = `${URL_SERVER}/login/?email=${email.toLowerCase()}&password=${password}`;

    try {
      const { data } = await axios(URL_LOGIN);

      const { access } = data;

      setAccess(data);

      access && navigate("/home");
    } catch (error) {
      alert(error.response.data.error);
    }
  }

  async function registerUser({ email, password }) {
    const URL_REGISTER = `${URL_SERVER}/login`;

    try {
      await axios
        .post(URL_REGISTER, {
          email: email.toLowerCase(),
          password: password,
        })
        .then((response) => {
          if (response.status === 201) {
            alert("User successfully registered, you can now log in");
            navigate("/login");
          }
        })
        .catch((error) => alert(error.response.data.error));
    } catch (error) {
      alert(error.response.data.error);
    }
  }

  function logout() {
    setAccess({ access: false });
    alert("See you later! We hope to see you again soon!");
  }

  useMemo(async () => {
    access.access && searchAll();

    !access.access && navigate("/login");
  }, [access]);

  async function onSearch(name) {
    const URL_SEARCH = `${URL_SERVER}/drivers?name=${name}`;

    try {
      const { data } = await axios(URL_SEARCH);

      if (data[0].name) {
        setDrivers(data);
      }
    } catch (error) {
      window.alert(error.response.data.error);
    }
  }

  const [driversPerPage, setDriversPerPage] = useState(9);

  const { pathname } = useLocation();

  return (
    <div>
      {pathname !== "/" &&
        pathname !== "/register" &&
        pathname !== "/login" && (
          <NavBar
            onSearch={onSearch}
            // addRandomCharacter={addRandomCharacter}
            logout={logout}
          />
        )}

      <Routes>
        <Route path="*" element={<PageNotFound />} />

        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login login={login} />} />
        <Route
          path="/register"
          element={<RegisterUser register={registerUser} />}
        />
        {/*<Route
          path="/registerDriver"
          element={<RegisterDriver register={register} />}
        />*/}

        <Route path="/home" element={<Drivers drivers={drivers} />} />

        <Route path="/about" element={<AboutMe />} />

        <Route path="/detail/:id" element={<DriverDetails />} />
      </Routes>
    </div>
  );
}

export default App;
