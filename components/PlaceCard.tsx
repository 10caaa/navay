'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Place, PlaceImage } from '@/types/place';
import { unsplashService } from '@/lib/unsplash-service';

interface PlaceCardProps {
  place: Place;
  className?: string;
  showFullDescription?: boolean;
  onImageClick?: (image: PlaceImage, index: number) => void;
}

export default function PlaceCard({ 
  place, 
  className = '',
  showFullDescription = false,
  onImageClick
}: PlaceCardProps) {
  const [images, setImages] = useState<PlaceImage[]>(place.images || []);
  const [isLoadingImages, setIsLoadingImages] = useState(!place.images || place.images.length === 0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const loadImages = async () => {
      if (!place.images || place.images.length === 0) {
        setIsLoadingImages(true);
        const fetchedImages = await unsplashService.searchImages(
          place.name,
          place.address,
          place.category,
          3
        );
        setImages(fetchedImages);
        setIsLoadingImages(false);
      }
    };

    loadImages();
  }, [place]);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const getPriceLevelColor = (level?: string) => {
    switch (level) {
      case 'budget': return 'text-green-600 bg-green-100';
      case 'mid': return 'text-yellow-600 bg-yellow-100';
      case 'high': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className={`bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 ${className}`}>
      {/* Image Hero Section */}
      <div className="relative h-48 bg-gray-200">
        {isLoadingImages ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        ) : images.length > 0 ? (
          <>
            <Image
              src={images[currentImageIndex].url}
              alt={images[currentImageIndex].alt}
              fill
              className="object-cover cursor-pointer"
              onClick={() => onImageClick?.(images[currentImageIndex], currentImageIndex)}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            
            {images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-opacity-75 transition-opacity"
                  aria-label="Image précédente"
                >
                  ‹
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-opacity-75 transition-opacity"
                  aria-label="Image suivante"
                >
                  ›
                </button>
                
                <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1">
                  {images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-2 h-2 rounded-full transition-opacity ${
                        index === currentImageIndex ? 'bg-white' : 'bg-white bg-opacity-50'
                      }`}
                      aria-label={`Aller à l'image ${index + 1}`}
                    />
                  ))}
                </div>
              </>
            )}

            {/* Credit overlay */}
            <div className="absolute bottom-0 right-0 bg-black bg-opacity-50 text-white text-xs px-2 py-1">
              Photo: {images[currentImageIndex].credit}
            </div>
          </>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-gray-500">
            Aucune image disponible
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="p-4">
        {/* Header */}
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-xl font-semibold text-gray-900 line-clamp-2">{place.name}</h3>
          {place.priceLevel && (
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriceLevelColor(place.priceLevel)}`}>
              {place.priceLevel}
            </span>
          )}
        </div>

        {/* Rating */}
        <div className="flex items-center mb-2">
          <div className="flex text-yellow-400">
            {[...Array(5)].map((_, i) => (
              <span key={i} className={i < Math.floor(place.rating) ? 'text-yellow-400' : 'text-gray-300'}>
                ★
              </span>
            ))}
          </div>
          <span className="ml-2 text-sm text-gray-600">({place.rating})</span>
        </div>

        {/* Address */}
        <p className="text-sm text-gray-600 mb-3 flex items-center">
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          {place.address}
        </p>

        {/* Description */}
        {place.description && (
          <p className={`text-sm text-gray-700 mb-3 ${showFullDescription ? '' : 'line-clamp-3'}`}>
            {place.description}
          </p>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between">
          <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
            {place.category}
          </span>
          
          <div className="flex items-center space-x-2">
            {place.estimatedCost && (
              <span className="text-sm font-medium text-gray-900">{place.estimatedCost}</span>
            )}
            
            {place.website && (
              <a
                href={place.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 text-sm"
                aria-label="Visiter le site web"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}