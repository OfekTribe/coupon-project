import { Form, useNavigate } from "react-router-dom";
import Company from "../../../Models/Company";
import AdminService from "../../../Services/AdminService";
import CompanyService from "../../../Services/CompanyService";
import "./AddCompany.css";
import { useForm } from "react-hook-form";
import notificationService from "../../../Services/NotificationService";

function AddCompany(): JSX.Element {

    const { register, handleSubmit, formState } = useForm<Company>();
    const navigate = useNavigate();

    function sendCompany(company: Company) {
        const adminService = new AdminService;
        adminService.addNewCompany(company)
            .then(newComp => {
                notificationService.success("Company added !");
                navigate("/companies");
            })
            .catch(error => {
                console.log(error);
                notificationService.error(error);
            });
    }

    return (
        <div className="AddCompany">
			<Form onSubmit={handleSubmit(sendCompany)}>
                <>
                    <h2>Add New Company : </h2>
                    <input type="text" id="email" placeholder="" {...register("email", {
                        required: { value: true, message: "You must enter company email" },
                    })}
                    /><br /><br />
                    <span>{formState.errors?.email?.message}</span><br />

                    <input type="text" id="name" placeholder="" {...register("name", {
                        required: { value: true, message: "You must enter company name" },
                    })}
                    /><br /><br />
                    <span>{formState.errors?.name?.message}</span><br />

                    <input type="text" id="password" placeholder="" {...register("password", {
                        required: { value: true, message: "You must enter company password" },
                    })}
                    /><br /><br />
                    <span>{formState.errors?.password?.message}</span><br />
                </>
            </Form>
        </div>
    );
}

export default AddCompany;
