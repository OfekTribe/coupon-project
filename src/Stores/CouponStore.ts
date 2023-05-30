import { createStore } from "redux";
import { Coupon } from "../Models/Coupon";

export class CouponState {
  public coupons: Coupon[] = [];
}

export enum CouponsActionsTypes {
  FetchCoupons,
  AddCoupon,
  DeleteCoupon,
  UpdateCoupon,
}

export interface CouponsActions {
  type: CouponsActionsTypes;
  payload: any;
}

export function addCoup(coupon: Coupon) {
  return { type: CouponsActionsTypes.AddCoupon, payload: coupon };
}

export function fetchCoupons(coupons: Coupon[]) {
  return { type: CouponsActionsTypes.FetchCoupons, payload: coupons };
}

export function deleteCoup(id: number) {
  return { type: CouponsActionsTypes.DeleteCoupon, payload: id };
}

export function updateCoup(coupon: Coupon) {
  return { type: CouponsActionsTypes.UpdateCoupon, payload: coupon };
}

function couponsReducer(
  currentState = new CouponState(),
  action: CouponsActions
) {
  const newState = { ...currentState };

  switch (action.type) {
    case CouponsActionsTypes.AddCoupon:
      newState.coupons.push(action.payload);
      break;
    case CouponsActionsTypes.FetchCoupons:
      newState.coupons = action.payload;
      break;
    case CouponsActionsTypes.DeleteCoupon:
      const id = action.payload;
      const index = newState.coupons.findIndex((c) => c.id == id);
      if (index >= 0) {
        newState.coupons.splice(index, 1);
      }
        break;
    case CouponsActionsTypes.UpdateCoupon:
      const coupId = action.payload.id;
      const coupIndex = newState.coupons.findIndex((c) => c.id == coupId);
      if (coupIndex >= 0) {
        newState.coupons[coupIndex] = action.payload;
      }
        break;
  }
  return newState;
}

export const couponsStore = createStore(couponsReducer);
