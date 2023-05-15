import { createStore } from "redux";
import Company from "../Models/Company";

export class CompanyState {
  public companies: Company[] = [];
}

export enum CompaniesActionsType {
  FetchCompanies,
  AddCompany,
  DeleteCompany,
  UpdateCompany,
}

export interface CompaniesActions {
  type: CompaniesActionsType;
  payload: any;
}

export function addCompany(company: Company) {
  return { type: CompaniesActionsType.AddCompany, payload: company };
}

export function fetchCompanies(companies: Company[]) {
  return { type: CompaniesActionsType.FetchCompanies, payload: companies };
}

export function deleteCompany(id: number) {
  return { type: CompaniesActionsType.DeleteCompany, payload: id };
}

export function updateCompany(company: Company) {
  return { type: CompaniesActionsType.UpdateCompany, payload: company };
}

function companyReducer(
  currentState = new CompanyState(),
  action: CompaniesActions
) {
  const newState = { ...currentState };

  switch (action.type) {
    case CompaniesActionsType.AddCompany:
      newState.companies.push(action.payload);
      break;
    case CompaniesActionsType.FetchCompanies:
      newState.companies = action.payload;
      break;
    case CompaniesActionsType.DeleteCompany:
      const id = action.payload;
      const index = newState.companies.findIndex((c) => c.id == id);
      if (index >= 0) {
        newState.companies.splice(index, 1);
      }
      break;
    case CompaniesActionsType.UpdateCompany:
      const compId = action.payload;
      const compIndex = newState.companies.findIndex((c) => c.id == id);
      if (compIndex >= 0) {
        newState.companies[compIndex] = action.payload;
      }
      break;
  }
  return newState;
}

export const companiesStore = createStore(companyReducer);
