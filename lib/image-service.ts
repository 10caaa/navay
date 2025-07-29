import { PlaceImage } from '@/types/place';
import { unsplashService } from './unsplash-service';

// Fonction pour récupérer des images depuis Unsplash (utilise le nouveau service)
export async function getUnsplashImages(placeName: string, location: string, category?: string): Promise<PlaceImage[]> {
  return unsplashService.searchImages(placeName, location, category, 3);
}

// Fonction pour obtenir des images de secours basées sur la catégorie
export function getFallbackImages(category?: string): PlaceImage[] {
  const fallbackMap: Record<string, PlaceImage[]> = {
    'restaurant': [
      {
        id: 'rest1',
        url: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4',
        alt: 'Restaurant interior',
        credit: 'Unsplash'
      }
    ],
    'cafe': [
      {
        id: 'cafe1',
        url: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb',
        alt: 'Café',
        credit: 'Unsplash'
      }
    ],
    'museum': [
      {
        id: 'museum1',
        url: 'https://images.unsplash.com/photo-1565060169187-5284a3f427a7',
        alt: 'Museum',
        credit: 'Unsplash'
      }
    ],
    'park': [
      {
        id: 'park1',
        url: 'https://images.unsplash.com/photo-1519331379826-f10be5486c6f',
        alt: 'Park',
        credit: 'Unsplash'
      }
    ],
    'default': [
      {
        id: 'default1',
        url: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd',
        alt: 'Travel destination',
        credit: 'Unsplash'
      }
    ]
  };
  
  return category && fallbackMap[category.toLowerCase()] 
    ? fallbackMap[category.toLowerCase()] 
    : fallbackMap['default'];
}