export type CurrencyCode = "INR" | "USD";

const USD_PER_INR = 1 / 83;

export function formatPrice(inrValue: number, currency: CurrencyCode): string {
  if (currency === "USD") {
    return `$${(inrValue * USD_PER_INR).toFixed(2)}`;
  }
  return `₹${inrValue.toLocaleString("en-IN")}.00`;
}
