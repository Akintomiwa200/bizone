export function calculatePercentage(value: number, total: number): number {
  if (total === 0) return 0;
  return (value / total) * 100;
}

export function calculateGrowth(previous: number, current: number): number {
  if (previous === 0) return current > 0 ? 100 : 0;
  return ((current - previous) / previous) * 100;
}

export function calculateProfit(sellingPrice: number, costPrice: number): number {
  return sellingPrice - costPrice;
}

export function calculateProfitMargin(sellingPrice: number, costPrice: number): number {
  if (sellingPrice === 0) return 0;
  return ((sellingPrice - costPrice) / sellingPrice) * 100;
}

export function calculateDiscount(originalPrice: number, discountPercentage: number): number {
  return (originalPrice * discountPercentage) / 100;
}

export function calculateTax(amount: number, taxRate: number): number {
  return (amount * taxRate) / 100;
}

export function calculateDeliveryFee(
  distance: number, // in kilometers
  baseFee: number = 500,
  perKmRate: number = 50
): number {
  return baseFee + distance * perKmRate;
}

export function calculateOrderTotal(items: Array<{ price: number; quantity: number }>): number {
  return items.reduce((total, item) => total + item.price * item.quantity, 0);
}

export function calculateAverage(numbers: number[]): number {
  if (numbers.length === 0) return 0;
  return numbers.reduce((sum, num) => sum + num, 0) / numbers.length;
}

export function roundToDecimal(value: number, decimals: number = 2): number {
  return Number(value.toFixed(decimals));
}