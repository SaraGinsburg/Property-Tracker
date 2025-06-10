'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const PropertySearchForm = () => {
  const [location, setLocation] = useState('');
  const [propertyType, setPropertyType] = useState('All');

  const router = useRouter();

  // const handleSubmit = (e) => {
  //   e.preventDefault();

  //   const query = new URLSearchParams();
  //   if (location) {
  //     query.set('location', location);
  //   }
  //   if (propertyType) {
  //     query.set('propertyType', propertyType);
  //   }
  //   // If both fields are empty, redirect to the properties page
  //   if ([...query].length === 0) {
  //     router.push('/properties');
  //   } else router.push(`/properties/search-results?${query.toString()}`);
  // };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (location === '' && propertyType === 'All') {
      router.push('/properties');
    } else {
      const query = `?location=${location}&propertyType=${propertyType}`;

      router.push(`/properties/search-results${query}`);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className='mt-3 mx-auto max-w-2xl w-full flex flex-col md:flex-row items-center'>
      <div className='w-full md:w-3/5 md:pr-2 mb-4 md:mb-0'>
        <label htmlFor='location' className='sr-only'>
          Location
        </label>
        <input
          type='text'
          id='location'
          placeholder='Enter Location (City, State, Zip, etc)'
          className='w-full px-4 py-3 rounded-lg bg-white text-customDarkGray focus:outline-none focus:ring focus:ring-customBlue'
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
      </div>
      <div className='w-full md:w-2/5 md:pl-2'>
        <label htmlFor='property-type' className='sr-only'>
          Property Type
        </label>
        <select
          id='property-type'
          className='w-full px-4 py-3 rounded-lg bg-white text-customDarkGray focus:outline-none focus:ring focus:ring-customBlue'
          value={propertyType}
          onChange={(e) => setPropertyType(e.target.value)}>
          <option value='All' className='text-customDarkGray'>
            All
          </option>
          <option value='Apartment' className='text-customDarkGray'>
            Apartment
          </option>
          <option value='Studio' className='text-customDarkGray'>
            Studio
          </option>
          <option value='Condo' className='text-customDarkGray'>
            Condo
          </option>
          <option value='House' className='text-customDarkGray'>
            House
          </option>
          <option value='Cabin Or Cottage' className='text-customDarkGray'>
            Cabin or Cottage
          </option>
          <option value='Loft' className='text-customDarkGray'>
            Loft
          </option>
          <option value='Room' className='text-customDarkGray'>
            Room
          </option>
          <option value='Other' className='text-customDarkGray'>
            Other
          </option>
        </select>
      </div>
      <button
        type='submit'
        className='md:ml-4 mt-4 md:mt-0 w-full md:w-auto px-6 py-3 rounded-lg bg-customGray hover:bg-customMedGray text-white focus:outline-none  transition duration-300 ease-in-out'>
        Search
      </button>
    </form>
  );
};

export default PropertySearchForm;
