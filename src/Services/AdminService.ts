import Axios from "axios";
import Company from "../Models/Company";
import {
  addCompany,
  companiesStore,
  deleteCompany,
  fetchCompanies,
  updateCompany,
} from "../Stores/CompanyStore";
import Customer from "../Models/Customer";
import {
  addCustomer,
  customersStore,
  deleteCustomer,
  fetchCustomers,
  updateCustomer,
} from "../Stores/CustomerStore";
import authService from "./AuthService";

class AdminService {
  public async getAllCompanies(): Promise<Company[]> {
    if (companiesStore.getState().companies.length == 0) {
      const response = await Axios.get<Company[]>(
        "http://localhost:8080/admin/allCompanies"
      );
      companiesStore.dispatch(fetchCompanies(response.data));
      return response.data;
    }
    return companiesStore.getState().companies;
  }

  public async addNewCompany(company: Company) {
    const formData = new FormData();
    formData.append("name", company.name);
    formData.append("email", company.email);
    formData.append("password", company.password);
    formData.append("coupons", company.coupons.toString());
    const response = (
      await Axios.post<Company>("http://localhost:8080/admin/addComp", formData)
    ).data;
    companiesStore.dispatch(addCompany(response));
    return response;
  }

  public async getCompany(id: number): Promise<Company> {
    const company = companiesStore.getState().companies.find((c) => c.id == id);
    if (company == undefined) throw Error("Id not found!");
    else return company;
  }

  public async deleteCompany(id: number) {
    const response = (
      await Axios.delete<number>("http://localhost:8080/admin/deleteComp/" + id)
    ).data;
    companiesStore.dispatch(deleteCompany(response));
  }

  public async updateCompany(company: Company) {
    const formData = new FormData();
    formData.append("name", company.name);
    formData.append("email", company.email);
    formData.append("password", company.password);
    formData.append("coupons", company.coupons.toString());
    const response = (
      await Axios.put<Company>(
        "http://localhost:8080/admin/updateComp" + company.id,
        formData
      )
    ).data;
    companiesStore.dispatch(updateCompany(response));
    return response;
  }

  public async updateCustomer(customer: Customer) {
    const formData = new FormData();
    formData.append("email", customer.email);
    formData.append("password", customer.password);
    formData.append("coupons", customer.coupons.toString());
    const response = (
      await Axios.put<Customer>(
        "http://localhost:8080/admin/updateCustomer" + customer.id,
        formData
      )
    ).data;
    customersStore.dispatch(updateCustomer(response));
    return response;
  }

  public async addNewCustomer(customer: Customer) {
    const formData = new FormData();
    formData.append("firstName", customer.firstName);
    formData.append("lastName", customer.lastName);
    formData.append("email", customer.email);
    formData.append("password", customer.password);
    formData.append("coupons", customer.coupons.toString());
    const response = (
      await Axios.post<Customer>(
        "http://localhost:8080/admin/addCustomer",
        formData
      )
    ).data;
    customersStore.dispatch(addCustomer(response));
    return response;
  }

  public async deleteCustomer(id: number) {
    const response = (
      await Axios.delete<number>("http://localhost:8080/admin/deleteCustomer/" + id)
    ).data;
    customersStore.dispatch(deleteCustomer(response));
  }

  public async getAllCustomers() {
    if (customersStore.getState().customers.length == 0) {
      const response = await Axios.get<Customer[]>(
        "http://localhost:8080/admin/allCustomers"
      );
      customersStore.dispatch(fetchCustomers(response.data));
      return response.data;
    }
    return customersStore.getState().customers;
  }

  public async getCustomer(id: number): Promise<Customer> {
    const customer = customersStore
      .getState()
      .customers.find((c) => c.id == id);
    if (customer == undefined) throw Error("Id not found!");
    else return customer;
  }
}

export default AdminService;
