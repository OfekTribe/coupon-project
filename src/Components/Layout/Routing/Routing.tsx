import { Route } from "react-router-dom";
import "./Routing.css";
import PageNotFound from "../PageNotFound/PageNotFound";

function Routing(): JSX.Element {
    return (
        <div className="Routing">
			<Route path="*" element={<PageNotFound />} />
        </div>
    );
}

export default Routing;
