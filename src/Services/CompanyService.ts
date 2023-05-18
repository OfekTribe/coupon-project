import Axios from "axios";
import { Category, Coupon } from "../Models/Coupon";
import {
  addCoup,
  couponsStore,
  deleteCoup,
  fetchCoupons,
  updateCoup,
} from "../Stores/CouponStore";
import Company from "../Models/Company";
import { companiesStore } from "../Stores/CompanyStore";

class CompanyService {
  public async addNewCoupon(coupon: Coupon) {
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
        "http://localhost:8080/company/addCoupon",
        formData
      )
    ).data;
    couponsStore.dispatch(addCoup(response));
    return response;
  }

  public async updateCoupon(coupon: Coupon) {
    const formData = new FormData();
    formData.append("title", coupon.title);
    formData.append("description", coupon.description);
    formData.append("startDate", coupon.startDate.toDateString());
    formData.append("endDate", coupon.endDate.toDateString());
    formData.append("amount", coupon.amount.toString());
    formData.append("price", coupon.price.toString());
    formData.append("img", coupon.image as File);
    const response = (
      await Axios.put<Coupon>(
        "http://localhost:8080/company/updateCoupon" + coupon.id,
        formData
      )
    ).data;
    couponsStore.dispatch(updateCoup(response));
    return response;
  }

  public async deleteCoupon(id: number) {
    const response = (
      await Axios.delete<number>(
        "http://localhost:8080/company/deleteCoupon/" + id
      )
    ).data;
    couponsStore.dispatch(deleteCoup(response));
  }

  public async getAllCoupons(): Promise<Coupon[]> {
    if (couponsStore.getState().coupons.length == 0) {
      const response = await Axios.get<Coupon[]>(
        "http://localhost:8080/company/Coupons"
      );
      couponsStore.dispatch(fetchCoupons(response.data));
      return response.data;
    }
    return couponsStore.getState().coupons;
  }

  public async getCouponsByCategory(category: Category): Promise<Coupon[]> {
      const response = await Axios.get<Coupon[]>(
        "http://localhost:8080/company/couponsByCategory/" + category
      );
      couponsStore.dispatch(fetchCoupons(response.data));
      return response.data;
    }

    public async getCouponsByPrice(maxPrice: number): Promise<Coupon[]> {
      const response = await Axios.get<Coupon[]>(
        "http://localhost:8080/company/couponsByMaxPrice/" + maxPrice
      );
      couponsStore.dispatch(fetchCoupons(response.data));
      return response.data;
    }

    public async getCompanyDetails(id: number): Promise<Company> {
      const company = companiesStore.getState().companies.find((c) => c.id == id);
      if (company == undefined) throw Error("Id not found!");
      else return company;
    }
  }

export default CompanyService;
