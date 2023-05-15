import Axios from "axios";
import { Category, Coupon } from "../Models/Coupon";
import { addCoup, couponsStore } from "../Stores/CouponStore";
import Company from "../Models/Company";

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
              await Axios.post<Coupon>("http://localhost:8080/company/addCoupon", formData)
            ).data;
            couponsStore.dispatch(addCoup(response));
            return response;
          }
    }

export default CompanyService;