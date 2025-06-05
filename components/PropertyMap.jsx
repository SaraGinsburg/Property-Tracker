'use client';
import { useEffect, useState } from 'react';
import { setDefaults, fromAddress } from 'react-geocode';

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

  setDefaults({
    key: process.env.NEXT_PUBLIC_GOOGLE_GEOCODING_API_KEY,
    language: 'en',
    region: 'us',
  });

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
  }, []);

  if (loading) {
    return <div className='text-center text-customMedGray'>Loading map...</div>;
  }
  if (geocodeError) {
    return (
      <div className='text-center text-customPink'>
        Unable to load map for this property.
      </div>
    );
  }

  return <div>Map</div>;
};
export default PropertyMap;
