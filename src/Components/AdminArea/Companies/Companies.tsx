import { useEffect, useState } from "react";
import Company from "../../../Models/Company";
import "./Companies.css";
import AdminService from "../../../Services/AdminService";
import notificationService from "../../../Services/NotificationService";
import { NavLink } from "react-router-dom";

function Companies(): JSX.Element {
  const [getCompanies, setCompanies] = useState<Company[]>([]);

  useEffect(() => {
    const adminService = new AdminService();
    adminService
      .getAllCompanies()
      .then((companies) => {
        setCompanies(companies);
      })
      .catch((err) =>
        notificationService.error("Oops, It seems like a problem :(")
      );
  }, []);

  return (
    <div className="Companies">
      <div>
        <NavLink to={"/admin/addComp"}>
          <button className="button" role="button">
            Add new Company
          </button>
        </NavLink>
      </div>
    </div>
  );
}

export default Companies;
