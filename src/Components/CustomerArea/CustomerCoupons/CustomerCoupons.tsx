import { useEffect, useRef, useState } from "react";
import "./CustomerCoupons.css";
import customerService from "../../../Services/CustomerService";
import notificationsService from "../../../Services/NotificationsService";
import { Coupon } from "../../../Models/Coupon";
import CouponCard from "../../CouponArea/CouponCard/CouponCard";

function CustomerCoupons(): JSX.Element {
  const [getCoupons, setCoupons] = useState<Coupon[]>([]);
  const inputRef = useRef(null);
  const inputRef2 = useRef(null);

  useEffect(() => {
    customerService
      .getCustomerCoupons()
      .then((coupons) => setCoupons(coupons))
      .catch((err) => notificationsService.error(err));
  }, []);

  function byMaxPrie() {
    if (inputRef.current.value > 0) {
      customerService
        .getCustomerCouponsByMaxPrice(inputRef.current.value)
        .then((coupons) => setCoupons(coupons))
        .catch((err) => notificationsService.error(err));
    }
  }

  function byCategory() {
    customerService
      .getCustomerCouponsByCategory(inputRef2.current.value)
      .then((coupons) => setCoupons(coupons))
      .catch((err) => notificationsService.error(err));
  }

  function backToAll() {
    customerService
      .getCustomerCoupons()
      .then((coupons) => setCoupons(coupons))
      .catch((err) => notificationsService.error(err));
  }

  return (
    <div className="CustomerCoupons">
      <h4>Amount of purchases: {getCoupons?.length}</h4>

      <button onClick={backToAll}>back to all coupons</button>

      <div id="filters">
        <input ref={inputRef} type="number" placeholder="max price" min={0} />
        <button className="button-33" onClick={byMaxPrie}>filter by price</button>

        <select ref={inputRef2}>
          <option>Food</option>
          <option>Vacation</option>
          <option>Gaming</option>
          <option>Sport</option>
        </select>
        <button className="button-33" onClick={byCategory}>filter by category</button>
      </div>

      <div>
        {getCoupons.map((c) => (
          <CouponCard key={c.id} coupon={c} />
        ))}
      </div>
    </div>
  );
}

export default CustomerCoupons;
