import { useForm } from "react-hook-form";
import { ClientType, Credentials } from "../../../Models/Credentials";
import "./Login.css";
import authService from "../../../Services/AuthService";
import notificationService from "../../../Services/NotificationService";
import { authStore } from "../../../Stores/AuthState";

function Login(): JSX.Element{

  const { register, handleSubmit } = useForm<Credentials>();

  function send(creds: Credentials) {
    authService.login(creds).then(
      () => { notificationService.success("Welcome back :)")}
    ).catch(err => notificationService.error(err))
    console.log(creds);
  }

  return(
    <div className="Login">
      <form onSubmit={handleSubmit(send)}>
        <h2>Login</h2>
        <input type="text" placeholder="Please enter email" required {...register("email")} /> <br /> <br />
        <input type="password" placeholder="Please enter password" required {...register("password")} /><br /><br />
        <label>Company</label><br />
        <input type="radio" name="type" value={ClientType.Company} required {...register("clientType")}/><br />
        <label>Customer</label><br />
        <input type="radio" name="type" required value={ClientType.Customer} {...register("clientType")}/><br />
        <label>Admin</label><br />
        <input type="radio" name="type" required value={ClientType.Admin} {...register("clientType")}/><br />
        <button className="button-33" role="button">Login</button>
      </form>
    </div>
  )

}

export default Login;