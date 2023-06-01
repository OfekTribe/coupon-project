import { useEffect, useState } from "react";
import Company from "../../../Models/Company";
import "./CompanyDetails.css";
import { useNavigate, useParams } from "react-router-dom";
import notificationsService from "../../../Services/NotificationsService";
import adminService from "../../../Services/AdminService";
import { authStore } from "../../../Stores/AuthState";

function CompanyDetails(): JSX.Element {
  const [getCompany, setCompany] = useState<Company>();
  const id: number = +useParams().companyId;
  const navigate = useNavigate();

  useEffect(() => {
    if (!authStore.getState().token) {
      notificationsService.error("unauthorize, please log in");
      navigate("/home");
      return;
    }

    adminService
      .getOneCompany(id)
      .then((company) => setCompany(company))
      .catch((err) => notificationsService.error(err));
  }, []);

  function deleteMe() {
    adminService
      .deleteCompany(id)
      .then((msg) => {
        notificationsService.success(msg);
        navigate("/administrator/companies");
      })
      .catch((err) => notificationsService.error(err));
  }

  function updateCompany() {
    navigate("/administrator/companies/edit/" + id);
  }

  function back() {
    navigate("/administrator/companies");
  }

  return (
    <div className="CompanyDetails">
      <button onClick={back}>back</button>

      {!getCompany && <p>Sorry, can not find the company...</p>}

      {getCompany && (
        <div>
          <h2>Name : {getCompany?.name}</h2>
          <h4>Email : {getCompany?.email}</h4>
          <button onClick={updateCompany}>Edit</button>
          <br />
          <button onClick={deleteMe}>Delete</button>
          <br />
        </div>
      )}
    </div>
  );
}

export default CompanyDetails;
