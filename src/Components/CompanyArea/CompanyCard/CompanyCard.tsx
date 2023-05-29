import Company from "../../../Models/Company";
import "./CompanyCard.css";

interface companyProps {
    company: Company;
}

function CompanyCard(props: companyProps): JSX.Element {
    return (
        <div className="CompanyCard">
			<h2>Name : {props.company.name}</h2>
            <p>Email : {props.company.email}</p>
        </div>
    );
}

export default CompanyCard;
