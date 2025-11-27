'use client';
import { useEffect, useState } from 'react';
import 'mapbox-gl/dist/mapbox-gl.css';
import Map, { Marker } from 'react-map-gl/mapbox';
import mapboxgl from 'mapbox-gl'; // ✅ static import instead of dynamic
import Image from 'next/image';
import pin from '@/assets/images/pin.svg';
import Spinner from './Spinner';

const PropertyMap = ({ property }) => {
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const [viewport, setViewport] = useState({
    latitude: 0,
    longitude: 0,
    zoom: 12,
    width: '100%',
    height: '500px',
  });
  const [loading, setLoading] = useState(true);
  const [geocodeError, setGeocodeError] = useState(false);

  useEffect(() => {
    const fetchCoords = async () => {
      const street = property.location?.street || '';
      const city = property.location?.city || '';
      const state = property.location?.state || '';
      const zipcode = property.location?.zipcode || '';

      const fullAddress = `${street}, ${city}, ${state} ${zipcode}`;

      try {
        const res = await fetch(
          `/api/geocode?address=${encodeURIComponent(fullAddress)}`
        );
        if (!res.ok) {
          console.error(
            'Geocode API returned error:',
            res.status,
            await res.text()
          );
          setGeocodeError(true);
          return;
        }
        const data = await res.json();

        if (data.results && data.results.length > 0) {
          const { lat: latitude, lng: longitude } =
            data.results[0].geometry.location;
          setLat(latitude);
          setLng(longitude);
          setViewport((prev) => ({ ...prev, latitude, longitude }));
        } else {
          console.error('No geocoding results found:', data);
          setGeocodeError(true);
        }
      } catch (error) {
        console.error('Geocoding error:', error);
        setGeocodeError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchCoords();
  }, [
    property?.location?.street,
    property?.location?.city,
    property?.location?.state,
    property?.location?.zipcode,
  ]);

  if (loading) return <Spinner />;

  if (geocodeError)
    return (
      <div className='text-center text-customPink'>
        Unable to load map for this property.
      </div>
    );

  return (
    !loading &&
    lat &&
    lng && (
      <Map
        mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
        mapLib={mapboxgl} // ✅ fixed
        initialViewState={{
          longitude: lng,
          latitude: lat,
          zoom: 11,
        }}
        maxZoom={14}
        style={{ width: '100%', height: 500 }}
        mapStyle='mapbox://styles/mapbox/streets-v9'>
        <Marker longitude={lng} latitude={lat} anchor='bottom'>
          <Image src={pin} alt='location' width={40} height={40} />
        </Marker>
      </Map>
    )
  );
};

export default PropertyMap;
