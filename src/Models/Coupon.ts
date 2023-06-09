import Company from "./Company"

export enum Category{
    Food,
    Vacation,
    Gaming,
    Sport
}

export class Coupon {
    id: number;
    company: Company;
    category: Category;
    title: string;
    description: string;
    startDate: Date;
    endDate: Date;
    amount: number;
    price: number;
    image: File | FileList | string;

    constructor(id: number, company: Company, category: Category, title: string, description: string, startDate: Date, endDate: Date, amount: number, price: number, image: File | FileList | string) {
        this.id = id;
        this.company = company;
        this.category = category;
        this.title = title;
        this.description = description;
        this.startDate = startDate;
        this.endDate = endDate;
        this.amount = amount;
        this.price = price;
        this.image = image;
    }
}

