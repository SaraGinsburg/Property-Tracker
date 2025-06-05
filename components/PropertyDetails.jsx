import {
  FaTimes,
  FaCheck,
  FaBed,
  FaBath,
  FaRulerCombined,
  FaMapMarker,
} from 'react-icons/fa';
import PropertyMap from './PropertyMap';

const PropertyDetails = ({ property }) => {
  return (
    <main>
      <div className='bg-white p-6 rounded-lg shadow-md text-center md:text-left'>
        <div className='text-customMedGray mb-4'>{property.type}</div>
        <h1 className='text-3xl text-customDarkGray font-bold mb-4'>
          {property.name}
        </h1>
        <div className='text-customMedGray mb-4 flex align-middle justify-center md:justify-start'>
          <FaMapMarker className='text-customPink mt-1 mr-1' />
          <p className='text-customPink'>
            {property.location.street}, {property.location.city}{' '}
            {property.location.state} {property.location.zipcode}
          </p>
        </div>

        <h3 className='text-lg font-bold my-6 bg-customDarkGray text-white p-2 rounded-lg'>
          Rates & Options
        </h3>
        <div className='flex flex-col md:flex-row justify-around'>
          <div className='flex items-center justify-center mb-4 border-b border-gray-200 md:border-b-0 pb-4 md:pb-0'>
            <div className='text-customDarkGray mr-2 font-bold'>Nightly</div>
            <div className='text-customMedGreen  mr-2 font-bold'>
              {property.rates.nightly ? (
                `$${property.rates.nightly.toLocaleString()}`
              ) : (
                <FaTimes className='text-customPink' />
              )}
            </div>
          </div>

          <div className='flex items-center justify-center mb-4 pb-4 md:pb-0'>
            <div className='text-customDarkGray mr-2 font-bold'>Monthly</div>
            <div className='text-customMedGreen mr-2 '>
              {property.rates.monthly ? (
                `$${property.rates.monthly.toLocaleString()}`
              ) : (
                <FaTimes className='text-customPink' />
              )}
            </div>
          </div>
        </div>
      </div>

      <div className='bg-white p-6 rounded-lg shadow-md mt-6'>
        <h3 className='text-lg text-customDarkGray font-bold mb-6'>
          Description & Details
        </h3>
        <div className='flex justify-center gap-4 text-customMedGreen mb-4  space-x-9'>
          <p>
            <FaBed className='inline-block mr-2' /> {property.beds}{' '}
            <span className='hidden sm:inline'>Beds</span>
          </p>
          <p>
            <FaBath className='inline-block mr-2' /> {property.baths}{' '}
            <span className='hidden sm:inline'>Baths</span>
          </p>
          <p>
            <FaRulerCombined className='inline-block mr-2' />
            {property.square_feet}{' '}
            <span className='hidden sm:inline'>sqft</span>
          </p>
        </div>
        <p className='text-customPink mb-4'>{property.description}</p>
      </div>

      <div className='bg-white p-6 rounded-lg shadow-md mt-6'>
        <h3 className='text-lg text-customDarkGray font-bold mb-6'>
          Amenities
        </h3>

        <ul className='grid grid-cols-1 text-customDarkGray md:grid-cols-2 lg:grid-cols-3 list-none'>
          {property.amenities.map((amenity, index) => (
            <li key={index}>
              <FaCheck className='inline-block text-customMedGreen mr-2' />{' '}
              {amenity}
            </li>
          ))}
        </ul>
      </div>
      {/* <!-- Map --> */}
      <div className='bg-white p-6 rounded-lg shadow-md mt-6'>
        <PropertyMap property={property} />
      </div>
    </main>
  );
};

export default PropertyDetails;
