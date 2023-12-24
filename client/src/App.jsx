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
  const [access, setAccess] = useState(false);
  const navigate = useNavigate();
  const URL_SERVER = import.meta.env.VITE_URL_SERVER;

  async function login({ email, password }) {
    const URL_LOGIN = `${URL_SERVER}/login/?email=${email}&password=${password}`;

    try {
      const { data } = await axios(URL_LOGIN);

      const { access } = data;

      setAccess(data);

      access && navigate("/home");
    } catch (error) {
      alert(error.response.data.error);
    }
  }

  function logout() {
    setAccess(false);
    navigate("/");
  }

  useMemo(() => {
    !access && navigate("/");
  }, [access]);

  const { pathname } = useLocation();

  return (
    <div>
      {/* {pathname !== "/" &&
        pathname !== "/register" &&
        pathname !== "/login" && (
          <NavBar
            onSearch={onSearch}
            addRandomCharacter={addRandomCharacter}
            logout={logout}
          />
        )} */}

      <Routes>
        <Route path="*" element={<PageNotFound />} />

        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login login={login} />} />
        {/*<Route
          path="/register"
          element={<RegisterUser register={register} />}
        />
        <Route
          path="/registerDriver"
          element={<RegisterDriver register={register} />}
        />

        <Route
          path="/home"
          element={<Drivers characters={characters} onClose={onClose} />}
        /> */}

        <Route path="/about" element={<AboutMe />} />

        <Route path="/detail/:id" element={<DriverDetails />} />
      </Routes>
    </div>
  );
}

export default App;
