import Axios from "axios";
import Company from "../Models/Company";
import { addCompany, companiesStore, deleteCompany, fetchCompanies, updateCompany } from "../Stores/CompanyStore";

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
    const response = (await Axios.post<Company>("http://localhost:8080/admin/addComp", formData)).data;
    companiesStore.dispatch(addCompany(response));
    return response;
  }

  public async getCompany(id: number) : Promise<Company> {
    const company = companiesStore.getState().companies.find(c => c.id == id);
    if(company == undefined)
        throw Error("Id not found!")
    else
        return company;
  }

  public async deleteCompany(id: number) {
    const response = (await Axios.delete<number>("http://localhost:8080/admin/deleteComp/" + id)).data;
    companiesStore.dispatch(deleteCompany(response));   
 }

 public async updateCompany(company: Company) {
    const formData = new FormData();
    formData.append("name", company.name);
    formData.append("email", company.email);
    formData.append("password", company.password);
    formData.append("coupons", company.coupons.toString());
    const response = (await Axios.put<Company>("http://localhost:8080/admin/updateComp" + company.id, formData)).data;
    companiesStore.dispatch(updateCompany(response));
    return response;
 }
}

export default AdminService;
