import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Company from "../../../Models/Company";
import AdminService from "../../../Services/AdminService";
import notificationService from "../../../Services/NotificationService";
import "./CompanyDetails.css";

function CompanyDetails(): JSX.Element {
  const [company, setCompany] = useState<Company>();
  const id: number = +useParams().compId;
  const navigate = useNavigate();

  useEffect(() => {
    new AdminService()
      .getCompany(id) // returns Promise
      .then((company) => setCompany(company))
      .catch((error) => notificationService.error(error));
  }, []);

  function deleteMe() {
    new AdminService()
      .deleteCompany(id)
      .then(() => {
        navigate("/companies");
        notificationService.success("Company deleted...");
      })
      .catch((err) => notificationService.error(err));
  }

  function backToCompanies() {
    navigate("/companies");
  }

  function updateMe() {
    navigate("/updateCompany/" + id);
  }

  return (
    <div className="CompanyDetails">
      {!company && <p>Sorry, can not find the specific company...</p>}
      {company && (
        <>
          <h2>{company?.name}</h2>
          <h3>{company?.email}</h3>

          <button onClick={deleteMe}>Delete Company</button>
          <button onClick={backToCompanies}>Return to companies</button>
          <button onClick={updateMe}>Update Company</button>
        </>
      )}
    </div>
  );
}

export default CompanyDetails;
