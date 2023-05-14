class Customer {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    coupons: [];

    constructor(id: number, firstName: string, lastName: string, email: string, password: string, coupons: []) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.coupons = coupons;
    }
	
}

export default Customer;
