'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function SimpleImageTest() {
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const testUnsplash = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/test-unsplash');
        
        if (response.ok) {
          const data = await response.json();
          setImageUrl(data.imageUrl);
        } else {
          setError('Erreur API');
        }
      } catch (err) {
        setError('Erreur réseau');
      } finally {
        setLoading(false);
      }
    };

    testUnsplash();
  }, []);

  if (loading) return <div>Chargement image test...</div>;
  if (error) return <div>Erreur: {error}</div>;
  if (!imageUrl) return <div>Aucune image trouvée</div>;

  return (
    <div className="p-4 border rounded">
      <h3 className="font-semibold mb-2">Test Image Unsplash</h3>
      <Image
        src={imageUrl}
        alt="Test"
        width={300}
        height={200}
        className="rounded"
      />
    </div>
  );
}