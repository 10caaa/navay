import { PlaceImage } from '@/types/place';

interface UnsplashPhoto {
  id: string;
  urls: {
    small: string;
    regular: string;
    thumb: string;
  };
  alt_description: string | null;
  user: {
    name: string;
    links: {
      html: string;
    };
  };
}

interface UnsplashResponse {
  results: UnsplashPhoto[];
  total: number;
}

interface CacheEntry {
  data: PlaceImage[];
  timestamp: number;
}

class UnsplashService {
  private cache = new Map<string, CacheEntry>();
  private readonly CACHE_DURATION = 24 * 60 * 60 * 1000; // 24h
  private readonly API_BASE = 'https://api.unsplash.com';
  private lastRequestTime = 0;
  private readonly RATE_LIMIT_DELAY = 1000; // 1s entre les requêtes

  private async rateLimitedFetch(url: string, options: RequestInit): Promise<Response> {
    const now = Date.now();
    const timeSinceLastRequest = now - this.lastRequestTime;
    
    if (timeSinceLastRequest < this.RATE_LIMIT_DELAY) {
      await new Promise(resolve => 
        setTimeout(resolve, this.RATE_LIMIT_DELAY - timeSinceLastRequest)
      );
    }
    
    this.lastRequestTime = Date.now();
    return fetch(url, options);
  }

  private getCacheKey(placeName: string, location: string, category?: string): string {
    return `${placeName}-${location}-${category || 'default'}`.toLowerCase();
  }

  private isValidCache(entry: CacheEntry): boolean {
    return Date.now() - entry.timestamp < this.CACHE_DURATION;
  }

  async searchImages(
    placeName: string, 
    location: string, 
    category?: string,
    count: number = 3
  ): Promise<PlaceImage[]> {
    const cacheKey = this.getCacheKey(placeName, location, category);
    
    // Vérifier le cache
    const cached = this.cache.get(cacheKey);
    if (cached && this.isValidCache(cached)) {
      return cached.data;
    }

    try {
      const accessKey = process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY;
      if (!accessKey) {
        console.warn('Clé API Unsplash manquante');
        return this.getFallbackImages(category);
      }

      const query = this.buildSearchQuery(placeName, location, category);
      const url = `${this.API_BASE}/search/photos?query=${encodeURIComponent(query)}&per_page=${count}&orientation=landscape`;

      const response = await this.rateLimitedFetch(url, {
        headers: {
          'Authorization': `Client-ID ${accessKey}`,
          'Accept-Version': 'v1'
        }
      });

      if (!response.ok) {
        if (response.status === 429) {
          console.warn('Rate limit atteint, utilisation du cache ou fallback');
        }
        throw new Error(`Erreur API Unsplash: ${response.status}`);
      }

      const data: UnsplashResponse = await response.json();
      const images = this.transformImages(data.results, placeName, location);
      
      // Mettre en cache
      this.cache.set(cacheKey, {
        data: images,
        timestamp: Date.now()
      });

      return images.length > 0 ? images : this.getFallbackImages(category);
    } catch (error) {
      console.error('Erreur lors de la récupération des images:', error);
      return this.getFallbackImages(category);
    }
  }

  private buildSearchQuery(placeName: string, location: string, category?: string): string {
    const terms = [placeName, location];
    
    if (category) {
      const categoryMap: Record<string, string> = {
        'restaurant': 'restaurant food dining',
        'cafe': 'cafe coffee shop',
        'museum': 'museum art gallery',
        'park': 'park nature outdoor',
        'hotel': 'hotel accommodation',
        'bar': 'bar pub nightlife',
        'shop': 'shopping store retail',
        'attraction': 'tourist attraction landmark'
      };
      
      terms.push(categoryMap[category.toLowerCase()] || category);
    }
    
    return terms.join(' ');
  }

  private transformImages(photos: UnsplashPhoto[], placeName: string, location: string): PlaceImage[] {
    return photos.map(photo => ({
      id: photo.id,
      url: photo.urls.small,
      alt: photo.alt_description || `${placeName} in ${location}`,
      credit: photo.user.name,
      creditUrl: photo.user.links.html
    }));
  }

  private getFallbackImages(category?: string): PlaceImage[] {
    const fallbackMap: Record<string, PlaceImage[]> = {
      'restaurant': [{
        id: 'fallback-restaurant',
        url: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400',
        alt: 'Restaurant',
        credit: 'Unsplash'
      }],
      'cafe': [{
        id: 'fallback-cafe',
        url: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=400',
        alt: 'Café',
        credit: 'Unsplash'
      }],
      'museum': [{
        id: 'fallback-museum',
        url: 'https://images.unsplash.com/photo-1565060169187-5284a3f427a7?w=400',
        alt: 'Museum',
        credit: 'Unsplash'
      }],
      'park': [{
        id: 'fallback-park',
        url: 'https://images.unsplash.com/photo-1519331379826-f10be5486c6f?w=400',
        alt: 'Park',
        credit: 'Unsplash'
      }],
      'default': [{
        id: 'fallback-default',
        url: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=400',
        alt: 'Travel destination',
        credit: 'Unsplash'
      }]
    };
    
    return fallbackMap[category?.toLowerCase() || 'default'] || fallbackMap['default'];
  }

  clearCache(): void {
    this.cache.clear();
  }

  getCacheSize(): number {
    return this.cache.size;
  }
}

export const unsplashService = new UnsplashService();