import PropertyCard from '@/components/PropertyCard';
import connectDB from '@/config/database';
import Property from '@/models/Property';
import Pagination from '@/components/Pagination';

const PropertiesPage = async (props) => {
  const { searchParams } = props;
  const page = parseInt(searchParams.page) || 1; // Default to page 1 if not provided
  const pageSize = parseInt(searchParams.pageSize) || 10; // Default to 10

  await connectDB();
  const skip = (page - 1) * pageSize;
  const total = await Property.countDocuments({}); // Get total number of properties
  const properties = await Property.find({}).skip(skip).limit(pageSize).lean(); //returns js object instead of a mongoDB document

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
            <Pagination page={page} pageSize={pageSize} totalItems={total} />
          </div>
        )}
      </div>
    </section>
  );
};

export default PropertiesPage;
