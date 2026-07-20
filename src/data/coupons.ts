export interface Coupon {
  code: string;
  type: "percent" | "flat";
  value: number;
  minOrderINR?: number;
  description: string;
}

export const COUPONS: Coupon[] = [
  { code: "YORA10", type: "percent", value: 10, description: "10% off your order" },
  { code: "FREESHIP", type: "flat", value: 99, minOrderINR: 1, description: "Free shipping" },
];

export function getCouponByCode(code: string): Coupon | undefined {
  return COUPONS.find((c) => c.code.toLowerCase() === code.trim().toLowerCase());
}
