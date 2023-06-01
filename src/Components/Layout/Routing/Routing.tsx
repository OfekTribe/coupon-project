import { Navigate, Route, Routes } from "react-router-dom";
import "./Routing.css";
import PageNotFound from "../PageNotFound/PageNotFound";
import GetAllCompanies from "../../AdminArea/GetAllCompanies/GetAllCompanies";
import GetAllCustomers from "../../AdminArea/GetAllCustomers/GetAllCustomers";
import AddCompany from "../../AdminArea/AddCompany/AddCompany";
import AddCustomer from "../../AdminArea/AddCustomer/AddCustomer";
import CompanyCoupons from "../../CompanyArea/CompanyCoupons/CompanyCoupons";
import AddCoupon from "../../CompanyArea/AddCoupon/AddCoupon";
import UpdateCustomer from "../../AdminArea/UpdateCustomer/UpdateCustomer";
import CompanyDetails from "../../AdminArea/CompanyDetails/CompanyDetails";
import UpdateCompany from "../../AdminArea/UpdateCompany/UpdateCompany";
import CustomerDetails from "../../AdminArea/CustomerDetails/CustomerDetails";
import CouponDetails from "../../CouponArea/CouponDetails/CouponDetails";
import UpdateCoupon from "../../CompanyArea/UpdateCoupon/UpdateCoupon";
import CustomerCoupons from "../../CustomerArea/CustomerCoupons/CustomerCoupons";
import CustomerPurchasedCouponDetails from "../../CustomerArea/CustomerPurchasedCouponDetails/CustomerPurchasedCouponDetails";
import AboutUs from "../AboutUs/AboutUs";
import Home from "../Home/Home";
import Login from "../../AuthArea/Login/Login";

function Routing(): JSX.Element {
    return (
        <div className="Routing">
            <Routes>
                <Route path="/home" element={<Home />} />
                <Route path="/about" element={<AboutUs />} />
                <Route path="/login" element={<Login />} />
                
                <Route path="/administrator/companies" element={<GetAllCompanies />} />
                <Route path="/administrator/companies/:companyId" element={<CompanyDetails />} />
                <Route path="/administrator/addCompany" element={<AddCompany />} />
                <Route path="/administrator/companies/edit/:companyId" element={<UpdateCompany />} />

                <Route path="/administrator/customers" element={<GetAllCustomers />} />
                <Route path="/administrator/customer/:customerId" element={<CustomerDetails />} />
                <Route path="/administrator/addCustomer" element={<AddCustomer />} />
                <Route path="/administrator/customers/edit/:customerId" element={<UpdateCustomer />} />

                <Route path="/company/coupons" element={<CompanyCoupons />} />
                <Route path="/company/coupons/:couponId" element={<CouponDetails />} />
                <Route path="/company/addCoupon" element={<AddCoupon />} />
                <Route path="/company/coupons/edit/:couponId" element={<UpdateCoupon />} />

                <Route path="/customer/coupons" element={<CustomerCoupons />} />
                <Route path="/customer/myCoupons/:couponId" element={<CustomerPurchasedCouponDetails />} />


                <Route path="/" element={<Navigate to="/home" />} />
                <Route path="*" element={<PageNotFound />} />
            </Routes >
        </div >
    );
}

export default Routing;
