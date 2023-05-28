import { Coupon } from "../../../Models/Coupon";
import "./CouponCard.css";

interface couponProps{
    coupon: Coupon;
}

function CouponCard(props: couponProps): JSX.Element {
    return (
        <div className="CouponCard">
			<h2>{props.coupon.title}</h2>
            <p>Category : {JSON.stringify(props.coupon.category)}</p>
            <p>{props.coupon.description}</p>
            <p>Start date: {props.coupon.startDate.toDateString()}</p>
            <p>End date : {props.coupon.endDate.toDateString()}</p>
            <p>Amount : {props.coupon.amount}</p>
            <p>Price : {props.coupon.price}</p>
            <img src={props.coupon.image.toString()} alt="img" ></img>
        </div>
    );
}

export default CouponCard;
