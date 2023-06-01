import axios from "axios";
import Company from "../Models/Company";
import { Coupon, Category } from "../Models/Coupon";
import {
  companyStore,
  addCoupon,
  updateCoupon,
  deleteCoupon,
  fetchCoupon,
  fetchTheCompany,
} from "../Stores/CompanyState";

class CompanyService {
  public async addCoupon(coupon: Coupon) {
    const respone = (
      await axios.post<Coupon>(
        "http://localhost:8080/company/addCoupon",
        coupon
      )
    ).data;
    companyStore.dispatch(addCoupon(respone));
    return respone;
  }

  public async updateCoupon(coupon: Coupon) {
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
    const respone = (await axios.put<string>("", coupon)).data;
    companyStore.dispatch(updateCoupon(coupon));
    return respone;
  }

  public async deleteCoupon(id: number) {
    const response = (
      await axios.delete<string>(
        "http://localhost:8080/company/updateCoupon" + id
      )
    ).data;
    companyStore.dispatch(deleteCoupon(id));
    return response;
  }

  public async getCompanyCoupons() {
    if (companyStore.getState().coupons.length == 0) {
      const coupons = (
        await axios.get<Coupon[]>("http://localhost:8080/company/Coupons")
      ).data;
      companyStore.dispatch(fetchCoupon(coupons));
      return coupons;
    }
    return companyStore.getState().coupons;
  }

  public async getCompanyCouponsByCategory(category: Category) {
    const coupons = this.getCompanyCoupons();
    return (await coupons).filter((c) => c.category == category);
  }

  public async getCompanyCouponsMaxPrice(maxPrice: number) {
    const coupons = this.getCompanyCoupons();
    return (await coupons).filter((c) => c.price <= maxPrice);
  }

  public async getCompanyDetails() {
    if (
      companyStore.getState().company == null ||
      companyStore.getState().company == undefined
    ) {
      const response = (
        await axios.get<Company>("http://localhost:8080/company/details")
      ).data;
      companyStore.dispatch(fetchTheCompany(response));
      return response;
    }
    return companyStore.getState().company;
  }
}
const companyService = new CompanyService();
export default companyService;
