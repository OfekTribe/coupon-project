import { useState, useEffect } from "react";
import Customer from "../../../Models/Customer";
import AdminService from "../../../Services/AdminService";
import notificationService from "../../../Services/NotificationService";
import "./Customers.css";
import { NavLink } from "react-router-dom";

function Customers(): JSX.Element {

    const [getCustomers, setCustomers] = useState<Customer[]>([]);

    useEffect(() => {
        const adminService = new AdminService;
        adminService.getAllCustomers().then(
            customers => {
                setCustomers(customers);
            }).catch(err => notificationService.error("Oops, It seems like a problem :("))
        },[])
    

    return (
        <div className="Customers">
            <div>
                <NavLink to={"/admin/addCustomer"}>
                    <button className="button" role="button">
                        Add new customer
                    </button>
                </NavLink>
            </div>
        </div>
    );
}

export default Customers;
