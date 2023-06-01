import { NavLink } from "react-router-dom";
import "./CouponCard.css";
import customerService from "../../../Services/CustomerService";
import notificationsService from "../../../Services/NotificationsService";
import { Coupon } from "../../../Models/Coupon";
import { authStore } from "../../../Stores/AuthState";

interface CouponsProps {
  coupon: Coupon;
}

function CouponCard(props: CouponsProps): JSX.Element {
  function purchaseCoupon() {
    customerService
      .purchaseCoupon(props.coupon)
      .then((msg) => notificationsService.success(msg))
      .catch((err) => notificationsService.error(err));
  }

  return (
    <div className="CouponCard">
      {authStore.getState().token &&
        authStore.getState().clientType.toString() == "Company" && (
          <>
            <NavLink to={"/company/coupons/" + props.coupon.id}>
              <h3>{props.coupon.title}</h3>
            </NavLink>
            <img src={"" + props.coupon.image} alt={props.coupon.title} />
            <p>Price : {props.coupon.price}</p>
          </>
        )}

      {authStore.getState().token &&
        authStore.getState().clientType.toString() == "Customer" && (
          <>
            <NavLink to={"/customer/coupons/" + props.coupon.id}>
              <h3>{props.coupon.title}</h3>
            </NavLink>
            <img src={"" + props.coupon.image} alt={props.coupon.title} />
            <p>Price : {props.coupon.price}</p>
            <button onClick={purchaseCoupon}>Purchase Coupon</button>
          </>
        )}

      {authStore.getState().token &&
        authStore.getState().clientType.toString() == "Admin" && (
          <>
            <h3>{props.coupon.title}</h3>
            <img src={"" + props.coupon.image} alt={props.coupon.title} />
            <p>Price : {props.coupon.price}</p>
          </>
        )}
    </div>
  );
}

export default CouponCard;
