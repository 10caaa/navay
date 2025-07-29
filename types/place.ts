export interface PlaceImage {
  id: string;
  url: string;
  alt_description: string;
  credit: string; 
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
}
