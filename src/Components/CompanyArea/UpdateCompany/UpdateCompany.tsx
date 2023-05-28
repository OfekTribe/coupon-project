import { useForm } from "react-hook-form";
import { Form, useNavigate, useParams } from "react-router-dom";
import Company from "../../../Models/Company";
import "./UpdateCompany.css";
import CompanyService from "../../../Services/CompanyService";
import AdminService from "../../../Services/AdminService";
import { useEffect } from "react";
import notificationService from "../../../Services/NotificationService";

function UpdateCompany(): JSX.Element {
    const { register, handleSubmit, formState, setValue } = useForm<Company>();
    const navigate = useNavigate();
    const id: number =+ useParams().compId;

    
    useEffect(() => {
        new AdminService().getCompany(id) 
            .then(comp => {
                setValue("email", comp.email);
                setValue("password", comp.password);
            })
            .catch(error => notificationService.error(error))
    }, []);

    function sendCompany(company: Company) {
        company.id = id;
        new AdminService().updateCompany(company)
            .then(newComp => {
                notificationService.success("Company updated...");
                navigate("/companies");
            })
            .catch(error => {
                notificationService.error(error);
            });
    }



    return (
        <div className="UpdateCompany">
			<Form onSubmit={handleSubmit(sendCompany)}>
                <>
                    <h2>Update Company : </h2>
                    <input type="text" placeholder="email" {...register("email", {
                    })} /><br /><br />
                    <span>{formState.errors?.email?.message}</span><br />
                
                
                    <input type="text" placeholder="password" {...register("password", {
                    })} /><br /><br />
                    <span>{formState.errors?.password?.message}</span><br />

                    <input type="submit" value="Update" />
                </>
            </Form>    
        </div>
    );
}

export default UpdateCompany;
