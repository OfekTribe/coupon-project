import { useEffect, useRef, useState } from "react";
import "./GetAllCustomers.css";
import Customer from "../../../Models/Customer";
import notificationsService from "../../../Services/NotificationsService";
import CustomerCard from "../../CustomerArea/CustomerCard/CustomerCard";
import { NavLink, useNavigate } from "react-router-dom";
import adminService from "../../../Services/AdminService";
import { authStore } from "../../../Stores/AuthState";

function GetAllCustomers(): JSX.Element {
  const [getCustomers, setCustomers] = useState<Customer[]>([]);
  const navigate = useNavigate();
  const inputRef = useRef(null);

  useEffect(() => {
    if (!authStore.getState().token) {
      notificationsService.error("unauthorize, please log in");
      navigate("/home");
      return;
    }

    adminService
      .getAllCustomers()
      .then((customers) => setCustomers(customers))
      .catch((err) => notificationsService.error(err));
  }, []);

  function getOneCustomer() {
    if (inputRef.current.value > 0)
      navigate("/administrator/customer/" + inputRef.current.value);
  }

  return (
    <div className="GetAllCustomers">
      <NavLink to="/administrator/addCustomer">
        <button className="button-33">Add customer</button>
      </NavLink>
      <br />

      <input type="number" placeholder="id" ref={inputRef} />
      <button className="button-33" onClick={getOneCustomer}>Get customer by id</button>

      <div>
        {getCustomers.map((c) => (
          <CustomerCard key={c.id} customer={c} />
        ))}
      </div>
    </div>
  );
}

export default GetAllCustomers;
