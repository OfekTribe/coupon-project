import Customer from "../../../Models/Customer";
import "./CustomerCard.css";

interface customerProps {
  customer: Customer;
}

function CustomerCard(props: customerProps): JSX.Element {
  return (
    <div className="CustomerCard">
      <h2>Name : {props.customer.firstName + " " + props.customer.lastName}</h2>
      <p>Email : {props.customer.email}</p>
    </div>
  );
}

export default CustomerCard;
