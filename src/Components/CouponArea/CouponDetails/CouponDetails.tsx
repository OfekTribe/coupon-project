import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Coupon } from "../../../Models/Coupon";
import CouponService from "../../../Services/CouponService";
import notificationService from "../../../Services/NotificationService";
import "./CouponDetails.css";

function CouponDetails(): JSX.Element {
  const [coupon, setCoupon] = useState<Coupon>();
  const id: number = +useParams().coupId; // react hook to control path paramaters
  const navigate = useNavigate();

  useEffect(() => {
    new CouponService()
      .getOneCoupon(id) // returns Promise
      .then((coup) => setCoupon(coup))
      .catch((error) => notificationService.error(error));
  }, []);

  function deleteMe() {
    new CouponService()
      .deleteCoupon(id)
      .then(() => {
        navigate("/coupons");
        notificationService.success("Coupon deleted...");
      })
      .catch((err) => notificationService.error(err));
  }

  function backToCoupons() {
    navigate("/coupons");
  }

  function updateMe() {
    navigate("/updateCoupon/" + id);
  }

  return (
    <div className="CouponDetails">
      {!coupon && <p>Sorry, can not find your coupon...</p>}
      {coupon && (
        <>
          <h2>{coupon?.title}</h2>
          <h3>Only {coupon?.amount} left in stock</h3>
          <p>$ {coupon?.price}</p>
          <p>Deal end : {coupon?.endDate.toDateString()}</p>
          <img src={coupon?.image.toString()} alt="image" />

          <button onClick={deleteMe}>Delete Coupon</button>
          <button onClick={backToCoupons}>Return to coupons</button>
          <button onClick={updateMe}>Update Coupon</button>
        </>
      )}
    </div>
  );
}

export default CouponDetails;
