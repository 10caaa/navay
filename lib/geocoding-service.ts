interface GeocodingResult {
  lat: number;
  lng: number;
  display_name: string;
}

interface NominatimResponse {
  lat: string;
  lon: string;
  display_name: string;
}

class GeocodingService {
  private cache = new Map<string, { coords: GeocodingResult; timestamp: number }>();
  private readonly CACHE_DURATION = 7 * 24 * 60 * 60 * 1000; // 7 jours
  private readonly API_BASE = 'https://nominatim.openstreetmap.org';
  private lastRequestTime = 0;
  private readonly RATE_LIMIT_DELAY = 1000; // 1s entre les requêtes

  private async rateLimitedFetch(url: string): Promise<Response> {
    const now = Date.now();
    const timeSinceLastRequest = now - this.lastRequestTime;
    
    if (timeSinceLastRequest < this.RATE_LIMIT_DELAY) {
      await new Promise(resolve => 
        setTimeout(resolve, this.RATE_LIMIT_DELAY - timeSinceLastRequest)
      );
    }
    
    this.lastRequestTime = Date.now();
    return fetch(url);
  }

  async geocode(address: string): Promise<GeocodingResult | null> {
    const cacheKey = address.toLowerCase().trim();
    
    // Vérifier le cache
    const cached = this.cache.get(cacheKey);
    if (cached && Date.now() - cached.timestamp < this.CACHE_DURATION) {
      return cached.coords;
    }

    try {
      const url = `${this.API_BASE}/search?format=json&q=${encodeURIComponent(address)}&limit=1`;
      
      const response = await this.rateLimitedFetch(url);
      
      if (!response.ok) {
        throw new Error(`Erreur géocodage: ${response.status}`);
      }

      const data: NominatimResponse[] = await response.json();
      
      if (data.length === 0) {
        return null;
      }

      const result: GeocodingResult = {
        lat: parseFloat(data[0].lat),
        lng: parseFloat(data[0].lon),
        display_name: data[0].display_name
      };

      // Mettre en cache
      this.cache.set(cacheKey, {
        coords: result,
        timestamp: Date.now()
      });

      return result;
    } catch (error) {
      console.error('Erreur lors du géocodage:', error);
      return null;
    }
  }

  async batchGeocode(addresses: string[]): Promise<(GeocodingResult | null)[]> {
    const results: (GeocodingResult | null)[] = [];
    
    for (const address of addresses) {
      const result = await this.geocode(address);
      results.push(result);
    }
    
    return results;
  }

  clearCache(): void {
    this.cache.clear();
  }
}

export const geocodingService = new GeocodingService();