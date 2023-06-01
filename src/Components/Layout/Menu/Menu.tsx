import { NavLink } from "react-router-dom";
import "./Menu.css";
import { useEffect, useState } from "react";
import { authStore } from "../../../Stores/AuthState";
import AuthMenu from "../../AuthArea/AuthMenu/AuthMenu";
import AboutUs from "../AboutUs/AboutUs";

function Menu(): JSX.Element {
  const [token, setToken] = useState<string>();

  useEffect(() => {
    setToken(authStore.getState().token);
    const unsubscribe = authStore.subscribe(() =>
      setToken(authStore.getState().token)
    );

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <div className="Menu">
      <h2>Menu</h2>
      <AuthMenu />
      <br />
      <NavLink to={"/about"}>
        <button className="button">About Us</button>
      </NavLink>
      <br />
      <br />
      {token && authStore.getState().clientType.toString() == "Admin" && (
        <>
          <NavLink to="/administrator">
            <button className="button">Home</button>
          </NavLink>
          <br />
          <br />
          <NavLink to="/administrator/companies">
            <button className="button">Companies</button>
          </NavLink>
          <br />
          <br />
          <NavLink to="/administrator/customers">
            <button className="button">Customers</button>
          </NavLink>
          <br />
          <br />
          <NavLink to="/administrator/addCompany">
            <button className="button">Add Company</button>
          </NavLink>
          <br />
          <br />
          <NavLink to="/administrator/addCustomer">
            <button className="button">Add Customer</button>
          </NavLink>
          <br />
          <br />
        </>
      )}

      {token && authStore.getState().clientType.toString() == "Company" && (
        <>
          <NavLink to="/company/coupons">
            <button className="button">My Coupons</button>
          </NavLink>
          <br />
          <br />
          <NavLink to="/company/addCoupon">
            <button className="button">Add Coupon</button>
          </NavLink>
          <br />
          <br />
        </>
      )}

      {token && authStore.getState().clientType.toString() == "Customer" && (
        <>
          <NavLink to="/customer">
            <button className="button">Home</button>
          </NavLink>
          <br />
          <br />
          <NavLink to="/customer/coupons">
            <button className="button">My Coupons</button>
          </NavLink>
          <br />
          <br />
        </>
      )}
    </div>
  );
}

export default Menu;
