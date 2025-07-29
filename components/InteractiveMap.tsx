'use client';

import { useEffect, useState, useMemo } from 'react';
import dynamic from 'next/dynamic';
import { Place } from '@/types/place';
import { geocodingService } from '@/lib/geocoding-service';
import { unsplashService } from '@/lib/unsplash-service';

// Import dynamique pour éviter les erreurs SSR
const MapContainer = dynamic(() => import('react-leaflet').then(mod => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import('react-leaflet').then(mod => mod.TileLayer), { ssr: false });
const Marker = dynamic(() => import('react-leaflet').then(mod => mod.Marker), { ssr: false });
const Popup = dynamic(() => import('react-leaflet').then(mod => mod.Popup), { ssr: false });

interface MapPlace extends Place {
  lat?: number;
  lng?: number;
  isLoading?: boolean;
}

interface InteractiveMapProps {
  places: Place[];
  className?: string;
  height?: string;
  center?: [number, number];
  zoom?: number;
}

export default function InteractiveMap({ 
  places, 
  className = '',
  height = '400px',
  center = [48.8566, 2.3522], // Paris par défaut
  zoom = 12
}: InteractiveMapProps) {
  
  // Détecter la destination depuis les adresses des lieux
  const getDestinationCoords = (): [number, number] => {
    if (places.length === 0) return center;
    
    // Chercher des indices de ville dans les adresses
    const firstAddress = places[0]?.address?.toLowerCase() || '';
    
    if (firstAddress.includes('barcelona')) return [41.3851, 2.1734];
    if (firstAddress.includes('madrid')) return [40.4168, -3.7038];
    if (firstAddress.includes('london')) return [51.5074, -0.1278];
    if (firstAddress.includes('rome')) return [41.9028, 12.4964];
    if (firstAddress.includes('berlin')) return [52.5200, 13.4050];
    if (firstAddress.includes('munich')) return [48.1351, 11.5820];
    if (firstAddress.includes('amsterdam')) return [52.3676, 4.9041];
    if (firstAddress.includes('vienna')) return [48.2082, 16.3738];
    
    return center;
  };
  const [mapPlaces, setMapPlaces] = useState<MapPlace[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadPlacesData = async () => {
      setIsLoading(true);
      console.log('🗺️ Loading places data:', places);
      const placesWithCoords: MapPlace[] = [];

      for (const place of places) {
        const placeWithCoords: MapPlace = { ...place, isLoading: true };
        
        // Utiliser les coordonnées existantes ou faire du géocodage
        if (place.lat && place.lng) {
          console.log(`✅ Using existing coordinates for ${place.name}:`, place.lat, place.lng);
          placeWithCoords.lat = place.lat;
          placeWithCoords.lng = place.lng;
        } else {
          console.log(`🔍 Geocoding ${place.name} at ${place.address}`);
          // Géocodage seulement si pas de coordonnées
          const coords = await geocodingService.geocode(place.address);
          if (coords) {
            console.log(`✅ Geocoded coordinates for ${place.name}:`, coords.lat, coords.lng);
            placeWithCoords.lat = coords.lat;
            placeWithCoords.lng = coords.lng;
          } else {
            console.log(`❌ Failed to geocode ${place.name}`);
          }
        }

        // Chargement des images si pas déjà présentes
        if (!place.images || place.images.length === 0) {
          const images = await unsplashService.searchImages(
            place.name,
            place.address,
            place.category,
            3
          );
          placeWithCoords.images = images;
        }

        placeWithCoords.isLoading = false;
        placesWithCoords.push(placeWithCoords);
      }

      setMapPlaces(placesWithCoords);
      setIsLoading(false);
    };

    if (places.length > 0) {
      loadPlacesData();
    }
  }, [places]);

  // Calculer le centre et le zoom automatiquement
  const mapBounds = useMemo(() => {
    const validPlaces = mapPlaces.filter(p => p.lat && p.lng);
    
    if (validPlaces.length === 0) {
      // Si aucun lieu n'a de coordonnées, utiliser les coordonnées de destination
      const destinationCoords = getDestinationCoords();
      return { center: destinationCoords, zoom };
    }

    const lats = validPlaces.map(p => p.lat!);
    const lngs = validPlaces.map(p => p.lng!);
    
    const centerLat = (Math.min(...lats) + Math.max(...lats)) / 2;
    const centerLng = (Math.min(...lngs) + Math.max(...lngs)) / 2;
    
    return {
      center: [centerLat, centerLng] as [number, number],
      zoom: validPlaces.length === 1 ? 15 : 12
    };
  }, [mapPlaces, center, zoom]);

  if (typeof window === 'undefined') {
    return (
      <div className={`bg-gray-200 rounded-lg flex items-center justify-center ${className}`} style={{ height }}>
        <div className="text-gray-500">Chargement de la carte...</div>
      </div>
    );
  }

  return (
    <div className={`relative rounded-lg overflow-hidden ${className}`} style={{ height }}>
      {isLoading && (
        <div className="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center z-10">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
            <div className="text-sm text-gray-600">Chargement des lieux...</div>
          </div>
        </div>
      )}
      
      <MapContainer
        center={mapBounds.center}
        zoom={mapBounds.zoom}
        style={{ height: '100%', width: '100%' }}
        className="z-0"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {mapPlaces
          .filter(place => place.lat && place.lng)
          .map((place) => (
            <Marker
              key={place.id}
              position={[place.lat!, place.lng!]}
            >
              <Popup maxWidth={300} className="custom-popup">
                <PlacePopup place={place} />
              </Popup>
            </Marker>
          ))}
      </MapContainer>
    </div>
  );
}

function PlacePopup({ place }: { place: MapPlace }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = place.images || [];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="w-full">
      {/* Images carousel */}
      {images.length > 0 && (
        <div className="relative mb-3">
          <img
            src={images[currentImageIndex].url}
            alt={images[currentImageIndex].alt}
            className="w-full h-32 object-cover rounded"
            loading="lazy"
          />
          
          {images.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-1 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-opacity-75"
              >
                ‹
              </button>
              <button
                onClick={nextImage}
                className="absolute right-1 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-opacity-75"
              >
                ›
              </button>
              
              <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 flex space-x-1">
                {images.map((_, index) => (
                  <div
                    key={index}
                    className={`w-2 h-2 rounded-full ${
                      index === currentImageIndex ? 'bg-white' : 'bg-white bg-opacity-50'
                    }`}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      )}

      {/* Place info */}
      <div>
        <h3 className="font-semibold text-lg mb-1">{place.name}</h3>
        
        <div className="flex items-center mb-2">
          <div className="flex text-yellow-400 text-sm">
            {[...Array(5)].map((_, i) => (
              <span key={i} className={i < Math.floor(place.rating) ? 'text-yellow-400' : 'text-gray-300'}>
                ★
              </span>
            ))}
          </div>
          <span className="ml-2 text-sm text-gray-600">({place.rating})</span>
        </div>

        <p className="text-sm text-gray-600 mb-2">{place.address}</p>
        
        {place.description && (
          <p className="text-sm text-gray-700 mb-2 line-clamp-3">{place.description}</p>
        )}

        <div className="flex items-center justify-between text-xs text-gray-500">
          <span className="bg-gray-100 px-2 py-1 rounded">{place.category}</span>
          {place.estimatedCost && (
            <span className="font-medium">{place.estimatedCost}</span>
          )}
        </div>
      </div>
    </div>
  );
}