'use client';
import { useState } from 'react';
import Image from 'next/image';

const ProfileProperties = ({ properties: initialProperties }) => {
  const [properties, setProperties] = useState(initialProperties);
  // console.log('properties', properties);
  return properties.map((property) => (
    <div key={property._id} className='mb-10'>
      <a href='/property.html'>
        <Image
          className='h-32 w-full rounded-md object-cover'
          src={property.images[0]}
          width={1000}
          height={200}
          alt='Property 1'
        />
      </a>
      <div className='mt-2'>
        <p className='text-lg text-customVeryDarkGray font-semibold'>
          {property.name}
        </p>
        <p className='text-customVeryDarkGray'>
          Address: {property.location.street} {property.location.city}{' '}
          {property.location.state}
        </p>
      </div>
      <div className='mt-2'>
        <a
          href='/add-property.html'
          className='bg-customDarkBlue text-white px-3 py-3 rounded-md mr-2 hover:bg-customMedBlue'>
          Edit
        </a>
        <button
          className='bg-customPink text-white px-3 py-2 rounded-md hover:bg-customLightPink'
          type='button'>
          Delete
        </button>
      </div>
    </div>
  ));
};

export default ProfileProperties;
