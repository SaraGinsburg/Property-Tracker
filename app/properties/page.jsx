import PropertyCard from '@/components/PropertyCard';
import connectDB from '@/config/database';
import Property from '@/models/Property';
import Pagination from '@/components/Pagination';

const PropertiesPage = async ({ searchParams: { page = 1, pageSize = 9 } }) => {
  await connectDB();
  const skip = (page - 1) * pageSize;
  const total = await Property.countDocuments({}); // Get total number of properties
  const properties = await Property.find({}).skip(skip).limit(pageSize); //.lean() returns js object instead of a mongoDB document

  const showPagination = total > pageSize;

  return (
    <section className='px-4 py-6'>
      <div className='container m-auto px-4 py-6'>
        {properties.length === 0 ? (
          <p>No properties found</p>
        ) : (
          <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
            {properties.map((property) => (
              <PropertyCard key={property._id} property={property} />
            ))}
          </div>
        )}
        {showPagination && (
          <div className='flex justify-center mt-6'>
            <Pagination
              page={parseInt(page)}
              pageSize={parseInt(pageSize)}
              totalItems={total}
            />
          </div>
        )}
      </div>
    </section>
  );
};

export default PropertiesPage;
