import { useState, useEffect } from "react";
import { useParams, NavLink } from "react-router-dom";
import customerService from "../../../Services/CustomerService";
import notificationsService from "../../../Services/NotificationsService";
import "./CustomerPurchasedCouponDetails.css";
import { Coupon } from "../../../Models/Coupon";

function CustomerPurchasedCouponDetails(): JSX.Element {
  const [getCoupon, setCoupon] = useState<Coupon>();
  const id: number = +useParams().couponId;

  useEffect(() => {
    customerService
      .getAllCoupons()
      .then((cs) => setCoupon(cs.find((c) => c.id == id)))
      .catch((err) => notificationsService.error(err));
  }, []);

  return (
    <div className="CustomerPurchasedCouponDetails">
      <NavLink to="/customer/coupons">
        <button className="button-33">back</button>
      </NavLink>
      {!getCoupon && <p>Sorry, cannot find the coupon...</p>}

      {getCoupon && (
        <div>
          <h2>title: {getCoupon?.title}</h2>
          <img src={"" + getCoupon?.image} alt={getCoupon.title} />
          <h3>💲 {getCoupon?.price}</h3>
          <p>Company : {getCoupon?.company.name}</p>
          <p>Category : {getCoupon?.category}</p>
          <p>Sale start : {getCoupon?.startDate?.toString()}</p>
          <p>Expire date : {getCoupon?.endDate?.toString()}</p>
          <p>only {getCoupon?.amount} left in stock</p>
          <p>Description : {getCoupon?.description}</p>
        </div>
      )}
    </div>
  );
}

export default CustomerPurchasedCouponDetails;
