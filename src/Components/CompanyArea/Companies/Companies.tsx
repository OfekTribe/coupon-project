import { useState, useEffect } from "react";
import Company from "../../../Models/Company";
import AdminService from "../../../Services/AdminService";
import CompanyService from "../../../Services/CompanyService";
import CompanyCard from "../CompanyCard/CompanyCard";
import "./Companies.css";

function Companies(): JSX.Element {
  const [getCompanies, setCompanies] = useState<Company[]>([]);

  useEffect(() => {
    const adminService = new AdminService();
    adminService
      .getAllCompanies()
      .then((companies) => {
        setCompanies(companies);
      })
      .catch((err) => alert(err));
  }, []);

  return (
    <div className="Companies">
      {getCompanies.map((comp) => (
        <CompanyCard key={comp.id} company={comp} />
      ))}
    </div>
  );
}

export default Companies;
