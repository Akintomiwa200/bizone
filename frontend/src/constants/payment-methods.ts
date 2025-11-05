// Currency configurations and utilities

export interface Currency {
  code: string;
  name: string;
  symbol: string;
  symbolNative: string;
  decimalDigits: number;
  rounding: number;
  namePlural: string;
  thousandsSeparator: string;
  decimalSeparator: string;
  spaceBetweenAmountAndSymbol: boolean;
  symbolOnLeft: boolean;
}

export const CURRENCIES: { [key: string]: Currency } = {
  NGN: {
    code: 'NGN',
    name: 'Nigerian Naira',
    symbol: '₦',
    symbolNative: '₦',
    decimalDigits: 2,
    rounding: 0,
    namePlural: 'Nigerian nairas',
    thousandsSeparator: ',',
    decimalSeparator: '.',
    spaceBetweenAmountAndSymbol: false,
    symbolOnLeft: true,
  },
  USD: {
    code: 'USD',
    name: 'US Dollar',
    symbol: '$',
    symbolNative: '$',
    decimalDigits: 2,
    rounding: 0,
    namePlural: 'US dollars',
    thousandsSeparator: ',',
    decimalSeparator: '.',
    spaceBetweenAmountAndSymbol: false,
    symbolOnLeft: true,
  },
  EUR: {
    code: 'EUR',
    name: 'Euro',
    symbol: '€',
    symbolNative: '€',
    decimalDigits: 2,
    rounding: 0,
    namePlural: 'euros',
    thousandsSeparator: '.',
    decimalSeparator: ',',
    spaceBetweenAmountAndSymbol: true,
    symbolOnLeft: true,
  },
  GBP: {
    code: 'GBP',
    name: 'British Pound Sterling',
    symbol: '£',
    symbolNative: '£',
    decimalDigits: 2,
    rounding: 0,
    namePlural: 'British pounds sterling',
    thousandsSeparator: ',',
    decimalSeparator: '.',
    spaceBetweenAmountAndSymbol: false,
    symbolOnLeft: true,
  },
  CAD: {
    code: 'CAD',
    name: 'Canadian Dollar',
    symbol: 'CA$',
    symbolNative: '$',
    decimalDigits: 2,
    rounding: 0,
    namePlural: 'Canadian dollars',
    thousandsSeparator: ',',
    decimalSeparator: '.',
    spaceBetweenAmountAndSymbol: false,
    symbolOnLeft: true,
  },
  AUD: {
    code: 'AUD',
    name: 'Australian Dollar',
    symbol: 'AU$',
    symbolNative: '$',
    decimalDigits: 2,
    rounding: 0,
    namePlural: 'Australian dollars',
    thousandsSeparator: ',',
    decimalSeparator: '.',
    spaceBetweenAmountAndSymbol: false,
    symbolOnLeft: true,
  },
  JPY: {
    code: 'JPY',
    name: 'Japanese Yen',
    symbol: '¥',
    symbolNative: '￥',
    decimalDigits: 0,
    rounding: 0,
    namePlural: 'Japanese yen',
    thousandsSeparator: ',',
    decimalSeparator: '.',
    spaceBetweenAmountAndSymbol: false,
    symbolOnLeft: true,
  },
  CNY: {
    code: 'CNY',
    name: 'Chinese Yuan',
    symbol: 'CN¥',
    symbolNative: 'CN¥',
    decimalDigits: 2,
    rounding: 0,
    namePlural: 'Chinese yuan',
    thousandsSeparator: ',',
    decimalSeparator: '.',
    spaceBetweenAmountAndSymbol: false,
    symbolOnLeft: true,
  },
  INR: {
    code: 'INR',
    name: 'Indian Rupee',
    symbol: '₹',
    symbolNative: '₹',
    decimalDigits: 2,
    rounding: 0,
    namePlural: 'Indian rupees',
    thousandsSeparator: ',',
    decimalSeparator: '.',
    spaceBetweenAmountAndSymbol: false,
    symbolOnLeft: true,
  },
  BRL: {
    code: 'BRL',
    name: 'Brazilian Real',
    symbol: 'R$',
    symbolNative: 'R$',
    decimalDigits: 2,
    rounding: 0,
    namePlural: 'Brazilian reals',
    thousandsSeparator: '.',
    decimalSeparator: ',',
    spaceBetweenAmountAndSymbol: true,
    symbolOnLeft: true,
  },
  ZAR: {
    code: 'ZAR',
    name: 'South African Rand',
    symbol: 'R',
    symbolNative: 'R',
    decimalDigits: 2,
    rounding: 0,
    namePlural: 'South African rand',
    thousandsSeparator: ',',
    decimalSeparator: '.',
    spaceBetweenAmountAndSymbol: false,
    symbolOnLeft: true,
  },
  GHS: {
    code: 'GHS',
    name: 'Ghanaian Cedi',
    symbol: 'GH₵',
    symbolNative: 'GH₵',
    decimalDigits: 2,
    rounding: 0,
    namePlural: 'Ghanaian cedis',
    thousandsSeparator: ',',
    decimalSeparator: '.',
    spaceBetweenAmountAndSymbol: false,
    symbolOnLeft: true,
  },
  KES: {
    code: 'KES',
    name: 'Kenyan Shilling',
    symbol: 'Ksh',
    symbolNative: 'Ksh',
    decimalDigits: 2,
    rounding: 0,
    namePlural: 'Kenyan shillings',
    thousandsSeparator: ',',
    decimalSeparator: '.',
    spaceBetweenAmountAndSymbol: false,
    symbolOnLeft: true,
  },
  UGX: {
    code: 'UGX',
    name: 'Ugandan Shilling',
    symbol: 'USh',
    symbolNative: 'USh',
    decimalDigits: 0,
    rounding: 0,
    namePlural: 'Ugandan shillings',
    thousandsSeparator: ',',
    decimalSeparator: '.',
    spaceBetweenAmountAndSymbol: false,
    symbolOnLeft: true,
  },
  TZS: {
    code: 'TZS',
    name: 'Tanzanian Shilling',
    symbol: 'TSh',
    symbolNative: 'TSh',
    decimalDigits: 0,
    rounding: 0,
    namePlural: 'Tanzanian shillings',
    thousandsSeparator: ',',
    decimalSeparator: '.',
    spaceBetweenAmountAndSymbol: false,
    symbolOnLeft: true,
  },
};

// Primary currency for the application
export const PRIMARY_CURRENCY = CURRENCIES.NGN;

// Supported currencies for the Nigerian market
export const SUPPORTED_CURRENCIES = [
  CURRENCIES.NGN,
  CURRENCIES.USD,
  CURRENCIES.GBP,
  CURRENCIES.EUR,
];

// Currency formatting options
export interface CurrencyFormatOptions {
  locale?: string;
  style?: 'currency' | 'decimal';
  minimumFractionDigits?: number;
  maximumFractionDigits?: number;
  useGrouping?: boolean;
}

export const formatCurrency = (
  amount: number,
  currencyCode: string = 'NGN',
  options: CurrencyFormatOptions = {}
): string => {
  const currency = CURRENCIES[currencyCode] || CURRENCIES.NGN;
  const {
    locale = 'en-NG',
    style = 'currency',
    minimumFractionDigits = currency.decimalDigits,
    maximumFractionDigits = currency.decimalDigits,
    useGrouping = true,
  } = options;

  try {
    return new Intl.NumberFormat(locale, {
      style,
      currency: currencyCode,
      minimumFractionDigits,
      maximumFractionDigits,
      useGrouping,
    }).format(amount);
  } catch (error) {
    // Fallback formatting
    const formattedAmount = new Intl.NumberFormat('en-NG', {
      minimumFractionDigits,
      maximumFractionDigits,
      useGrouping,
    }).format(amount);

    return currency.symbolOnLeft
      ? `${currency.symbol}${currency.spaceBetweenAmountAndSymbol ? ' ' : ''}${formattedAmount}`
      : `${formattedAmount}${currency.spaceBetweenAmountAndSymbol ? ' ' : ''}${currency.symbol}`;
  }
};

export const formatCurrencyCompact = (
  amount: number,
  currencyCode: string = 'NGN'
): string => {
  const currency = CURRENCIES[currencyCode] || CURRENCIES.NGN;
  
  try {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: currencyCode,
      notation: 'compact',
      maximumFractionDigits: 2,
    }).format(amount);
  } catch (error) {
    // Fallback compact formatting
    const formats = [
      { value: 1e12, symbol: 'T' },
      { value: 1e9, symbol: 'B' },
      { value: 1e6, symbol: 'M' },
      { value: 1e3, symbol: 'K' },
    ];

    const format = formats.find(f => Math.abs(amount) >= f.value);
    if (format) {
      const scaled = amount / format.value;
      return `${currency.symbol}${scaled.toFixed(2)}${format.symbol}`;
    }

    return formatCurrency(amount, currencyCode);
  }
};

// Currency conversion (mock - in real app, use live rates)
export interface ExchangeRate {
  from: string;
  to: string;
  rate: number;
  lastUpdated: string;
}

export const EXCHANGE_RATES: ExchangeRate[] = [
  { from: 'USD', to: 'NGN', rate: 1500, lastUpdated: new Date().toISOString() },
  { from: 'EUR', to: 'NGN', rate: 1600, lastUpdated: new Date().toISOString() },
  { from: 'GBP', to: 'NGN', rate: 1900, lastUpdated: new Date().toISOString() },
  { from: 'NGN', to: 'USD', rate: 0.00067, lastUpdated: new Date().toISOString() },
  { from: 'NGN', to: 'EUR', rate: 0.00063, lastUpdated: new Date().toISOString() },
  { from: 'NGN', to: 'GBP', rate: 0.00053, lastUpdated: new Date().toISOString() },
];

export const convertCurrency = (
  amount: number,
  fromCurrency: string,
  toCurrency: string
): number => {
  if (fromCurrency === toCurrency) return amount;

  const rate = EXCHANGE_RATES.find(
    r => r.from === fromCurrency && r.to === toCurrency
  );

  if (rate) {
    return amount * rate.rate;
  }

  // Try reverse conversion
  const reverseRate = EXCHANGE_RATES.find(
    r => r.from === toCurrency && r.to === fromCurrency
  );

  if (reverseRate) {
    return amount / reverseRate.rate;
  }

  throw new Error(`No exchange rate found for ${fromCurrency} to ${toCurrency}`);
};

// Currency validation
export const isValidCurrencyCode = (code: string): boolean => {
  return code in CURRENCIES;
};

export const parseCurrency = (value: string, currencyCode: string = 'NGN'): number => {
  const currency = CURRENCIES[currencyCode] || CURRENCIES.NGN;
  
  // Remove currency symbol and thousands separators
  let cleaned = value
    .replace(new RegExp(`\\${currency.symbol}`, 'g'), '')
    .replace(new RegExp(`\\${currency.thousandsSeparator}`, 'g'), '')
    .trim();

  // Handle decimal separator
  if (currency.decimalSeparator !== '.') {
    cleaned = cleaned.replace(new RegExp(`\\${currency.decimalSeparator}`, 'g'), '.');
  }

  const parsed = parseFloat(cleaned);
  return isNaN(parsed) ? 0 : parsed;
};

// Currency display helpers
export const getCurrencySymbol = (currencyCode: string): string => {
  return CURRENCIES[currencyCode]?.symbol || CURRENCIES.NGN.symbol;
};

export const getCurrencyName = (currencyCode: string): string => {
  return CURRENCIES[currencyCode]?.name || CURRENCIES.NGN.name;
};

export const getCurrencyInfo = (currencyCode: string): Currency => {
  return CURRENCIES[currencyCode] || CURRENCIES.NGN;
};

// Nigerian money formatting (local conventions)
export const formatNaira = (amount: number, compact: boolean = false): string => {
  return compact 
    ? formatCurrencyCompact(amount, 'NGN')
    : formatCurrency(amount, 'NGN');
};

export const formatNairaWords = (amount: number): string => {
  if (amount === 0) return 'Zero Naira';
  
  const units = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine'];
  const teens = ['Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
  const tens = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];
  
  const convertHundreds = (num: number): string => {
    if (num === 0) return '';
    let result = '';
    
    if (num >= 100) {
      result += units[Math.floor(num / 100)] + ' Hundred ';
      num %= 100;
    }
    
    if (num >= 20) {
      result += tens[Math.floor(num / 10)] + ' ';
      num %= 10;
    } else if (num >= 10) {
      result += teens[num - 10] + ' ';
      num = 0;
    }
    
    if (num > 0) {
      result += units[num] + ' ';
    }
    
    return result.trim();
  };
  
  let result = '';
  const wholeAmount = Math.floor(amount);
  
  if (wholeAmount >= 1000000000) {
    result += convertHundreds(Math.floor(wholeAmount / 1000000000)) + ' Billion ';
    wholeAmount %= 1000000000;
  }
  
  if (wholeAmount >= 1000000) {
    result += convertHundreds(Math.floor(wholeAmount / 1000000)) + ' Million ';
    wholeAmount %= 1000000;
  }
  
  if (wholeAmount >= 1000) {
    result += convertHundreds(Math.floor(wholeAmount / 1000)) + ' Thousand ';
    wholeAmount %= 1000;
  }
  
  if (wholeAmount > 0) {
    result += convertHundreds(wholeAmount);
  }
  
  result = result.trim() + ' Naira';
  
  // Add kobo if there are decimals
  const kobo = Math.round((amount - Math.floor(amount)) * 100);
  if (kobo > 0) {
    result += ` and ${kobo} Kobo`;
  }
  
  return result;
};

export type CurrencyType = typeof CURRENCIES[keyof typeof CURRENCIES];