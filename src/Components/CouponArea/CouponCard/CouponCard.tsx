import { Coupon } from "../../../Models/Coupon";
import "./CouponCard.css";

interface couponProps {
  coupon: Coupon;
}

function CouponCard(props: couponProps): JSX.Element {
  return (
    <div className="CouponCard">
      <h2>
        <strong>{props.coupon.title}</strong>
      </h2>
      <p>Description: {props.coupon.description}</p>
      <p>Start date: {props.coupon.endDate.toString()}</p>
      <p>End date: {props.coupon.endDate.toString()}</p>
      <img src={props.coupon.image.toString()} alt="img"></img>
    </div>
  );
}

export default CouponCard;
