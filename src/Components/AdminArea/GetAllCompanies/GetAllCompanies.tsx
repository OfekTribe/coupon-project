import { useEffect, useRef, useState } from "react";
import "./GetAllCompanies.css";
import Company from "../../../Models/Company";
import notificationsService from "../../../Services/NotificationsService";
import { NavLink, useNavigate } from "react-router-dom";
import CompanyCard from "../../CompanyArea/CompanyCard/CompanyCard";
import adminService from "../../../Services/AdminService";
import { authStore } from "../../../Stores/AuthState";

function GetAllCompanies(): JSX.Element {
  const [getCompanies, setCompanies] = useState<Company[]>([]);
  const navigate = useNavigate();
  const inputRef = useRef(null);

  useEffect(() => {
    if (!authStore.getState().token) {
      notificationsService.error("unauthorize, please log in");
      navigate("/home");
      return;
    }

    adminService
      .getAllCompanies()
      .then((companies) => setCompanies(companies))
      .catch((err) => notificationsService.error(err));
  }, []);

  function getOneCompany() {
    navigate("/administrator/companies/" + inputRef.current.value);
  }

  return (
    <div className="GetAllCompanies">
      <NavLink to={"/administrator/addCompany"}>
        <button className="button-33">Add Company</button>
      </NavLink>
      <br />

      <input type="number" placeholder="id" ref={inputRef} />
      <button className="button-33" onClick={getOneCompany}>Get company by id</button>

      <div>
        {getCompanies?.map((c) => (
          <CompanyCard key={c.id} company={c} />
        ))}
      </div>
    </div>
  );
}

export default GetAllCompanies;
