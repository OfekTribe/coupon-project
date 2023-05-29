import { Navigate, Route, Routes } from "react-router-dom";
import "./Routing.css";
import PageNotFound from "../PageNotFound/PageNotFound";
import Login from "../../AuthArea/Login/Login";
import Home from "../Home/Home";
import AboutUs from "../AboutUs/AboutUs";
import { ClientType, Credentials } from "../../../Models/Credentials";
import Companies from "../../AdminArea/Companies/Companies";
import Customers from "../../AdminArea/Customers/Customers";
import AddCustomer from "../../CustomerArea/AddCustomer/AddCustomer";
import AddCompany from "../../CompanyArea/AddCompany/AddCompany";
import AddCoupon from "../../CouponArea/AddCoupon/AddCoupon";
import UpdateCustomer from "../../CustomerArea/UpdateCustomer/UpdateCustomer";
import UpdateCompany from "../../CompanyArea/UpdateCompany/UpdateCompany";
import UpdateCoupon from "../../CouponArea/UpdateCoupon/UpdateCoupon";
import Coupons from "../../CouponArea/Coupons/Coupons";
import CouponDetails from "../../CouponArea/CouponDetails/CouponDetails";
import CompanyDetails from "../../CompanyArea/CompanyDetails/CompanyDetails";
import CustomerDetails from "../../CustomerArea/CustomerDetails/CustomerDetails";

function Routing(): JSX.Element {
  return (
    <div className="Routing">
      <Routes>
        <Route path="/customerDetails/:customerId" element={<CustomerDetails />} />
        <Route path="/companyDetails/:compId" element={<CompanyDetails />} />
        <Route path="/couponDetails/:coupId" element={<CouponDetails />} />

        <Route path="/updateCoupon/:coupId" element={<UpdateCoupon />} />
        <Route path="/updateCompany/:compId" element={<UpdateCompany />} />
        <Route path="/updateCustomer/:customerId" element={<UpdateCustomer />} />

        <Route path="/addCoupon" element={<AddCoupon />} />
        <Route path="/addCompany" element={<AddCompany />} />
        <Route path="/addCustomer" element={<AddCustomer />} />

        <Route path="/coupons" element={<Coupons />} />
        <Route path="/companies" element={<Companies />} />
        <Route path="/customers" element={<Customers />} />

        <Route path="/about" element={<AboutUs />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
}

export default Routing;
