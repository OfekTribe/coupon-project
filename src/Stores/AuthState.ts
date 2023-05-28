import jwtDecode from "jwt-decode";
import { ClientType } from "../Models/Credentials";
import { createStore } from "redux";

export class AuthState {
  public token: string = null;
  public userData: userData = null;

  constructor() {
    if (localStorage.token) {
      this.token = localStorage.token;
      const container: { date: userData } = jwtDecode(this.token);
      this.userData = container.date;
    }
  }
}

export class userData {
  public id: number = null;
  public email: string = null;
  public name: string = null;
  public clientType: ClientType = null;
}

export enum AuthActionTypes {
  Login,
  Logout,
}

export interface AuthAction {
  type: AuthActionTypes;
  payload?: string;
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
      const container: { data: userData } = getDecodedAccessToken(
        newState.token
      );
      newState.userData = container.data;
      localStorage.token = token;
      break;
    case AuthActionTypes.Logout:
      newState.token = null;
      newState.userData = null;
      localStorage.removeItem("token");
      break;
  }
  return newState;
}
export const authStore = createStore(authReducer);
