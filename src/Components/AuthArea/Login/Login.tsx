import { useForm } from "react-hook-form";
import { Credentials } from "../../../Models/Credentials";
import "./Login.css";
import authService from "../../../Services/AuthService";
import notificationService from "../../../Services/NotificationService";
import { authStore } from "../../../Stores/AuthState";

function Login(): JSX.Element{

  const { register, handleSubmit } = useForm<Credentials>();

  function send(creds: Credentials) {
    authService.login(creds).then(
      () => { notificationService.success("Welcome back " + authStore.getState().name)}
    ).catch(err => notificationService.error("Something's wrong please check your details"))
  }

  return(
    <div className="Login">
      <form onSubmit={handleSubmit(send)}>
        <h2>Login</h2>
        <input type="text" placeholder="Please enter email" required /> <br /> <br />
        <input type="text" placeholder="Please enter password" required /><br /><br />
        <>
        <label>Company</label><br />
        <input type="radio" name="type" required/><br />
        <label>Customer</label><br />
        <input type="radio" name="type" required/><br />
        <label>Admin</label><br />
        <input type="radio" name="type" required/><br />
        <input type="submit" value="Login" />
        </>
      </form>
    </div>
  )

}

export default Login;