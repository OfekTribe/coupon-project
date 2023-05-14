import { Coupon } from "../Models/Coupon";

export class CouponState {
    public coupons: Coupon[] = [];
}

export enum CouponsActionsTypes {
    FetchCoupons, AddCoupon, DeleteCoupon, UpdateCoupon
}