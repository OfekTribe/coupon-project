import Axios from "axios";
import { Category, Coupon } from "../Models/Coupon";
import { addCoup, couponsStore, deleteCoup, fetchCoupons, updateCoup } from "../Stores/CouponStore";

class CouponService {
  public async getAllCoupons(): Promise<Coupon[]> {
    if (couponsStore.getState().coupons.length == 0) {
      const response = await Axios.get<Coupon[]>(
        "http://localhost:8080/customer/getAllCoupons"
      );
      couponsStore.dispatch(fetchCoupons(response.data));
      return response.data;
    }
    return couponsStore.getState().coupons;
  }

  public async addNewCoupon(coupon: Coupon) {
    const formData = new FormData();
    formData.append("company", coupon.company.name);
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

  public async getCustomerCoupons(): Promise<Coupon[]> {
    const response = await Axios.get<Coupon[]>(
      "http://localhost:8080/customer/coupons"
    );
    return response.data;
  }

  public async getCompanyCoupons(): Promise<Coupon[]> {
    const response = await Axios.get<Coupon[]>(
      "http://localhost:8080/company/Coupons"
    );
    couponsStore.dispatch(fetchCoupons(response.data));
    return response.data;
  }

  public async getOneCoupon(id: number) {
    const coupon = couponsStore.getState().coupons.find(c => c.id == id);
    if(coupon == undefined)
            throw Error("id not found!");
        else
            return coupon;
  }

  public async deleteCoupon(id: number) {
    const respons = (await Axios.delete<string>("http://localhost:8080/company/deleteCoupon/" + id)).data;
    couponsStore.dispatch(deleteCoup(id));
  }

  public async updateCoupon(coupon: Coupon) {
      const formData = new FormData();
      formData.append("company", coupon.company.name);
      formData.append("category", JSON.stringify(coupon.category));
      formData.append("title", coupon.title);
      formData.append("description", coupon.description);
      formData.append("startDate", coupon.startDate.toDateString());
      formData.append("endDate", coupon.endDate.toDateString());
      formData.append("amount", coupon.amount.toString());
      formData.append("price", coupon.price.toString());
      formData.append("image", coupon.image as File);
      const response = (await Axios.put<Coupon>("http://localhost:8080/company/updateCoupon", formData)).data; 
      couponsStore.dispatch(updateCoup(response));
      return response;
  }
}


export default CouponService;
