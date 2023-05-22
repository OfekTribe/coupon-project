import { Coupon } from "../../../Models/Coupon";
import "./CouponCard.css";

interface couponProps{
    coupon: Coupon;
}

function CouponCard(props: couponProps): JSX.Element {
    return (
        <div className="CouponCard">
			<h2>{props.coupon.title}</h2>
            <p>{props.coupon.description}</p>
            <p>End date : {props.coupon.endDate.toString()}</p>
            <img src={props.coupon.image.toString()} alt="img" ></img>
        </div>
    );
}

export default CouponCard;
