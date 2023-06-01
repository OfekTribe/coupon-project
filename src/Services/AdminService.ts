import axios from "axios";
import Company from "../Models/Company";
import Customer from "../Models/Customer";
import {
  adminStore,
  addCompany,
  updateCompany,
  deleteCompany,
  fetchCompany,
  addCustomer,
  updateCustomer,
  deleteCustomer,
  fetchCustomer,
} from "../Stores/AdminState";

class AdminService {
  public async addCompany(company: Company) {
    const response = (
      await axios.post<Company>("http://localhost:8080/admin/addComp", company)
    ).data;
    adminStore.dispatch(addCompany(response));
    return response;
  }

  public async updateCompany(company: Company) {
    const respone = (
      await axios.put<string>("http://localhost:8080/admin/updateComp", company)
    ).data;
    adminStore.dispatch(updateCompany(company));
    return respone;
  }

  public async deleteCompany(id: number) {
    const response = (
      await axios.delete<string>("http://localhost:8080/admin/deleteComp/" + id)
    ).data;
    adminStore.dispatch(deleteCompany(id));
    return response;
  }

  public async getOneCompany(id: number) {
    const company = adminStore.getState().companies.find((c) => c.id == id);
    if (company == undefined)
      return (
        await axios.get<Company>(
          "http://localhost:8080/admin/getOneCompany/" + id
        )
      ).data;
    else return company;
  }

  public async getAllCompanies() {
    if (adminStore.getState().companies.length == 0) {
      const companies = (
        await axios.get<Company[]>("http://localhost:8080/admin/allCompanies")
      ).data;
      adminStore.dispatch(fetchCompany(companies));
      return companies;
    }
    return adminStore.getState().companies;
  }

  public async addCustomer(customer: Customer) {
    const response = (
      await axios.post<Customer>(
        "http://localhost:8080/admin/addCustomer",
        customer
      )
    ).data;
    adminStore.dispatch(addCustomer(response));
    return response;
  }

  public async updateCustomer(customer: Customer) {
    const response = (
      await axios.put<string>(
        "http://localhost:8080/admin/updateCustomer",
        customer
      )
    ).data;
    adminStore.dispatch(updateCustomer(customer));
    return response;
  }

  public async deleteCustomer(id: number) {
    const response = (
      await axios.delete<string>(
        "http://localhost:8080/admin/deleteCustomer/" + id
      )
    ).data;
    adminStore.dispatch(deleteCustomer(id));
    return response;
  }

  public async getOneCustomer(id: number) {
    const customer = adminStore.getState().customers.find((c) => c.id == id);
    if (customer == undefined) {
      return (
        await axios.get<Customer>(
          "http://localhost:8080/admin/getOneCustomer/" + id
        )
      ).data;
    } else return customer;
  }

  public async getAllCustomers() {
    if (adminStore.getState().customers.length == 0) {
      const customers = (
        await axios.get<Customer[]>("http://localhost:8080/admin/allCustomers")
      ).data;
      adminStore.dispatch(fetchCustomer(customers));
      return customers;
    }
    return adminStore.getState().customers;
  }
}
const adminService = new AdminService();
export default adminService;
