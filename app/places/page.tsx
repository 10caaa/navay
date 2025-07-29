import PlacesMapView from '@/components/PlacesMapView';
import { Place } from '@/types/place';

// Données d'exemple
const samplePlaces: Place[] = [
  {
    id: '1',
    name: 'Le Comptoir du Relais',
    rating: 4.5,
    address: '9 Carrefour de l\'Odéon, 75006 Paris, France',
    description: 'Bistrot parisien authentique proposant une cuisine française traditionnelle dans une ambiance conviviale.',
    category: 'restaurant',
    website: 'https://example.com',
    phone: '+33 1 44 27 07 97',
    estimatedCost: '25-35€',
    priceLevel: 'mid'
  },
  {
    id: '2',
    name: 'Musée du Louvre',
    rating: 4.8,
    address: 'Rue de Rivoli, 75001 Paris, France',
    description: 'Le plus grand musée d\'art du monde, abritant des œuvres emblématiques comme la Joconde.',
    category: 'museum',
    website: 'https://www.louvre.fr',
    estimatedCost: '17€',
    priceLevel: 'mid'
  },
  {
    id: '3',
    name: 'Jardin du Luxembourg',
    rating: 4.6,
    address: '6ème arrondissement, 75006 Paris, France',
    description: 'Magnifique jardin à la française avec ses allées, ses statues et son palais du Luxembourg.',
    category: 'park',
    estimatedCost: 'Gratuit',
    priceLevel: 'budget'
  },
  {
    id: '4',
    name: 'Café de Flore',
    rating: 4.2,
    address: '172 Boulevard Saint-Germain, 75006 Paris, France',
    description: 'Café historique de Saint-Germain-des-Prés, lieu de rendez-vous des intellectuels parisiens.',
    category: 'cafe',
    website: 'https://cafedeflore.fr',
    estimatedCost: '15-25€',
    priceLevel: 'mid'
  }
];

export default function PlacesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Découvrez Paris
          </h1>
          <p className="text-gray-600">
            Explorez les meilleurs lieux de la capitale française avec notre carte interactive
          </p>
        </div>

        <PlacesMapView 
          places={samplePlaces}
          showMap={true}
          showCards={true}
          mapHeight="500px"
          className="space-y-8"
        />
      </div>
    </div>
  );
}