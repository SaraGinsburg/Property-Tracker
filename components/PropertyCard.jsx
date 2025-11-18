import Image from 'next/image';
import Link from 'next/link';
import {
  FaBed,
  FaBath,
  FaRulerCombined,
  FaMoneyBill,
  FaMapMarker,
  FaHome,
} from 'react-icons/fa';

const PropertyCard = ({ property }) => {
  const getRateDisplay = () => {
    const { rates } = property;
    if (rates.monthly) {
      return `$${rates.monthly.toLocaleString()}/mo`;
    } else if (rates.nightly) {
      return `$${rates.nightly.toLocaleString()}/night`;
    }
  };
  return (
    <div className='rounded-xl shadow-md relative bg-customVeryLightBlue'>
      <Link href={`/properties/${property._id}`}>
        {property.images[0] && (
          <Image
            src={property.images[0]}
            alt={property.name || 'Property image'}
            width={0}
            height={0}
            sizes='100vw'
            className='w-full h-auto rounded-t-xl'
          />
        )}
      </Link>
      <div className='p-4'>
        <div className='text-left text-customVeryDarkGray md:text-center lg:text-left mb-6'>
          <div className='text-customVeryDarkGray'>{property.type}</div>
          <h3 className='text-xl font-bold'>{property.name}</h3>
        </div>
        <h3 className='absolute top-[10px] right-[10px] bg-white px-4 py-2 rounded-lg text-customDarkBlue font-bold text-right md:text-center lg:text-right'>
          {getRateDisplay()}
        </h3>

        <div className='flex justify-center gap-4 text-gray-500 mb-4'>
          <p>
            <FaBed className=' lg:inline mr-2' /> {property.beds}
            <span className='md:hidden lg:inline'> Beds</span>
          </p>
          <p>
            <FaBath className=' lg:inline mr-2' /> {property.baths}
            <span className='md:hidden lg:inline'> Baths</span>
          </p>
          <p>
            <FaRulerCombined className=' lg:inline  mr-2' />{' '}
            {property.square_feet}
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
            <i className='fa-solid fa-location-dot text-lg text-customPink'></i>
            <span className='text-customPink'>
              {property.location.city}, {property.location.state}
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
