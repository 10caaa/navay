import { useState, useEffect } from 'react';
import { geocodingService } from '@/lib/geocoding-service';

interface Coordinates {
  lat: number;
  lng: number;
}

interface UseGeolocationOptions {
  address?: string;
  autoGeocode?: boolean;
}

interface UseGeolocationReturn {
  coordinates: Coordinates | null;
  isLoading: boolean;
  error: string | null;
  geocodeAddress: (address: string) => Promise<Coordinates | null>;
  getCurrentPosition: () => Promise<Coordinates | null>;
  clearCoordinates: () => void;
}

export function useGeolocation({
  address,
  autoGeocode = true
}: UseGeolocationOptions = {}): UseGeolocationReturn {
  const [coordinates, setCoordinates] = useState<Coordinates | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const geocodeAddress = async (addressToGeocode: string): Promise<Coordinates | null> => {
    if (!addressToGeocode.trim()) return null;

    setIsLoading(true);
    setError(null);

    try {
      const result = await geocodingService.geocode(addressToGeocode);
      if (result) {
        const coords = { lat: result.lat, lng: result.lng };
        setCoordinates(coords);
        return coords;
      } else {
        setError('Adresse non trouvée');
        return null;
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erreur de géocodage';
      setError(errorMessage);
      console.error('Erreur géocodage:', err);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const getCurrentPosition = async (): Promise<Coordinates | null> => {
    if (!navigator.geolocation) {
      setError('Géolocalisation non supportée par ce navigateur');
      return null;
    }

    setIsLoading(true);
    setError(null);

    return new Promise((resolve) => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const coords = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          setCoordinates(coords);
          setIsLoading(false);
          resolve(coords);
        },
        (err) => {
          let errorMessage = 'Erreur de géolocalisation';
          switch (err.code) {
            case err.PERMISSION_DENIED:
              errorMessage = 'Permission de géolocalisation refusée';
              break;
            case err.POSITION_UNAVAILABLE:
              errorMessage = 'Position non disponible';
              break;
            case err.TIMEOUT:
              errorMessage = 'Timeout de géolocalisation';
              break;
          }
          setError(errorMessage);
          setIsLoading(false);
          resolve(null);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 300000 // 5 minutes
        }
      );
    });
  };

  const clearCoordinates = () => {
    setCoordinates(null);
    setError(null);
  };

  useEffect(() => {
    if (autoGeocode && address) {
      geocodeAddress(address);
    }
  }, [address, autoGeocode]);

  return {
    coordinates,
    isLoading,
    error,
    geocodeAddress,
    getCurrentPosition,
    clearCoordinates
  };
}