import Axios from "axios";
import Company from "../Models/Company";
import { Category, Coupon } from "../Models/Coupon";
import { couponsStore, addCoup, fetchCoupons } from "../Stores/CouponStore";
import Customer from "../Models/Customer";
import { customersStore } from "../Stores/CustomerStore";

class CustomerService {
  public async purchaseCoupon(coupon: Coupon) {
    const formData = new FormData();
    formData.append("company", Company.toString());
    formData.append("category", JSON.stringify(Category));
    formData.append("title", coupon.title);
    formData.append("description", coupon.description);
    formData.append("startDate", coupon.startDate.toDateString());
    formData.append("endDate", coupon.endDate.toDateString());
    formData.append("amount", coupon.amount.toString());
    formData.append("price", coupon.price.toString());
    formData.append("img", coupon.image as File);
    const response = (
      await Axios.post<Coupon>(
        "http://localhost:8080/customer/purchaseCoupon",
        formData
      )
    ).data;
    return response;
  }

  public async getAllCoupons(): Promise<Coupon[]> {
    if (couponsStore.getState().coupons.length == 0) {
      const response = await Axios.get<Coupon[]>(
        "http://localhost:8080/customer/coupons"
      );
      couponsStore.dispatch(fetchCoupons(response.data));
      return response.data;
    }
    return couponsStore.getState().coupons;
  }

  public async getCouponsByCategory(category: Category): Promise<Coupon[]> {
    const response = await Axios.get<Coupon[]>(
      "http://localhost:8080/customer/couponsByCategory/" + category
    );
    couponsStore.dispatch(fetchCoupons(response.data));
    return response.data;
  }

  public async getCouponsByPrice(maxPrice: number): Promise<Coupon[]> {
    const response = await Axios.get<Coupon[]>(
      "http://localhost:8080/customer/couponsByMaxPrice/" + maxPrice
    );
    couponsStore.dispatch(fetchCoupons(response.data));
    return response.data;
  }

  public async getCustomerDetails(id: number): Promise<Customer> {
    const customer = customersStore
      .getState()
      .customers.find((c) => c.id == id);
    if (customer == undefined) throw Error("Id not found!");
    else return customer;
  }
}

export default CustomerService;
