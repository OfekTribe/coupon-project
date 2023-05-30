import { NavLink, useNavigate } from "react-router-dom";
import AuthMenu from "../../AuthArea/AuthMenu/AuthMenu";
import "./Menu.css";
import { ClientType } from "../../../Models/Credentials";
import { authStore } from "../../../Stores/AuthState";
import { useState, useEffect } from "react";

function Menu(): JSX.Element {
  const navigate = useNavigate();
  const [clientType, setClientType] = useState<ClientType>();

  useEffect(() => {
    setClientType(authStore.getState().userData?.clientType);
    const unsubscribe = authStore.subscribe(() => {
      if (authStore.getState().token) {
        setClientType(authStore.getState().userData.clientType);
      } else {
        navigate("/home");
        window.location.reload();
      }
    })

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

      {clientType?.toString() == "Admin" &&
        <>
          <NavLink to={"/customers"}>
            <button className="button">Customers</button>
          </NavLink>
          <br /><br />
          <NavLink to={"/companies"}>
            <button className="button">Companies</button>
          </NavLink>
        </>
      }
      {clientType?.toString() == "Customer" &&
        <>
          <NavLink to={"/coupons"}>
            <button className="button">Coupons</button>
          </NavLink>
          <br /><br />
        </>
    }
      {clientType?.toString() == "Company" && 
        <>
          <NavLink to={"/addCoupon"}>
            <button className="button">Add Coupon</button>
          </NavLink>
          <br /><br />
          <NavLink to={"/updateCoupon"}>
            <button className="button">Update Coupon</button>
          </NavLink>
        </>
      }
    </div>
  );
}

export default Menu;
