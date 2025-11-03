export interface CurrencyOptions {
  locale?: string;
  currency?: string;
  minimumFractionDigits?: number;
  maximumFractionDigits?: number;
}

export function formatCurrency(
  amount: number,
  options: CurrencyOptions = {}
): string {
  const {
    locale = 'en-NG',
    currency = 'NGN',
    minimumFractionDigits = 2,
    maximumFractionDigits = 2,
  } = options;

  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits,
    maximumFractionDigits,
  }).format(amount);
}

export function formatCurrencyCompact(
  amount: number,
  options: CurrencyOptions = {}
): string {
  const {
    locale = 'en-NG',
    currency = 'NGN',
  } = options;

  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    notation: 'compact',
    maximumFractionDigits: 2,
  }).format(amount);
}

export function convertCurrency(
  amount: number,
  fromCurrency: string,
  toCurrency: string,
  exchangeRate: number
): number {
  if (fromCurrency === toCurrency) return amount;
  return amount * exchangeRate;
}

export function parseCurrency(value: string): number {
  const cleaned = value.replace(/[^\d.-]/g, '');
  return parseFloat(cleaned) || 0;
}

export function formatNaira(amount: number, compact: boolean = false): string {
  return compact ? formatCurrencyCompact(amount) : formatCurrency(amount);
}

// Nigerian bank codes (partial list)
export const BANK_CODES = {
  '044': 'Access Bank',
  '063': 'Diamond Bank',
  '050': 'Ecobank Nigeria',
  '070': 'Fidelity Bank',
  '011': 'First Bank of Nigeria',
  '214': 'First City Monument Bank',
  '058': 'Guaranty Trust Bank',
  '030': 'Heritage Bank',
  '301': 'Jaiz Bank',
  '082': 'Keystone Bank',
  '014': 'MainStreet Bank',
  '076': 'Polaris Bank',
  '221': 'Stanbic IBTC Bank',
  '068': 'Standard Chartered Bank',
  '232': 'Sterling Bank',
  '033': 'United Bank for Africa',
  '032': 'Union Bank of Nigeria',
  '035': 'Wema Bank',
  '057': 'Zenith Bank',
} as const;

export function validateBankAccount(accountNumber: string): boolean {
  return /^\d{10}$/.test(accountNumber);
}