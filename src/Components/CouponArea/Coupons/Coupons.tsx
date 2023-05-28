import { useEffect, useState } from "react";
import "./Coupons.css";
import { Coupon } from "../../../Models/Coupon";
import CouponService from "../../../Services/CouponService";
import CouponCard from "../CouponCard/CouponCard";

function Coupons(): JSX.Element {
    const [getCoupons, setCoupons] = useState<Coupon[]>([]);

    useEffect(() => {
        const couponService = new CouponService();
        couponService.getAllCoupons().then(coupons => {
            setCoupons(coupons);
        }).catch(err => alert(err));
    }, [])

    return (
        <div className="Coupons">
            {getCoupons.map(c => <CouponCard key={c.id} coupon={c} />)}
        </div>
    );
}

export default Coupons;
