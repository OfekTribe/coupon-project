import { createStore } from "redux";
import Customer from "../Models/Customer";

export class CustomerState {
  public customers: Customer[] = [];
}

export enum CustomersActionsType {
  FetchCustomers,
  AddCustomer,
  DeleteCustomer,
  UpdateCustomer,
}

export interface CustomersActions {
  type: CustomersActionsType;
  payload: any;
}

export function addCustomer(customer: Customer) {
  return { type: CustomersActionsType.AddCustomer, payload: customer };
}

export function fetchCustomers(customers: Customer[]) {
  return { type: CustomersActionsType.FetchCustomers, payload: customers };
}

export function deleteCustomer(id: number) {
  return { type: CustomersActionsType.DeleteCustomer, payload: id };
}

export function updateCustomer(customer: Customer) {
  return { type: CustomersActionsType.UpdateCustomer, payload: customer };
}

function customerReducer(
  currentState = new CustomerState(),
  action: CustomersActions
) {
  const newState = { ...currentState };

  switch (action.type) {
    case CustomersActionsType.AddCustomer:
      newState.customers.push(action.payload);
      break;
    case CustomersActionsType.FetchCustomers:
      newState.customers = action.payload;
      break;
    case CustomersActionsType.DeleteCustomer:
      const id = action.payload;
      const index = newState.customers.findIndex((c) => c.id == id);
      if (index >= 0) {
        newState.customers.splice(index, 1);
      }
      break;
    case CustomersActionsType.UpdateCustomer:
      const compId = action.payload;
      const compIndex = newState.customers.findIndex((c) => c.id == id);
      if (compIndex >= 0) {
        newState.customers[compIndex] = action.payload;
      }
      break;
  }
  return newState;
}

export const customersStore = createStore(customerReducer);
