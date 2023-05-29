import { useState, useEffect } from "react";
import Customer from "../../../Models/Customer";
import AdminService from "../../../Services/AdminService";
import "./Customers.css";
import CustomerCard from "../CustomerCard/CustomerCard";

function Customers(): JSX.Element {
  const [getCustomers, setCustomers] = useState<Customer[]>([]);

  useEffect(() => {
    const adminService = new AdminService();
    adminService
      .getAllCustomers()
      .then((customers) => {
        setCustomers(customers);
      })
      .catch((err) => alert(err));
  }, []);

  return (
    <div className="Customers">
      {getCustomers.map((customer) => (
        <CustomerCard key={customer.id} customer={customer} />
      ))}
    </div>
  );
}

export default Customers;
