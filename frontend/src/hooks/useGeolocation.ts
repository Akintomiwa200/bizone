import { useState, useEffect, useCallback } from 'react';
import { geolocationService, Location, Address } from '@/lib/services/geolocation-service';
import { notificationService } from '@/lib/services/notification-service';

export interface UseGeolocationReturn {
  location: Location | null;
  address: Address | null;
  isLoading: boolean;
  error: string | null;
  isWatching: boolean;
  getCurrentLocation: () => Promise<Location>;
  getAddressFromCoordinates: (latitude: number, longitude: number) => Promise<Address>;
  getCoordinatesFromAddress: (address: string) => Promise<Location>;
  startWatching: (onLocationUpdate?: (location: Location) => void) => void;
  stopWatching: () => void;
  calculateDistance: (lat1: number, lon1: number, lat2: number, lon2: number, unit?: 'km' | 'mi') => number;
  isInDeliveryRange: (businessLocation: Location, customerLocation: Location, maxRange: number) => boolean;
  clearError: () => void;
}

export const useGeolocation = (): UseGeolocationReturn => {
  const [location, setLocation] = useState<Location | null>(null);
  const [address, setAddress] = useState<Address | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isWatching, setIsWatching] = useState(false);

  const getCurrentLocation = useCallback(async (): Promise<Location> => {
    setIsLoading(true);
    setError(null);
    try {
      const currentLocation = await geolocationService.getCurrentPosition();
      setLocation(currentLocation);
      
      // Try to get address from coordinates
      try {
        const currentAddress = await geolocationService.getAddressFromCoordinates(
          currentLocation.latitude,
          currentLocation.longitude
        );
        setAddress(currentAddress);
      } catch (addressError) {
        console.warn('Failed to get address from coordinates:', addressError);
      }
      
      return currentLocation;
    } catch (error: any) {
      const errorMessage = error.message || 'Failed to get current location';
      setError(errorMessage);
      notificationService.error('Location Error', errorMessage);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const getAddressFromCoordinates = useCallback(async (latitude: number, longitude: number): Promise<Address> => {
    setIsLoading(true);
    setError(null);
    try {
      const addressData = await geolocationService.getAddressFromCoordinates(latitude, longitude);
      setAddress(addressData);
      return addressData;
    } catch (error: any) {
      const errorMessage = error.message || 'Failed to get address from coordinates';
      setError(errorMessage);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const getCoordinatesFromAddress = useCallback(async (addressString: string): Promise<Location> => {
    setIsLoading(true);
    setError(null);
    try {
      const coordinates = await geolocationService.getCoordinatesFromAddress(addressString);
      setLocation(coordinates);
      return coordinates;
    } catch (error: any) {
      const errorMessage = error.message || 'Failed to get coordinates from address';
      setError(errorMessage);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const startWatching = useCallback((onLocationUpdate?: (location: Location) => void) => {
    if (isWatching) {
      console.warn('Already watching location');
      return;
    }

    const handleLocationUpdate = (newLocation: Location) => {
      setLocation(newLocation);
      onLocationUpdate?.(newLocation);
    };

    const handleError = (errorMessage: string) => {
      setError(errorMessage);
      notificationService.error('Location Error', errorMessage);
    };

    try {
      geolocationService.watchPosition(handleLocationUpdate, handleError, {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      });
      
      setIsWatching(true);
      notificationService.info('Location Tracking', 'Location tracking has been started');
    } catch (error: any) {
      setError(error.message);
      notificationService.error('Tracking Failed', 'Failed to start location tracking');
    }
  }, [isWatching]);

  const stopWatching = useCallback(() => {
    if (!isWatching) {
      return;
    }

    geolocationService.stopWatching();
    setIsWatching(false);
    notificationService.info('Location Tracking', 'Location tracking has been stopped');
  }, [isWatching]);

  const calculateDistance = useCallback((
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number,
    unit: 'km' | 'mi' = 'km'
  ): number => {
    return geolocationService.calculateDistance(lat1, lon1, lat2, lon2, unit);
  }, []);

  const isInDeliveryRange = useCallback((
    businessLocation: Location,
    customerLocation: Location,
    maxRange: number
  ): boolean => {
    return geolocationService.isInDeliveryRange(businessLocation, customerLocation, maxRange);
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  // Get current location on component mount
  useEffect(() => {
    getCurrentLocation().catch(() => {
      // Silent fail on mount
    });
  }, [getCurrentLocation]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (isWatching) {
        stopWatching();
      }
    };
  }, [isWatching, stopWatching]);

  return {
    location,
    address,
    isLoading,
    error,
    isWatching,
    getCurrentLocation,
    getAddressFromCoordinates,
    getCoordinatesFromAddress,
    startWatching,
    stopWatching,
    calculateDistance,
    isInDeliveryRange,
    clearError,
  };
};