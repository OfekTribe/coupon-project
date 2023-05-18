import { useForm } from "react-hook-form";
import { Credentials } from "../../../Models/Credentials";
import authService from "../../../Services/AuthService";
import notificationService from "../../../Services/NotificationService";
import { authStore } from "../../../Stores/AuthState";
import "./Login.css";

function Login(): JSX.Element {

    const { register, handleSubmit } = useForm<Credentials>();

    function send(creds: Credentials) {
        authService.login(creds).then(
            () => { notificationService.success("Welcome back " + authStore.getState().customer.firstName) }
        ).catch(err => notificationService.error(err))
    }


    return (
        <div className="Login">
            <h2>Login</h2>
            <form onSubmit={handleSubmit(send)}>
                <input type="text" placeholder="Email :" {...register("email")} /> <br /><br />
                <input type="password" placeholder="Password :" {...register("password")} /> <br /><br />
                <select name="" id=""></select>
                <input type="submit" value="Login" />
            </form>
        </div>
    );
}


export default Login;


