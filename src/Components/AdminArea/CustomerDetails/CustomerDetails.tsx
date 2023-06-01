import { useEffect, useState } from "react";
import "./CustomerDetails.css";
import { useNavigate, useParams } from "react-router-dom";
import adminServise from "../../../Services/AdminService";
import notificationsService from "../../../Services/NotificationsService";
import CouponCard from "../../CouponArea/CouponCard/CouponCard";
import { authStore } from "../../../Stores/AuthState";
import { Coupon } from "../../../Models/Coupon";

function CustomerDetails(): JSX.Element {
  const [getCustomer, setCustomer] = useState<any>();
  const id: number = +useParams().customerId;
  const navigate = useNavigate();

  useEffect(() => {
    if (!authStore.getState().token) {
      notificationsService.error("unauthorize, please log in");
      navigate("/home");
      return;
    }

    adminServise
      .getOneCustomer(id)
      .then((customer) => setCustomer(customer))
      .catch((err) => notificationsService.error(err));
  }, []);

  function deleteMe() {
    adminServise
      .deleteCustomer(id)
      .then((msg) => {
        notificationsService.success(msg);
        navigate("/administrator/customers");
      })
      .catch((err) => notificationsService.error(err));
  }

  function updateCustomer() {
    navigate("/administrator/customers/edit/" + id);
  }

  function back() {
    navigate("/administrator/customers");
  }

  return (
    <div className="CustomerDetails">
      <button onClick={back}>back</button>
      {!getCustomer && <p>Sorry, can not find the customer...</p>}

      {getCustomer && (
        <div>
          <p>First name : {getCustomer?.firstName}</p>
          <p>Last name : {getCustomer?.lastName}</p>
          <p>Email: {getCustomer?.email}</p>
          <button onClick={updateCustomer}>Edit</button>
          <br />
          <br />
          <button onClick={deleteMe}>Delete</button>
          <br />
        </div>
      )}
      {getCustomer && (
        <>
          <p>Custmer Purchases :</p>
          {getCustomer.coupons.map((c: Coupon) => (
            <CouponCard key={c.id} coupon={c} />
          ))}
        </>
      )}
    </div>
  );
}

export default CustomerDetails;
