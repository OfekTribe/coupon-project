class Company {
    id: number;
    email: string;
    name: string;
    password: string;
    coupons: [];

    constructor(id: number, email: string, name: string, password: string, coupons: []) {
        this.id = id;
        this.email = email;
        this.name = name;
        this.password = password;
        this.coupons = coupons;
    }
	
}

export default Company;
