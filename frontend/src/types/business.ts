export interface BusinessContact {
  email?: string;
  phone?: string;
  address?: {
    street?: string;
    city?: string;
    state?: string;
    country?: string;
  };
}

export interface Business {
  id: string;
  name: string;
  description?: string;
  category?: string;
  contact?: BusinessContact;
  createdAt?: string;
  updatedAt?: string;
}
