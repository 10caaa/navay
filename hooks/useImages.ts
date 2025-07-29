import { useState, useEffect } from 'react';
import { PlaceImage } from '@/types/place';
import { unsplashService } from '@/lib/unsplash-service';

interface UseImagesOptions {
  placeName: string;
  location: string;
  category?: string;
  count?: number;
  autoLoad?: boolean;
}

interface UseImagesReturn {
  images: PlaceImage[];
  isLoading: boolean;
  error: string | null;
  loadImages: () => Promise<void>;
  clearImages: () => void;
}

export function useImages({
  placeName,
  location,
  category,
  count = 3,
  autoLoad = true
}: UseImagesOptions): UseImagesReturn {
  const [images, setImages] = useState<PlaceImage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadImages = async () => {
    if (!placeName || !location) return;

    setIsLoading(true);
    setError(null);

    try {
      const fetchedImages = await unsplashService.searchImages(
        placeName,
        location,
        category,
        count
      );
      setImages(fetchedImages);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur lors du chargement des images');
      console.error('Erreur useImages:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const clearImages = () => {
    setImages([]);
    setError(null);
  };

  useEffect(() => {
    if (autoLoad && placeName && location) {
      loadImages();
    }
  }, [placeName, location, category, count, autoLoad]);

  return {
    images,
    isLoading,
    error,
    loadImages,
    clearImages
  };
}