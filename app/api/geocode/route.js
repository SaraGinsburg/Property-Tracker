// app/api/geocode/route.js

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const address = searchParams.get('address');

  if (!address) {
    return new Response(
      JSON.stringify({ error: 'Missing address parameter' }),
      {
        status: 400,
      }
    );
  }

  const apiKey = process.env.GOOGLE_GEOCODING_API_KEY; // server-side only
  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
    address
  )}&key=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Geocoding failed' }), {
      status: 500,
    });
  }
}
