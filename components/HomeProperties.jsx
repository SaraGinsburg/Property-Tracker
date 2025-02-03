import properties from '@/properties.json';
import PropertyCard from './PropertyCard';
import Link from 'next/link';

const HomeProperties = () => {
  const recentProperties = properties.slice(0, 3);
  return (
    <>
      <section className='px-4 py-6'>
        <div className='container m-auto px-4 py-6'>
          <h2 className='text-3xl font-bold text-customDarkBlue mb-6 text-center'>
            Newly Available Rentals
          </h2>
          {properties.length === 0 ? (
            <p>No properties found</p>
          ) : (
            <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
              {recentProperties.map((property) => (
                <PropertyCard key={property._id} property={property} />
              ))}
            </div>
          )}
        </div>
      </section>
      <section className='m-auto max-w-lg my-6 px-6'>
        <Link
          href='/properties'
          className='block bg-customDarkBlue text-white text-center py-4 px-6 rounded-xl hover:bg-customBlue'>
          View all Properties
        </Link>
      </section>
    </>
  );
};

export default HomeProperties;
