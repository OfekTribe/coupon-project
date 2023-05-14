class Company {
    email: string;
    name: string;
    password: string;
    coupons: [];

    constructor(email: string, name: string, password: string, coupons: []) {
        this.email = email;
        this.name = name;
        this.password = password;
        this.coupons = coupons;
    }
	
}

export default Company;
