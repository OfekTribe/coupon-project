import { NavLink } from "react-router-dom";
import "./AdminMenu.css";

function AdminMenu(): JSX.Element {
    return (
        <div className="AdminMenu">
			<NavLink to={"/admin/companies"}>
                <button className="button">Companies</button>
            </NavLink>
        </div>
    );
}

export default AdminMenu;
