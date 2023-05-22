import { Navigate, Route, Routes } from "react-router-dom";
import "./Routing.css";
import PageNotFound from "../PageNotFound/PageNotFound";
import Login from "../../AuthArea/Login/Login";
import Home from "../Home/Home";
import AboutUs from "../AboutUs/AboutUs";
import { ClientType, Credentials } from "../../../Models/Credentials";

function Routing(): JSX.Element {
  return (
    <div className="Routing">
      <Routes>
        <Route path="/about" element={<AboutUs />}></Route>
        <Route path="/login" element={<Login />}></Route>
      <Route path="/home" element={<Home />} />
      <Route path="/" element={<Navigate to="/home" />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
}

export default Routing;
