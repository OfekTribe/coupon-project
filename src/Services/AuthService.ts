import axios from "axios";
import { Credentials } from "../Models/Credentials";
import { LoginAction, authStore, logoutAction } from "../Stores/AuthState";

class AuthService {
  public async Login(creds: Credentials) {
    const token = (await axios.post("http://localhost:8080/auth/login", creds))
      .data;
    authStore.dispatch(LoginAction(token));
    return token;
  }

  public async Logout() {
    authStore.dispatch(logoutAction());
  }
}

const authService = new AuthService();

export default authService;
