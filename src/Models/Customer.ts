class Customer {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    coupons: [];

    constructor(firstName: string, lastName: string, email: string, password: string, coupons: []) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.coupons = coupons;
    }
	
}

export default Customer;
