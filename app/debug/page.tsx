'use client';

import { useState, useEffect } from 'react';
import { Place } from '@/types/place';
import { unsplashService } from '@/lib/unsplash-service';
import { geocodingService } from '@/lib/geocoding-service';

// Test simple sans les composants complexes
export default function DebugPage() {
  const [images, setImages] = useState<any[]>([]);
  const [coordinates, setCoordinates] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');

  const testUnsplash = async () => {
    setLoading(true);
    setError('');
    try {
      console.log('🧪 Test Unsplash...');
      const result = await unsplashService.searchImages('Tour Eiffel', 'Paris', 'attraction', 3);
      console.log('✅ Résultat Unsplash:', result);
      setImages(result);
    } catch (err) {
      console.error('❌ Erreur Unsplash:', err);
      setError(`Erreur Unsplash: ${err}`);
    }
    setLoading(false);
  };

  const testGeocoding = async () => {
    setLoading(true);
    setError('');
    try {
      console.log('🧪 Test Géocodage...');
      const result = await geocodingService.geocode('Tour Eiffel, Paris, France');
      console.log('✅ Résultat Géocodage:', result);
      setCoordinates(result);
    } catch (err) {
      console.error('❌ Erreur Géocodage:', err);
      setError(`Erreur Géocodage: ${err}`);
    }
    setLoading(false);
  };

  const testLeaflet = () => {
    console.log('🧪 Test Leaflet...');
    console.log('Window:', typeof window);
    console.log('Document:', typeof document);
    
    // Test d'import dynamique
    import('leaflet').then((L) => {
      console.log('✅ Leaflet chargé:', L);
    }).catch((err) => {
      console.error('❌ Erreur Leaflet:', err);
    });
  };

  useEffect(() => {
    console.log('🚀 Page Debug chargée');
    console.log('Clé Unsplash:', process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY ? 'Présente' : 'Manquante');
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">🔧 Page de Debug</h1>

        {/* Tests */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <button
            onClick={testUnsplash}
            disabled={loading}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
          >
            Test Unsplash
          </button>
          
          <button
            onClick={testGeocoding}
            disabled={loading}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 disabled:opacity-50"
          >
            Test Géocodage
          </button>
          
          <button
            onClick={testLeaflet}
            className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600"
          >
            Test Leaflet
          </button>
        </div>

        {/* Status */}
        <div className="bg-white rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">📊 Status</h2>
          
          <div className="space-y-2 text-sm">
            <div>🔑 Clé Unsplash: {process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY ? '✅ Présente' : '❌ Manquante'}</div>
            <div>🌐 Environnement: {typeof window !== 'undefined' ? '✅ Client' : '❌ Serveur'}</div>
            <div>📦 Images chargées: {images.length}</div>
            <div>📍 Coordonnées: {coordinates ? '✅ Obtenues' : '❌ Non obtenues'}</div>
          </div>

          {loading && (
            <div className="mt-4 text-blue-600">⏳ Chargement...</div>
          )}

          {error && (
            <div className="mt-4 text-red-600 bg-red-50 p-3 rounded">
              ❌ {error}
            </div>
          )}
        </div>

        {/* Résultats Images */}
        {images.length > 0 && (
          <div className="bg-white rounded-lg p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">🖼️ Images Unsplash</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {images.map((img, index) => (
                <div key={img.id} className="border rounded-lg overflow-hidden">
                  <img 
                    src={img.url} 
                    alt={img.alt}
                    className="w-full h-48 object-cover"
                    onError={(e) => {
                      console.error('Erreur chargement image:', img.url);
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                  <div className="p-3">
                    <div className="text-sm font-medium">{img.alt}</div>
                    <div className="text-xs text-gray-500">Par: {img.credit}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Résultats Coordonnées */}
        {coordinates && (
          <div className="bg-white rounded-lg p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">📍 Coordonnées</h2>
            <div className="text-sm space-y-1">
              <div>Latitude: {coordinates.lat}</div>
              <div>Longitude: {coordinates.lng}</div>
              <div>Adresse: {coordinates.display_name}</div>
            </div>
          </div>
        )}

        {/* Test simple de carte */}
        <div className="bg-white rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">🗺️ Test Carte Simple</h2>
          <div 
            id="simple-map" 
            className="w-full h-64 bg-gray-200 rounded flex items-center justify-center"
          >
            <div className="text-gray-500">Zone de carte (à implémenter)</div>
          </div>
        </div>
      </div>
    </div>
  );
}