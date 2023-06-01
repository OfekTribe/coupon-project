import { useForm } from "react-hook-form";
import "./Login.css";
import { Credentials } from "../../../Models/Credentials";
import { useNavigate } from "react-router-dom";
import authService from "../../../Services/AuthService";
import notificationsService from "../../../Services/NotificationsService";
import { authStore } from "../../../Stores/AuthState";

function Login(): JSX.Element {
  const { register, handleSubmit, formState } = useForm<Credentials>();
  const navigate = useNavigate();

  function send(creds: Credentials) {
    authService
      .Login(creds)
      .then(() => {
        notificationsService.success(
          "Welcome back " + authStore.getState().name
        );
        {
          authStore.getState().token &&
            navigate(
              "/" + authStore.getState().clientType.toString().toLowerCase()
            );
        }
      })

      .catch((err) => notificationsService.error(err));
  }

  return (
    <div className="Login">
      <form className="box" onSubmit={handleSubmit(send)}>
        <h2>Login</h2>
        <br />
        <input
          type="text"
          placeholder="Please enter email"
          {...register("email", {
            required: { value: true, message: "must enter email" },
          })}
        />
        <br />
        <span>{formState.errors?.email?.message}</span>
        <br />
        <br />

        <input
          type="password"
          placeholder="Please enter password"
          {...register("password", {
            required: { value: true, message: "must enter password" },
          })}
        />
        <br />
        <span>{formState.errors?.password?.message}</span>
        <br />
        <br />

        <select className="select" {...register("clientType")}>
          <option>Admin</option>
          <option>Company</option>
          <option>Customer</option>
        </select>
        <br />
        <br />
        <button className="button-33" type="submit" value={"login"}>
          Login
        </button>
        <br />
        <hr />
      </form>
    </div>
  );
}

export default Login;
