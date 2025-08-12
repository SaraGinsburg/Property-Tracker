'use client';
import { useEffect, useState } from 'react';
import { setDefaults, fromAddress } from 'react-geocode';
console.log('fromAddress', fromAddress);
import 'mapbox-gl/dist/mapbox-gl.css';
import Map, { Marker } from 'react-map-gl/mapbox';
import Image from 'next/image';
import pin from '@/assets/images/pin.svg';
import generalMarker from '@/assets/images/dot-circle.svg'; // replace with your icon
import Spinner from './Spinner';

setDefaults({
  key: process.env.NEXT_PUBLIC_GOOGLE_GEOCODING_API_KEY,
  language: 'en',
  region: 'us',
});

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
      try {
        const res = await fromAddress(
          `${property.location.street}, ${property.location.city}, ${property.location.state} ${property.location.zipcode}`
        );
        //  Check geocode results
        if (res.results && res.results.length > 0) {
          const { lat: latitude, lng: longitude } =
            res.results[0].geometry.location;

          setLat(latitude);
          setLng(longitude);
          setViewport({
            ...viewport,
            latitude,
            longitude,
          });
        } else {
          setGeocodeError(true);
        }
      } catch (error) {
        console.log('Geocoding error:', error);
        setGeocodeError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchCoords();
  }, [
    property.location.street,
    property.location.city,
    property.location.state,
    property.location.zipcode,
  ]);

  if (loading) {
    return <Spinner />;
  }
  if (geocodeError) {
    return (
      <div className='text-center text-customPink'>
        Unable to load map for this property.
      </div>
    );
  }

  return (
    !loading && (
      <Map
        mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
        mapLib={import('mapbox-gl')}
        initialViewState={{
          longitude: lng,
          latitude: lat,
          zoom: 11,
        }}
        maxZoom={14} // limit how far in users can zoom
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
