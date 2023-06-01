import { useEffect, useRef, useState } from "react";
import "./CompanyCoupons.css";
import notificationsService from "../../../Services/NotificationsService";
import CouponCard from "../../CouponArea/CouponCard/CouponCard";
import companyService from "../../../Services/CompanyService";
import { useNavigate } from "react-router-dom";
import { Coupon } from "../../../Models/Coupon";
import { authStore } from "../../../Stores/AuthState";

function CompanyCoupons(): JSX.Element {
  const navigate = useNavigate();
  const [getCoupons, setCoupons] = useState<Coupon[]>([]);
  const inputRef = useRef(null);
  const inputRef2 = useRef(null);

  useEffect(() => {
    if (!authStore.getState().token) {
      notificationsService.error("unauthorize, please log in");
      navigate("/home");
      return;
    }

    companyService
      .getCompanyCoupons()
      .then((coupons) => setCoupons(coupons))
      .catch((err) => notificationsService.error(err));
  }, []);

  function byMaxPrie() {
    if (inputRef.current.value > 0) {
      companyService
        .getCompanyCouponsMaxPrice(inputRef.current.value)
        .then((coupons) => setCoupons(coupons))
        .catch((err) => notificationsService.error(err));
    }
  }

  function byCategory() {
    companyService
      .getCompanyCouponsByCategory(inputRef2.current.value)
      .then((coupons) => setCoupons(coupons))
      .catch((err) => notificationsService.error(err));
  }

  function backToAll() {
    companyService
      .getCompanyCoupons()
      .then((coupons) => setCoupons(coupons))
      .catch((err) => notificationsService.error(err));
  }

  return (
    <div className="CompanyCoupons">
      <h4>Amount of coupons : {getCoupons?.length}</h4>

      <button className="button-33" onClick={backToAll}>Go back to coupons</button>

      <div id="filters">
        <input ref={inputRef} type="number" placeholder="max price" min={0} />
        <button className="button-33" onClick={byMaxPrie}>Filter by price</button>
        <br />
        <select ref={inputRef2}>
          <option>Food</option>
          <option>Vacation</option>
          <option>Sport</option>
          <option></option>
        </select>
        <br />
        <button className="button-33" onClick={byCategory}>
          filter by category
        </button>
      </div>
      <br />
      <div>
        {getCoupons.map((c) => (
          <CouponCard key={c.id} coupon={c} />
        ))}
      </div>
    </div>
  );
}

export default CompanyCoupons;
