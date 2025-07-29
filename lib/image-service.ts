import { PlaceImage } from '@/types/place';

const UNSPLASH_ACCESS_KEY = process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY;
const UNSPLASH_API_URL = 'https://api.unsplash.com';

export async function getUnsplashImages(
  placeName: string,
  address?: string,
  category?: string,
  count: number = 3
): Promise<PlaceImage[]> {
  if (!UNSPLASH_ACCESS_KEY) {
    console.warn('Unsplash access key not found');
    return [];
  }

  try {
    // Construire la requête de recherche
    let searchQuery = placeName;
    
    // Ajouter le lieu/ville si disponible dans l'adresse
    if (address) {
      const cityMatch = address.match(/([A-Za-z\s]+)(?:,|$)/);
      if (cityMatch) {
        searchQuery += ` ${cityMatch[1].trim()}`;
      }
    }
    
    // Ajouter la catégorie si disponible
    if (category) {
      searchQuery += ` ${category}`;
    }

    const response = await fetch(
      `${UNSPLASH_API_URL}/search/photos?query=${encodeURIComponent(searchQuery)}&per_page=${count}&orientation=landscape`,
      {
        headers: {
          'Authorization': `Client-ID ${UNSPLASH_ACCESS_KEY}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Unsplash API error: ${response.status}`);
    }

    const data = await response.json();

    if (!data.results || data.results.length === 0) {
      return [];
    }

    return data.results.map((photo: any): PlaceImage => ({
      id: photo.id,
      url: photo.urls.regular,
      alt_description: photo.alt_description || placeName,
      width: photo.width,
      height: photo.height,
      photographer: photo.user.name,
      photographer_url: photo.user.links.html,
    }));

  } catch (error) {
    console.error('Erreur lors de la récupération des images Unsplash:', error);
    return [];
  }
}
