import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Form, useNavigate, useParams } from "react-router-dom";
import Customer from "../../../Models/Customer";
import AdminService from "../../../Services/AdminService";
import notificationService from "../../../Services/NotificationService";
import "./UpdateCustomer.css";

function UpdateCustomer(): JSX.Element {
  const { register, handleSubmit, formState, setValue } = useForm<Customer>();
  const navigate = useNavigate();
  const id: number = +useParams().customerId;

  useEffect(() => {
    new AdminService()
      .getCustomer(id) // returns Promise
      .then((cust) => {
        setValue("email", cust.email);
        setValue("password", cust.password);
      })
      .catch((error) => notificationService.error(error));
  }, []);

  function sendCustomer(customer: Customer) {
    customer.id = id;
    new AdminService()
      .updateCustomer(customer)
      .then((newCustomer) => {
        notificationService.success("Customer updated...");
        navigate("/customers");
      })
      .catch((error) => {
        notificationService.error(error);
      });
  }

  return (
    <div className="UpdateCustomer">
      <Form onSubmit={handleSubmit(sendCustomer)}>
        <>
          <h2>Update Customer : </h2>
          <input
            type="text"
            id="email"
            placeholder="Email"
            {...register("email")}
          />
          <br />
          <br />
          <span>{formState.errors?.email?.message}</span>
          <br />

          <input
            type="password"
            id="password"
            placeholder="Password"
            {...register("password")}
          />
          <br />
          <br />
          <span>{formState.errors?.password?.message}</span>
          <br />
        </>
      </Form>
    </div>
  );
}

export default UpdateCustomer;
