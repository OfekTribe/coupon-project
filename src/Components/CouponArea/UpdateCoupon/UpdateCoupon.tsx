import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Form, useNavigate, useParams } from "react-router-dom";
import "./UpdateCoupon.css";
import { Coupon } from "../../../Models/Coupon";
import CouponService from "../../../Services/CouponService";
import notificationService from "../../../Services/NotificationService";

function UpdateCoupon(): JSX.Element {
  const { register, handleSubmit, formState, setValue } = useForm<Coupon>();
  const navigate = useNavigate();
  const id: number = +useParams().coupId;

  useEffect(() => {
    new CouponService()
      .getOneCoupon(id) // returns Promise
      .then((coup) => {
        setValue("company", coup.company);
        setValue("category", coup.category);
        setValue("title", coup.title);
        setValue("description", coup.description);
        setValue("startDate", coup.startDate);
        setValue("endDate", coup.endDate);
        setValue("amount", coup.amount);
        setValue("price", coup.price);
        setValue("image", coup.image);
      })
      .catch((error) => notificationService.error(error));
  }, []);

  function sendCoupon(coupon: Coupon) {
    coupon.image = coupon.image as File;
    coupon.id = id;
    new CouponService()
      .updateCoupon(coupon)
      .then((newCoup) => {
        notificationService.success("Coupon updated !");
        navigate("/coupons");
      })
      .catch((error) => {
        notificationService.error(error);
      });
  }

  return (
    <div className="UpdateCoupon">
      <Form onSubmit={handleSubmit(sendCoupon)}>
        <>
          <h2>Update Coupon : </h2>
          <input
            type="text"
            placeholder="title"
            {...register("title")}
          />
          <br />
          <br />
          <span>{formState.errors?.title?.message}</span>
          <br />

          <input
            type="text"
            placeholder="description"
            {...register("description", {})}
          />
          <br />
          <br />
          <span>{formState.errors?.description?.message}</span>
          <br />

          <input
            type="text"
            placeholder="startDate"
            {...register("startDate", {})}
          />
          <br />
          <br />
          <span>{formState.errors?.startDate?.message}</span>
          <br />

          <input
            type="text"
            placeholder="endDate"
            {...register("endDate", {})}
          />
          <br />
          <br />
          <span>{formState.errors?.endDate?.message}</span>
          <br />

          <input type="text" placeholder="amount" {...register("amount", {})} />
          <br />
          <br />
          <span>{formState.errors?.amount?.message}</span>
          <br />

          <input type="text" placeholder="price" {...register("price", {})} />
          <br />
          <br />
          <span>{formState.errors?.price?.message}</span>
          <br />

          <input type="submit" value="Update" />
        </>
      </Form>
    </div>
  );
}

export default UpdateCoupon;
