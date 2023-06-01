import { useEffect, useState } from "react";
import "./GetAllCoupons.css";
import notificationsService from "../../../Services/NotificationsService";
import CouponCard from "../../CouponArea/CouponCard/CouponCard";
import customerService from "../../../Services/CustomerService";
import { Coupon } from "../../../Models/Coupon";

function GetAllCoupons(): JSX.Element {
  const [couponsArray, setCoupons] = useState<Coupon[]>([]);

  useEffect(() => {
    customerService
      .getAllCoupons()
      .then((coupons) => setCoupons(coupons))
      .catch((err) => notificationsService.error(err));
  }, []);

  return (
    <div className="GetAllCoupons">
      {couponsArray.map((c) => (
        <CouponCard key={c.id} coupon={c} />
      ))}
    </div>
  );
}

export default GetAllCoupons;
