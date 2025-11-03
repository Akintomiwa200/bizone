import { useState, useEffect, useCallback } from 'react';
import { useStore } from '@/lib/store';
import { businessAPI, Business, BusinessUpdateData } from '@/lib/api/business';
import { notificationService } from '@/lib/services/notification-service';

export interface UseBusinessReturn {
  business: Business | null;
  isLoading: boolean;
  error: string | null;
  fetchBusiness: () => Promise<void>;
  updateBusiness: (data: BusinessUpdateData) => Promise<void>;
  uploadLogo: (file: File) => Promise<string>;
  uploadCoverImage: (file: File) => Promise<string>;
  refreshStats: () => Promise<void>;
  clearError: () => void;
}

export const useBusiness = (): UseBusinessReturn => {
  const {
    business,
    isBusinessLoading,
    businessError,
    fetchBusiness: storeFetchBusiness,
    updateBusiness: storeUpdateBusiness,
    updateBusinessStats,
  } = useStore();

  const [isUploading, setIsUploading] = useState(false);

  const fetchBusiness = useCallback(async () => {
    try {
      await storeFetchBusiness();
    } catch (error) {
      throw error;
    }
  }, [storeFetchBusiness]);

  const updateBusiness = useCallback(async (data: BusinessUpdateData) => {
    try {
      await storeUpdateBusiness(data);
      notificationService.success('Business Updated', 'Your business information has been updated successfully.');
    } catch (error: any) {
      notificationService.error('Update Failed', error.response?.data?.message || 'Failed to update business');
      throw error;
    }
  }, [storeUpdateBusiness]);

  const uploadLogo = useCallback(async (file: File): Promise<string> => {
    setIsUploading(true);
    try {
      const result = await businessAPI.uploadLogo(file);
      await updateBusiness({ logo: result.url });
      notificationService.success('Logo Updated', 'Your business logo has been updated successfully.');
      return result.url;
    } catch (error: any) {
      notificationService.error('Upload Failed', error.response?.data?.message || 'Failed to upload logo');
      throw error;
    } finally {
      setIsUploading(false);
    }
  }, [updateBusiness]);

  const uploadCoverImage = useCallback(async (file: File): Promise<string> => {
    setIsUploading(true);
    try {
      const result = await businessAPI.uploadCoverImage(file);
      await updateBusiness({ coverImage: result.url });
      notificationService.success('Cover Updated', 'Your cover image has been updated successfully.');
      return result.url;
    } catch (error: any) {
      notificationService.error('Upload Failed', error.response?.data?.message || 'Failed to upload cover image');
      throw error;
    } finally {
      setIsUploading(false);
    }
  }, [updateBusiness]);

  const refreshStats = useCallback(async () => {
    try {
      const stats = await businessAPI.getBusinessStats();
      updateBusinessStats(stats);
    } catch (error: any) {
      console.error('Failed to refresh stats:', error);
      notificationService.error('Stats Update Failed', 'Failed to refresh business statistics');
    }
  }, [updateBusinessStats]);

  const clearError = useCallback(() => {
    useStore.getState().businessError = null;
  }, []);

  // Fetch business on mount
  useEffect(() => {
    if (!business) {
      fetchBusiness();
    }
  }, [business, fetchBusiness]);

  return {
    business,
    isLoading: isBusinessLoading || isUploading,
    error: businessError,
    fetchBusiness,
    updateBusiness,
    uploadLogo,
    uploadCoverImage,
    refreshStats,
    clearError,
  };
};