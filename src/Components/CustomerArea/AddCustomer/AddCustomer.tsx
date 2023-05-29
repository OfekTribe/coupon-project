import { useForm } from "react-hook-form";
import { Form, useNavigate } from "react-router-dom";
import Customer from "../../../Models/Customer";
import AdminService from "../../../Services/AdminService";
import notificationService from "../../../Services/NotificationService";
import "./AddCustomer.css";

function AddCustomer(): JSX.Element {

    
    const { register, handleSubmit, formState } = useForm<Customer>();
    const navigate = useNavigate();

    function sendCustomer(customer: Customer) {
        const adminService = new AdminService;
        adminService.addNewCustomer(customer)
            .then(newCustomer => {
                notificationService.success("Customer added !");
                navigate("/customers");
            })
            .catch(error => {
                console.log(error);
                notificationService.error(error);
            });
    }

    return (
        <div className="AddCustomer">
			<Form onSubmit={handleSubmit(sendCustomer)}>
                <>
                    <h2>Add New Customer : </h2>
                    
                    <input type="text" id="email" placeholder="Email" {...register("email", {
                        required: { value: true, message: "You must enter customer email" },
                    })}
                    /><br /><br />
                    <span>{formState.errors?.email?.message}</span><br />

                    
                    <input type="password" id="password" placeholder="Password" {...register("password", {
                        required: { value: true, message: "You must enter customer password" },
                    })}
                    /><br /><br />
                    <span>{formState.errors?.password?.message}</span><br />

                    <input type="submit" value="Add" />
                </>
            </Form>
        </div>
    );
}

export default AddCustomer;
