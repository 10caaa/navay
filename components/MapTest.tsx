'use client';

import { useState } from 'react';
import { Place } from '@/types/place';
import PlacesMapView from './PlacesMapView';
import { useImages } from '@/hooks/useImages';
import { useGeolocation } from '@/hooks/useGeolocation';

export default function MapTest() {
  const [testPlace] = useState<Place>({
    id: 'test-1',
    name: 'Tour Eiffel',
    rating: 4.7,
    address: 'Champ de Mars, 5 Avenue Anatole France, 75007 Paris, France',
    description: 'Monument emblématique de Paris, la Tour Eiffel offre une vue panoramique exceptionnelle sur la capitale.',
    category: 'attraction',
    estimatedCost: '29€',
    priceLevel: 'mid'
  });

  const { images, isLoading: imagesLoading } = useImages({
    placeName: testPlace.name,
    location: 'Paris',
    category: testPlace.category,
    count: 3
  });

  const { coordinates, isLoading: geoLoading, getCurrentPosition } = useGeolocation({
    address: testPlace.address
  });

  const testPlaceWithImages = {
    ...testPlace,
    images
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-4">Test de la carte interactive</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="font-semibold mb-2">Images Unsplash</h3>
            <div className="text-sm">
              {imagesLoading ? (
                <span className="text-yellow-600">Chargement...</span>
              ) : (
                <span className="text-green-600">{images.length} images chargées</span>
              )}
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="font-semibold mb-2">Géocodage</h3>
            <div className="text-sm">
              {geoLoading ? (
                <span className="text-yellow-600">Chargement...</span>
              ) : coordinates ? (
                <span className="text-green-600">
                  {coordinates.lat.toFixed(4)}, {coordinates.lng.toFixed(4)}
                </span>
              ) : (
                <span className="text-red-600">Non géocodé</span>
              )}
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="font-semibold mb-2">Position actuelle</h3>
            <button
              onClick={getCurrentPosition}
              className="text-sm bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
            >
              Obtenir ma position
            </button>
          </div>
        </div>
      </div>

      <PlacesMapView
        places={[testPlaceWithImages]}
        showMap={true}
        showCards={true}
        mapHeight="400px"
      />
    </div>
  );
}