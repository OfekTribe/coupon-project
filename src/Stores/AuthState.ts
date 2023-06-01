import jwtDecode from "jwt-decode";
import { ClientType } from "../Models/Credentials";
import { createStore } from "redux";

export class AuthState {
  public token: string = null;
  public clientType: ClientType = null;
  public name: string = null;

  constructor() {
    if (sessionStorage.token) {
      this.token = sessionStorage.token;
      const container: { clientType: ClientType; name: string } = jwtDecode(
        this.token
      );
      this.clientType = container.clientType;
      this.name = container.name;
    }
  }
}

export enum AuthActionTypes {
  Login,
  Logout,
}

export interface AuthAction {
  type: AuthActionTypes;
  payload?: any;
}

export function LoginAction(token: string) {
  return { type: AuthActionTypes.Login, payload: token };
}

export function logoutAction() {
  return { type: AuthActionTypes.Logout };
}

function getDecodedAccessToken(token: string): any {
  try {
    return jwtDecode(token);
  } catch (Error) {
    return console.log(Error);
  }
}

export function authReducer(
  currentState = new AuthState(),
  action: AuthAction
) {
  const newState = { ...currentState };

  switch (action.type) {
    case AuthActionTypes.Login:
      const token = action.payload;
      newState.token = token;
      const container: { clientType: ClientType; name: string } =
        jwtDecode(token);
      newState.clientType = container.clientType;
      newState.name = container.name;
      sessionStorage.token = token;
      break;

    case AuthActionTypes.Logout:
      newState.token = null;
      newState.clientType = null;
      newState.name = null;
      sessionStorage.removeItem("token");
      break;
  }
  return newState;
}
export const authStore = createStore(authReducer);
