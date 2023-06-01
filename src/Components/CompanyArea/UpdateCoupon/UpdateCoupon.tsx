import { useForm } from "react-hook-form";
import "./UpdateCoupon.css";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import companyService from "../../../Services/CompanyService";
import notificationsService from "../../../Services/NotificationsService";
import { NavLink } from "react-router-dom";
import { Coupon } from "../../../Models/Coupon";
import { authStore } from "../../../Stores/AuthState";

function UpdateCoupon(): JSX.Element {
  const { register, handleSubmit, formState, setValue } = useForm<Coupon>();
  const navigate = useNavigate();
  const id: number = +useParams().couponId;

  useEffect(() => {
    if (!authStore.getState().token) {
      notificationsService.error("unauthorize, please log in");
      navigate("/home");
      return;
    }

    companyService
      .getCompanyCoupons()
      .then((couponsList) => {
        const coupon = couponsList.find((c) => c.id == id);
        setValue("title", coupon.title);
        setValue("category", coupon.category);
        setValue("description", coupon.description);
        setValue("startDate", coupon.startDate);
        setValue("endDate", coupon.endDate);
        setValue("price", coupon.price);
        setValue("amount", coupon.amount);
        setValue("image", coupon.image);
      })
      .catch((err) => notificationsService.error(err));
  }, []);

  function sendCoupon(coupon: Coupon) {
    companyService
      .getCompanyDetails()
      .then((c) => (coupon.company = c))
      .catch((err) => notificationsService.error(err));
    coupon.id = id;

    coupon.image = (coupon.image as FileList)[0];
    let reader = new FileReader();
    reader.readAsDataURL(coupon.image);
    reader.onload = function () {
      coupon.image = reader.result as string;

      companyService
        .updateCoupon(coupon)
        .then((msg) => {
          notificationsService.success(msg);
          navigate("/company/coupons/" + id);
        })
        .catch((err) => notificationsService.error(err));
    };
  }

  return (
    <div className="UpdateCoupon">
      <NavLink to={"/company/coupons/" + id}>
        <button>back</button>
      </NavLink>
      <h3>Update coupon :</h3>

      <form className="box" onSubmit={handleSubmit(sendCoupon)}>
        <input
          type="text"
          placeholder="title"
          {...register("title", {
            required: { value: true, message: "title is a must!" },
          })}
        />
        <br />
        <span>{formState.errors?.title?.message}</span>
        <br />

        <select {...register("category")}>
          <option>Food</option>
          <option>Vacation</option>
          <option>Gaming</option>
          <option>Sport</option>
        </select>
        <br />

        <input
          type="text"
          placeholder="description"
          {...register("description", {
            required: { value: true, message: "description is a must!" },
            minLength: {
              value: 10,
              message: "must enter at least 10 characters",
            },
          })}
        />
        <br />
        <span>{formState.errors?.description?.message}</span>
        <br />

        <input
          type="date"
          placeholder="start date"
          {...register("startDate")}
        />
        <br />
        <input type="date" placeholder="end date" {...register("endDate")} />
        <br />

        <input
          type="number"
          placeholder="price"
          {...register("price", {
            required: { value: true, message: "must enter price" },
            min: { value: 1, message: "price must be at least 1" },
          })}
        />
        <br />
        <span>{formState.errors?.price?.message}</span>
        <br />

        <input type="number" placeholder="amount" {...register("amount")} />
        <br />

        <input
          type="file"
          placeholder="image"
          {...register("image", {
            required: { value: true, message: "must enter a picture" },
          })}
        />
        <br />
        <span>{formState.errors?.image?.message}</span>
        <br />

        <button type="submit" value="edit" >Update</button>
      </form>
    </div>
  );
}

export default UpdateCoupon;
