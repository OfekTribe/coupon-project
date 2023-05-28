import { Form, useNavigate } from "react-router-dom";
import { Coupon } from "../../../Models/Coupon";
import { couponsStore } from "../../../Stores/CouponStore";
import "./AddCoupon.css";
import notificationService from "../../../Services/NotificationService";
import { useForm } from "react-hook-form";
import CouponService from "../../../Services/CouponService";

function AddCoupon(): JSX.Element {

    const { register, handleSubmit, formState } = useForm<Coupon>();
    const navigate = useNavigate();

    function sendCoupon(coupon: Coupon) {
        coupon.image = (coupon.image as File);
        const couponService = new CouponService;
        couponService.addNewCoupon(coupon)
            .then(newCoup => {
                notificationService.success("Coupon added !");
                navigate("/coupons/" + newCoup.id);
            })
            .catch(error => {
                console.log(error);
                notificationService.error(error);
            });
    }
 
    return (
        <div className="AddCoupon">
			<Form className="flex-box" onSubmit={handleSubmit(sendCoupon)}>
                <>
                    <h2>Add New Product : </h2>
                    <input type="text" id="company" placeholder="" {...register("company", {
                        required: { value: true, message: "You must enter coupon's company" },
                    })}
                    /><br /><br />
                    <span>{formState.errors?.company?.message}</span><br />

                    <input type="text" placeholder="category" {...register("category", {
                        required: { value: true, message: "You must enter coupon's category" }
                    })} /><br /><br />
                    <span>{formState.errors?.category?.message}</span><br />

                    <input type="text" placeholder="title" {...register("title", {
                        required: { value: true, message: "You must enter coupon's title" }
                    })} /><br /><br />
                    <span>{formState.errors?.title?.message}</span><br />

                    <input type="text" placeholder="description" {...register("description", {
                        required: { value: true, message: "You must enter coupon's description" }
                    })} /><br /><br />
                    <span>{formState.errors?.description?.message}</span><br />

                    <input type="text" placeholder="startDate" {...register("startDate", {
                        required: { value: true, message: "You must enter coupon's start date" }
                    })} /><br /><br />
                    <span>{formState.errors?.startDate?.message}</span><br />

                    <input type="text" placeholder="endDate" {...register("endDate", {
                        required: { value: true, message: "You must enter coupon's end date" }
                    })} /><br /><br />
                    <span>{formState.errors?.endDate?.message}</span><br />

                    <input type="text" placeholder="amount" {...register("amount", {
                        required: { value: true, message: "You must enter coupon's amount" }
                    })} /><br /><br />
                    <span>{formState.errors?.amount?.message}</span><br />

                    <input type="text" placeholder="price" {...register("price", {
                        required: { value: true, message: "You must enter coupon's price" }
                    })} /><br /><br />
                    <span>{formState.errors?.price?.message}</span><br />

                    <input type="file" placeholder="image" {...register("image")}/>

                    <input type="submit" value="Add" />
                </>
            </Form>
        </div>
    );
}

export default AddCoupon;
