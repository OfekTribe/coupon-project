import jwtDecode from "jwt-decode";
import { ClientType } from "../Models/Credentials";

export class AuthState{
    public token: string = null;
    public id: number = null;
    public email: string = null;
    public name: string = null;
    public clientType: ClientType;

    
}