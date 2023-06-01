import { useForm } from "react-hook-form";
import Company from "../../../Models/Company";
import "./UpdateCompany.css";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import adminService from "../../../Services/AdminService";
import notificationsService from "../../../Services/NotificationsService";
import { authStore } from "../../../Stores/AuthState";

function UpdateCompany(): JSX.Element {
  const { register, handleSubmit, formState, setValue } = useForm<Company>();
  const navigate = useNavigate();
  const id: number = +useParams().companyId;
  const [getCompany, setCompany] = useState<Company>();

  useEffect(() => {
    if (!authStore.getState().token) {
      notificationsService.error("unauthorize, please log in");
      navigate("/home");
      return;
    }

    adminService
      .getOneCompany(id)
      .then((company) => {
        setValue("email", company.email);
        setValue("password", company.password);
        setCompany(company);
      })
      .catch((err) => notificationsService.error(err));
  }, []);

  function sendCompany(company: Company) {
    company.id = id;
    company.name = getCompany.name;
    company.coupons = getCompany.coupons;

    adminService
      .updateCompany(company)
      .then((msg) => {
        notificationsService.success(msg);
        navigate("/administrator/companies/" + id);
      })
      .catch((err) => notificationsService.error(err));
  }

  return (
    <div className="UpdateCompany">
      <NavLink to={"/administrator/companies/" + id}>
        <button className="button-33">Back</button>
      </NavLink>
      <br />
      <h3>Update company :</h3>

      <form className="form" onSubmit={handleSubmit(sendCompany)}>
        <input
          type="email"
          placeholder="email"
          {...register("email", {
            required: { value: true, message: "You must enter email" },
            minLength: {
              value: 3,
              message: "must enter at least 3 characters",
            },
          })}
        />
        <br />
        <span>{formState.errors?.email?.message}</span>
        <br />

        <input
          type="password"
          placeholder="password"
          {...register("password", {
            required: { value: true, message: "You must enter password" },
            minLength: {
              value: 6,
              message: "must enter at least 6 characters",
            },
          })}
        />
        <br />
        <span>{formState.errors?.password?.message}</span>
        <br />

        <input type="submit" value="edit" />
      </form>
    </div>
  );
}

export default UpdateCompany;
