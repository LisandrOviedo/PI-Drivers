import axios from "axios";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { useState, useMemo } from "react";

import AboutMe from "./components/AboutMe/AboutMe";
import Driver from "./components/Driver/Driver";
import DriverDetails from "./components/DriverDetails/DriverDetails";
import Drivers from "./components/Drivers/Drivers";
import Landing from "./components/Landing/Landing";
import Login from "./components/Login/Login";
import NavBar from "./components/NavBar/NavBar";
import PageNotFound from "./components/PageNotFound/PageNotFound";
import RegisterDriver from "./components/RegisterDriver/RegisterDriver";
import RegisterUser from "./components/RegisterUser/RegisterUser";
import SearchBar from "./components/SearchBar/SearchBar";

function App() {
  return (
    <div>
      <h1>Vite + React</h1>
    </div>
  );
}

export default App;
