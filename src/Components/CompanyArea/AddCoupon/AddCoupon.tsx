import { useForm } from "react-hook-form";
import "./AddCoupon.css";
import { NavLink, useNavigate } from "react-router-dom";
import notificationsService from "../../../Services/NotificationsService";
import companyService from "../../../Services/CompanyService";
import { useEffect } from "react";
import { Coupon } from "../../../Models/Coupon";
import { authStore } from "../../../Stores/AuthState";

function AddCoupon(): JSX.Element {
  const { register, handleSubmit, formState } = useForm<Coupon>();
  const navigate = useNavigate();

  useEffect(() => {
    if (!authStore.getState().token) {
      notificationsService.error("unauthorize, please log in");
      navigate("/home");
      return;
    }
  }, []);

  function sendCoupon(coupon: Coupon) {
    coupon.company = null;

    coupon.image = (coupon.image as FileList)[0];
    let reader = new FileReader();
    reader.readAsDataURL(coupon.image);
    reader.onload = function () {
      coupon.image = reader.result as string;

      companyService
        .addCoupon(coupon)
        .then((c) => {
          notificationsService.success("Coupon Added");
          navigate("/company/coupons/" + c.id);
        })
        .catch((err) => notificationsService.error(err));
    };
  }

  return (
    <div className="AddCoupon">
      <NavLink to="/company">
        <button className="button-33">Go Back</button>
      </NavLink>
      <h3>Add coupon :</h3>

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
          {...register("startDate", {
            required: { value: true, message: "start date is a must" },
          })}
        />
        <br />
        <span>{formState.errors?.startDate?.message}</span>
        <br />
        <input
          type="date"
          placeholder="end date"
          {...register("endDate", {
            required: { value: true, message: "end date is a must" },
          })}
        />
        <br />
        <span>{formState.errors?.endDate?.message}</span>
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

        <input
          type="number"
          placeholder="amount"
          {...register("amount", {
            min: { value: 0, message: "amount cant be les than 0" },
          })}
        />
        <br />
        <span>{formState.errors?.amount?.message}</span>
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

        <button className="button-33" type="submit" value="Add" >Add</button>
      </form>
    </div>
  );
}

export default AddCoupon;
