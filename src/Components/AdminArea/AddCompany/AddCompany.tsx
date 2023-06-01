import { useForm } from "react-hook-form";
import Company from "../../../Models/Company";
import "./AddCompany.css";
import notificationsService from "../../../Services/NotificationsService";
import { useNavigate } from "react-router-dom";
import adminService from "../../../Services/AdminService";
import { useEffect } from "react";
import { authStore } from "../../../Stores/AuthState";

function AddCompany(): JSX.Element {
  const navigate = useNavigate();
  useEffect(() => {
    if (!authStore.getState().token) {
      notificationsService.error("unauthorize, please log in");
      navigate("/home");
      return;
    }
  }, []);

  const { register, handleSubmit, formState } = useForm<Company>();

  function sendCompany(company: Company) {
    company.coupons = [];
    adminService
      .addCompany(company)
      .then(() => {
        notificationsService.success("Company Added");
        navigate("/administrator/companies");
      })
      .catch((err) => notificationsService.error(err));
  }

  return (
    <div className="AddCompany">
      <h3>Add company :</h3>

      <form className="form" onSubmit={handleSubmit(sendCompany)}>
        <input 
          type="text"
          placeholder="name"
          {...register("name", {
            required: { value: true, message: "You must enter name" },
            minLength: {
              value: 3,
              message: "must enter at least 3 characters",
            },
          })}
        />
        <br />
        <span>{formState.errors?.name?.message}</span>
        <br />

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
        <button className="button-33" type="submit" value={"/add"}>
          Add
        </button>
      </form>
    </div>
  );
}

export default AddCompany;
