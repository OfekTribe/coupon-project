import { NavLink } from "react-router-dom";
import AuthMenu from "../../AuthArea/AuthMenu/AuthMenu";
import "./Menu.css";

function Menu(): JSX.Element {
    return (
        <div className="Menu">
			<h1>Menu</h1>
            <AuthMenu/><br />
            <div className="div2">
            <NavLink to={"/about"}>About Us</NavLink><br /><br />
            <NavLink to={"/coupons"}>Coupons</NavLink><br />
            </div>
        </div>
    );
}

export default Menu;