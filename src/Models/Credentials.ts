export class Credentials {
  email: string;
  password: string;
  clientType: ClientType;

  constructor(email: string, password: string, clientType: ClientType) {
    this.email = email;
    this.password = password;
    this.clientType = clientType;
  }
}

export enum ClientType {
  admin,
  company,
  customer,
}
