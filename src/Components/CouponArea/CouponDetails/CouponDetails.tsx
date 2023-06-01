import { useEffect, useState } from "react";
import "./CouponDetails.css";
import { useNavigate, useParams } from "react-router-dom";
import companyService from "../../../Services/CompanyService";
import notificationsService from "../../../Services/NotificationsService";
import { NavLink } from "react-router-dom";
import { Coupon } from "../../../Models/Coupon";
import { authStore } from "../../../Stores/AuthState";

function CouponDetails(): JSX.Element {
  const [getCoupon, setCoupon] = useState<Coupon>();
  const id: number = +useParams().couponId;
  const navigate = useNavigate();

  useEffect(() => {
    companyService
      .getCompanyCoupons()
      .then((cs) => setCoupon(cs.find((c) => c.id == id)))
      .catch((err) => notificationsService.error(err));
  }, []);

  function deleteMe() {
    companyService
      .deleteCoupon(id)
      .then((msg) => {
        notificationsService.success(msg);
        navigate("/company/coupons");
      })
      .catch((err) => notificationsService.error(err));
  }

  function updateCoupon() {
    navigate("/company/coupons/edit/" + id);
  }

  return (
    <div className="CouponDetails">
      <NavLink to="/company/coupons">
        {" "}
        <button>back</button>
      </NavLink>
      {!getCoupon && <p>Sorry, can not find the coupon...</p>}

      {getCoupon && authStore.getState().clientType.toString() == "Company" && (
        <div>
          <h2>{getCoupon?.title}</h2>
          <img src={"" + getCoupon?.image} alt={getCoupon.title} />
          <h3>💲 {getCoupon?.price}</h3>
          <p>{getCoupon?.company.name}</p>
          <p>Category : {getCoupon?.category}</p>
          <p>Sale start : {getCoupon?.startDate?.toString()}</p>
          <p>Expiration date : {getCoupon?.endDate?.toString()}</p>
          <p>only {getCoupon?.amount} left in stock</p>
          <p>Description : {getCoupon?.description}</p>

          <button onClick={updateCoupon}>Edit</button>
          <br />
          <button onClick={deleteMe}>Delete Me</button>
        </div>
      )}
    </div>
  );
}

export default CouponDetails;
