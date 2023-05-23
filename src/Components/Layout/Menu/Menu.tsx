import { NavLink } from "react-router-dom";
import AuthMenu from "../../AuthArea/AuthMenu/AuthMenu";
import "./Menu.css";

function Menu(): JSX.Element {
    return (
        <div className="Menu">
			<h1>Menu</h1>
            <AuthMenu/><br />
            <NavLink to={"/about"}>About Us</NavLink><br /><br />
        </div>
    );
}

export default Menu;