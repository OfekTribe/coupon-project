import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Customer from "../../../Models/Customer";
import AdminService from "../../../Services/AdminService";
import notificationService from "../../../Services/NotificationService";
import "./CustomerDetails.css";

function CustomerDetails(): JSX.Element {
  const [customer, setCustomer] = useState<Customer>();
  const id: number = +useParams().customerId;
  const navigate = useNavigate();

  useEffect(() => {
    new AdminService()
      .getCustomer(id) // returns Promise
      .then((customer) => setCustomer(customer))
      .catch((error) => notificationService.error(error));
  }, []);

  function deleteMe() {
    new AdminService()
      .deleteCustomer(id)
      .then(() => {
        navigate("/customers");
        notificationService.success("Customer deleted...");
      })
      .catch((err) => notificationService.error(err));
  }

  function backToCustomers() {
    navigate("/customers");
  }

  function updateMe() {
    navigate("/updateCustomer/" + id);
  }

  return (
    <div className="CustomerDetails">
      {!customer && <p>Sorry, can not find the specific customer...</p>}
      {customer && (
        <>
          <h2>{customer?.firstName + " " + customer?.lastName}</h2>
          <p>{customer?.email}</p>

          <button onClick={deleteMe}>Delete Customer</button>
          <button onClick={backToCustomers}>Return to customers</button>
          <button onClick={updateMe}>Update Customer</button>
        </>
      )}
    </div>
  );
}

export default CustomerDetails;
