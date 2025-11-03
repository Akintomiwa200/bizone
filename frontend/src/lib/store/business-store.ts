import { StateCreator } from 'zustand';
import { businessAPI, Business, BusinessUpdateData } from '@/lib/api/business';

export interface BusinessState {
  business: Business | null;
  isBusinessLoading: boolean;
  businessError: string | null;
  fetchBusiness: () => Promise<void>;
  updateBusiness: (data: BusinessUpdateData) => Promise<void>;
  updateBusinessStats: (stats: Partial<Business['stats']>) => void;
}

export const businessStore: StateCreator<BusinessState> = (set, get) => ({
  business: null,
  isBusinessLoading: false,
  businessError: null,

  fetchBusiness: async () => {
    set({ isBusinessLoading: true, businessError: null });
    try {
      const business = await businessAPI.getBusiness();
      set({ business, isBusinessLoading: false });
    } catch (error: any) {
      set({
        businessError: error.response?.data?.message || 'Failed to fetch business',
        isBusinessLoading: false,
      });
    }
  },

  updateBusiness: async (data: BusinessUpdateData) => {
    set({ isBusinessLoading: true, businessError: null });
    try {
      const business = await businessAPI.updateBusiness(data);
      set({ business, isBusinessLoading: false });
    } catch (error: any) {
      set({
        businessError: error.response?.data?.message || 'Failed to update business',
        isBusinessLoading: false,
      });
      throw error;
    }
  },

  updateBusinessStats: (stats: Partial<Business['stats']>) => {
    set((state) => ({
      business: state.business
        ? {
            ...state.business,
            stats: { ...state.business.stats, ...stats },
          }
        : null,
    }));
  },
});