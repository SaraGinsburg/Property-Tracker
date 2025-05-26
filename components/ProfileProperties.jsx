'use client';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { toast } from 'react-toastify';
import deleteProperty from '@/app/actions/deleteProperty';

const ProfileProperties = ({ properties: initialProperties }) => {
  const [properties, setProperties] = useState(initialProperties);

  const handleDeleteProperty = async (propertyId) => {
    const confirmed = window.confirm(
      'Are you sure you want to delete this property'
    );
    if (!confirmed) return;
    await deleteProperty(propertyId);
    setProperties((prevProperties) =>
      prevProperties.filter((property) => property._id !== propertyId)
    );
    toast.success('Property deleted successfully');
    // Optionally, you can revalidate the path to update the cache
  };

  return properties.map((property) => (
    <div key={property._id} className='mb-10'>
      <Link href={`/properties/${property._id}`}>
        <Image
          className='h-32 w-full rounded-md object-cover'
          src={property.images[0]}
          width={1000}
          height={200}
          alt='Property 1'
        />
      </Link>
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
          type='button'
          onClick={() => handleDeleteProperty(property._id)}>
          Delete
        </button>
      </div>
    </div>
  ));
};

export default ProfileProperties;
