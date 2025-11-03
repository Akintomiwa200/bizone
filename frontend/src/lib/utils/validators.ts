export interface ValidationResult {
  isValid: boolean;
  message?: string;
}

export function validateEmail(email: string): ValidationResult {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const isValid = emailRegex.test(email);
  return {
    isValid,
    message: isValid ? undefined : 'Please enter a valid email address',
  };
}

export function validatePhone(phone: string): ValidationResult {
  const phoneRegex = /^(?:\+234|0)[789][01]\d{8}$/;
  const cleaned = phone.replace(/\s+/g, '').replace('+', '');
  const isValid = phoneRegex.test(cleaned);
  return {
    isValid,
    message: isValid ? undefined : 'Please enter a valid Nigerian phone number',
  };
}

export function validatePassword(password: string): ValidationResult {
  const minLength = password.length >= 8;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumbers = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  const isValid = minLength && hasUpperCase && hasLowerCase && hasNumbers && hasSpecialChar;

  let message: string | undefined;
  if (!isValid) {
    const missing = [];
    if (!minLength) missing.push('at least 8 characters');
    if (!hasUpperCase) missing.push('one uppercase letter');
    if (!hasLowerCase) missing.push('one lowercase letter');
    if (!hasNumbers) missing.push('one number');
    if (!hasSpecialChar) missing.push('one special character');
    message = `Password must contain ${missing.join(', ')}`;
  }

  return { isValid, message };
}

export function validateRequired(value: string): ValidationResult {
  const isValid = value.trim().length > 0;
  return {
    isValid,
    message: isValid ? undefined : 'This field is required',
  };
}

export function validateNumber(value: string, min?: number, max?: number): ValidationResult {
  const numValue = Number(value);
  const isNumber = !isNaN(numValue);
  let isValid = isNumber;
  let message: string | undefined;

  if (!isNumber) {
    message = 'Please enter a valid number';
  } else {
    if (min !== undefined && numValue < min) {
      isValid = false;
      message = `Value must be at least ${min}`;
    }
    if (max !== undefined && numValue > max) {
      isValid = false;
      message = `Value must be at most ${max}`;
    }
  }

  return { isValid, message };
}

export function validateNIN(nin: string): ValidationResult {
  const ninRegex = /^\d{11}$/;
  const isValid = ninRegex.test(nin);
  return {
    isValid,
    message: isValid ? undefined : 'NIN must be 11 digits',
  };
}

export function validateBVN(bvn: string): ValidationResult {
  const bvnRegex = /^\d{11}$/;
  const isValid = bvnRegex.test(bvn);
  return {
    isValid,
    message: isValid ? undefined : 'BVN must be 11 digits',
  };
}