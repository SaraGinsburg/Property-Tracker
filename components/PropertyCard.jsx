import Image from 'next/image';
import Link from 'next/link';
import {
  FaBed,
  FaBath,
  FaRulerCombined,
  FaMoneyBill,
  FaMapMarker,
} from 'react-icons/fa';

const PropertyCard = ({ property }) => {
  if (!property) return null; // Avoid rendering if property is undefined

  // Safe values with defaults
  const name = property.name || 'Unnamed Property';
  const type = property.type || 'Property';
  const location = property.location || { city: 'Unknown', state: '' };
  const beds = property.beds ?? 0;
  const baths = property.baths ?? 0;
  const squareFeet = property.square_feet ?? 0;
  const rates = property.rates || {};

  const getRateDisplay = () => {
    if (rates.monthly) return `$${rates.monthly.toLocaleString()}/mo`;
    if (rates.nightly) return `$${rates.nightly.toLocaleString()}/night`;
    return 'N/A';
  };

  const imageSrc = property.images?.[0] || '/images/placeholder.png';

  return (
    <div className='rounded-xl shadow-md relative bg-customVeryLightBlue'>
      <Link href={`/properties/${property._id}`}>
        <div className='relative w-full h-64'>
          <Image
            src={imageSrc}
            alt={name}
            fill
            sizes='100vw'
            className='rounded-t-xl object-cover'
          />
        </div>
      </Link>

      <div className='p-4'>
        <div className='text-left text-customVeryDarkGray md:text-center lg:text-left mb-6'>
          <div className='text-customVeryDarkGray'>{type}</div>
          <h3 className='text-xl font-bold'>{name}</h3>
        </div>

        <h3 className='absolute top-[10px] right-[10px] bg-white px-4 py-2 rounded-lg text-customDarkBlue font-bold text-right md:text-center lg:text-right'>
          {getRateDisplay()}
        </h3>

        <div className='flex justify-center gap-4 text-gray-500 mb-4'>
          <p>
            <FaBed className='lg:inline mr-2' /> {beds}
            <span className='md:hidden lg:inline'> Beds</span>
          </p>
          <p>
            <FaBath className='lg:inline mr-2' /> {baths}
            <span className='md:hidden lg:inline'> Baths</span>
          </p>
          <p>
            <FaRulerCombined className='lg:inline mr-2' /> {squareFeet}
            <span className='md:hidden lg:inline'> sqft</span>
          </p>
        </div>

        <div className='flex justify-center gap-4 text-customDarkGreen text-sm mb-4'>
          <p>
            <FaMoneyBill className='md:hidden lg:inline' /> Nightly
          </p>
          <p>
            <FaMoneyBill className='md:hidden lg:inline' /> Monthly
          </p>
        </div>

        <div className='border border-gray-100 mb-5'></div>

        <div className='flex flex-col lg:flex-row justify-between mb-4'>
          <div className='flex align-middle gap-2 mb-4 lg:mb-0'>
            <FaMapMarker className='text-customPink mt-1' />
            <span className='text-customPink'>
              {location.city}, {location.state}
            </span>
          </div>
          <Link
            href={`/properties/${property._id}`}
            className='h-[36px] bg-customDarkBlue hover:bg-customMedBlue text-white px-4 py-2 rounded-lg text-center text-sm'>
            Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
