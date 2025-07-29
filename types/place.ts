export interface PlaceImage {
  id: string;
  url: string;
  alt: string;
  credit: string;
  creditUrl?: string;
}

export interface Place {
  id: string;
  name: string;
  rating: number;
  address: string;
  description: string;
  category: string;
  website?: string;
  phone?: string;
  keywords?: string;
  images?: PlaceImage[];
  estimatedCost?: string;
  priceLevel?: 'budget' | 'mid' | 'high';
  lat?: number;
  lng?: number;
}
