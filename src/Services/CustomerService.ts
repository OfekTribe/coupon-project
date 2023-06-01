import axios from "axios";
import Customer from "../Models/Customer";
import { Coupon, Category } from "../Models/Coupon";
import {
  addCoupon,
  customerStore,
  deleteCoupon,
  fetchCoupon,
  fetchTheCustomer,
} from "../Stores/CustomerState";

class CustomerService {
  public async purchaseCoupon(coupon: Coupon) {
    const formData = new FormData();
    formData.append("title", coupon.title);
    formData.append("company", JSON.stringify(coupon.company));
    formData.append("category", coupon.category.toString());
    formData.append("description", coupon.description);
    formData.append("startDate", coupon.startDate.toString());
    formData.append("endDate", coupon.endDate.toString());
    formData.append("amount", coupon.amount.toString());
    formData.append("price", coupon.price.toString());
    formData.append("image", coupon.image as File);
    const respone = (
      await axios.post<string>(
        "http://localhost:8080/customer/purchaseCoupon",
        coupon
      )
    ).data;
    customerStore.dispatch(addCoupon(coupon));
    return respone;
  }

  public async getCustomerCoupons() {
    if (customerStore.getState().coupons.length == 0) {
      const coupons = (
        await axios.get<Coupon[]>("http://localhost:8080/customer/coupons")
      ).data;
      customerStore.dispatch(fetchCoupon(coupons));
      return coupons;
    }
    return customerStore.getState().coupons;
  }

  public async getCustomerCouponsByCategory(category: Category) {
    const coupons = this.getCustomerCoupons();
    return (await coupons).filter((c) => c.category == category);
  }

  public async getCustomerCouponsByMaxPrice(maxPrice: number) {
    const coupons = this.getCustomerCoupons();
    return (await coupons).filter((c) => c.price <= maxPrice);
  }

  public async getAllCoupons() {
    return (
      await axios.get<Coupon[]>("http://localhost:8080/customer/getAllCoupons")
    ).data;
  }

  public async getCustomerDetails() {
    if (
      customerStore.getState().customer == null ||
      customerStore.getState().customer == undefined
    ) {
      const response = (
        await axios.get<Customer>("http://localhost:8080/customer/details")
      ).data;
      customerStore.dispatch(fetchTheCustomer(response));
      return response;
    }
    return customerStore.getState().customer;
  }
}

const customerService = new CustomerService();
export default customerService;
