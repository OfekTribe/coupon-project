import jwtDecode from "jwt-decode";
import { ClientType } from "../Models/Credentials";
import { createStore } from "redux";

export class AuthState{
    public token: string = null;
    public id: number = null;
    public email: string = null;
    public name: string = null;
    public clientType: ClientType;

}

export enum AuthActionTypes {
    Login, Logout
}

export interface AuthAction {
    type: AuthActionTypes,
    payload?: AuthState
}

export function LoginAction(state: AuthState) {
    return { type: AuthActionTypes.Login, payload: state }
}

export function logoutAction() {
    return { type: AuthActionTypes.Logout }
}

export function authReducer(currentState = new AuthState(), action: AuthAction) {

    const newState = { ...currentState };

    switch (action.type) {
        case AuthActionTypes.Login:
            const container: AuthState = jwtDecode(action.payload.token);
            newState.clientType = container.clientType;
            newState.email = container.email;
            newState.id = container.id;
            newState.name = container.name;
            break;
        case AuthActionTypes.Logout:
            newState.clientType = null;
            newState.email = null;
            newState.id = null;
            newState.name = null;
            newState.token = null;
            break;
    }
    return newState;
}
export const authStore = createStore(authReducer);