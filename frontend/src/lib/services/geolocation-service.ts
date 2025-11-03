export interface Location {
  latitude: number;
  longitude: number;
  accuracy?: number;
  altitude?: number | null;
  altitudeAccuracy?: number | null;
  heading?: number | null;
  speed?: number | null;
  timestamp?: number;
}

export interface Address {
  street?: string;
  city?: string;
  state?: string;
  country?: string;
  postalCode?: string;
  formattedAddress?: string;
}

export class GeolocationService {
  private static instance: GeolocationService;
  private watchId: number | null = null;

  public static getInstance(): GeolocationService {
    if (!GeolocationService.instance) {
      GeolocationService.instance = new GeolocationService();
    }
    return GeolocationService.instance;
  }

  async getCurrentPosition(options: PositionOptions = {}): Promise<Location> {
    const defaultOptions: PositionOptions = {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 60000,
      ...options,
    };

    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error('Geolocation is not supported by this browser'));
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            accuracy: position.coords.accuracy,
            altitude: position.coords.altitude,
            altitudeAccuracy: position.coords.altitudeAccuracy,
            heading: position.coords.heading,
            speed: position.coords.speed,
            timestamp: position.timestamp,
          });
        },
        (error) => {
          reject(this.getGeolocationError(error));
        },
        defaultOptions
      );
    });
  }

  watchPosition(
    callback: (location: Location) => void,
    errorCallback: (error: string) => void,
    options: PositionOptions = {}
  ): number {
    const defaultOptions: PositionOptions = {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 0,
      ...options,
    };

    if (!navigator.geolocation) {
      errorCallback('Geolocation is not supported by this browser');
      return -1;
    }

    this.watchId = navigator.geolocation.watchPosition(
      (position) => {
        callback({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy: position.coords.accuracy,
          altitude: position.coords.altitude,
          altitudeAccuracy: position.coords.altitudeAccuracy,
          heading: position.coords.heading,
          speed: position.coords.speed,
          timestamp: position.timestamp,
        });
      },
      (error) => {
        errorCallback(this.getGeolocationError(error).message);
      },
      defaultOptions
    );

    return this.watchId;
  }

  stopWatching(): void {
    if (this.watchId !== null) {
      navigator.geolocation.clearWatch(this.watchId);
      this.watchId = null;
    }
  }

  private getGeolocationError(error: GeolocationPositionError): Error {
    switch (error.code) {
      case error.PERMISSION_DENIED:
        return new Error('Location access denied by user');
      case error.POSITION_UNAVAILABLE:
        return new Error('Location information is unavailable');
      case error.TIMEOUT:
        return new Error('Location request timed out');
      default:
        return new Error('An unknown error occurred while getting location');
    }
  }

  async getAddressFromCoordinates(latitude: number, longitude: number): Promise<Address> {
    try {
      const response = await fetch(
        `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${process.env.NEXT_PUBLIC_OPENCAGE_API_KEY}`
      );
      
      const data = await response.json();
      
      if (data.results && data.results.length > 0) {
        const result = data.results[0].components;
        return {
          street: result.road || result.neighbourhood,
          city: result.city || result.town || result.village,
          state: result.state,
          country: result.country,
          postalCode: result.postcode,
          formattedAddress: data.results[0].formatted,
        };
      }
      
      throw new Error('No address found for coordinates');
    } catch (error) {
      console.error('Geocoding error:', error);
      throw new Error('Failed to get address from coordinates');
    }
  }

  async getCoordinatesFromAddress(address: string): Promise<Location> {
    try {
      const response = await fetch(
        `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(address)}&key=${process.env.NEXT_PUBLIC_OPENCAGE_API_KEY}`
      );
      
      const data = await response.json();
      
      if (data.results && data.results.length > 0) {
        const result = data.results[0];
        return {
          latitude: result.geometry.lat,
          longitude: result.geometry.lng,
        };
      }
      
      throw new Error('No coordinates found for address');
    } catch (error) {
      console.error('Reverse geocoding error:', error);
      throw new Error('Failed to get coordinates from address');
    }
  }

  calculateDistance(
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number,
    unit: 'km' | 'mi' = 'km'
  ): number {
    const R = unit === 'km' ? 6371 : 3959; // Earth's radius in km or miles
    const dLat = this.deg2rad(lat2 - lat1);
    const dLon = this.deg2rad(lon2 - lon1);
    
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;
    
    return Math.round(distance * 100) / 100; // Round to 2 decimal places
  }

  private deg2rad(deg: number): number {
    return deg * (Math.PI / 180);
  }

  isInDeliveryRange(
    businessLocation: Location,
    customerLocation: Location,
    maxRange: number // in kilometers
  ): boolean {
    const distance = this.calculateDistance(
      businessLocation.latitude,
      businessLocation.longitude,
      customerLocation.latitude,
      customerLocation.longitude,
      'km'
    );
    
    return distance <= maxRange;
  }

  async getNigerianStates(): Promise<string[]> {
    // Nigerian states list
    return [
      'Abia', 'Adamawa', 'Akwa Ibom', 'Anambra', 'Bauchi', 'Bayelsa', 'Benue', 'Borno',
      'Cross River', 'Delta', 'Ebonyi', 'Edo', 'Ekiti', 'Enugu', 'Gombe', 'Imo', 'Jigawa',
      'Kaduna', 'Kano', 'Katsina', 'Kebbi', 'Kogi', 'Kwara', 'Lagos', 'Nasarawa', 'Niger',
      'Ogun', 'Ondo', 'Osun', 'Oyo', 'Plateau', 'Rivers', 'Sokoto', 'Taraba', 'Yobe', 'Zamfara'
    ];
  }

  async getCitiesInState(state: string): Promise<string[]> {
    // This would typically call an API or use a predefined dataset
    // For now, returning major cities for some states
    const cityMap: { [key: string]: string[] } = {
      'Lagos': ['Lagos', 'Ikeja', 'Victoria Island', 'Lekki', 'Surulere', 'Yaba'],
      'Abuja': ['Abuja', 'Garki', 'Wuse', 'Maitama', 'Asokoro'],
      'Rivers': ['Port Harcourt', 'Bonny', 'Eleme', 'Okrika'],
      'Kano': ['Kano', 'Dala', 'Fagge', 'Gwale', 'Kumbotso'],
      // Add more states as needed
    };

    return cityMap[state] || [];
  }
}

export const geolocationService = GeolocationService.getInstance();