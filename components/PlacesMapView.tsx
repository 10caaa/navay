'use client';

import { useState } from 'react';
import { Place, PlaceImage } from '@/types/place';
import InteractiveMap from './InteractiveMap';
import PlaceCard from './PlaceCard';
import ImageGallery from './ImageGallery';

interface PlacesMapViewProps {
  places: Place[];
  className?: string;
  showMap?: boolean;
  showCards?: boolean;
  mapHeight?: string;
}

export default function PlacesMapView({ 
  places, 
  className = '',
  showMap = true,
  showCards = true,
  mapHeight = '400px'
}: PlacesMapViewProps) {
  const [galleryImages, setGalleryImages] = useState<PlaceImage[]>([]);
  const [galleryIndex, setGalleryIndex] = useState(0);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [galleryPlaceName, setGalleryPlaceName] = useState('');

  const handleImageClick = (place: Place) => (image: PlaceImage, index: number) => {
    if (place.images) {
      setGalleryImages(place.images);
      setGalleryIndex(index);
      setGalleryPlaceName(place.name);
      setIsGalleryOpen(true);
    }
  };

  const closeGallery = () => {
    setIsGalleryOpen(false);
  };

  if (places.length === 0) {
    return (
      <div className={`text-center py-12 ${className}`}>
        <div className="text-gray-500 mb-4">
          <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">Aucun lieu trouvé</h3>
        <p className="text-gray-600">Essayez de modifier vos critères de recherche.</p>
      </div>
    );
  }

  return (
    <div className={className}>
      {/* Map Section */}
      {showMap && (
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900">
              Carte des lieux ({places.length})
            </h2>
            <div className="text-sm text-gray-600">
              Cliquez sur les marqueurs pour plus d'informations
            </div>
          </div>
          <InteractiveMap 
            places={places} 
            height={mapHeight}
            className="rounded-lg shadow-md"
          />
        </div>
      )}

      {/* Cards Section */}
      {showCards && (
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">
              Détails des lieux
            </h2>
            <div className="text-sm text-gray-600">
              {places.length} lieu{places.length > 1 ? 'x' : ''} trouvé{places.length > 1 ? 's' : ''}
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {places.map((place) => (
              <PlaceCard
                key={place.id}
                place={place}
                onImageClick={handleImageClick(place)}
                className="h-full"
              />
            ))}
          </div>
        </div>
      )}

      {/* Image Gallery Modal */}
      <ImageGallery
        images={galleryImages}
        initialIndex={galleryIndex}
        isOpen={isGalleryOpen}
        onClose={closeGallery}
        placeName={galleryPlaceName}
      />
    </div>
  );
}