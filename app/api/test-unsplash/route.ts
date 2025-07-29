import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const accessKey = process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY;
    
    if (!accessKey) {
      return NextResponse.json({ error: 'Clé API Unsplash manquante' }, { status: 500 });
    }

    const response = await fetch(`https://api.unsplash.com/search/photos?query=paris&per_page=1`, {
      headers: {
        'Authorization': `Client-ID ${accessKey}`,
        'Accept-Version': 'v1'
      }
    });

    if (!response.ok) {
      return NextResponse.json({ 
        error: `Erreur API Unsplash: ${response.status}` 
      }, { status: response.status });
    }

    const data = await response.json();
    
    if (data.results && data.results.length > 0) {
      return NextResponse.json({
        success: true,
        imageUrl: data.results[0].urls.small,
        alt: data.results[0].alt_description,
        credit: data.results[0].user.name
      });
    } else {
      return NextResponse.json({ error: 'Aucune image trouvée' }, { status: 404 });
    }
  } catch (error) {
    console.error('Erreur test Unsplash:', error);
    return NextResponse.json({ 
      error: 'Erreur serveur' 
    }, { status: 500 });
  }
}