import Image from 'next/image';
import Link from 'next/link';
import {
  FaBed,
  FaBath,
  FaRulerCombined,
  FaMoneyBill,
  FaMapMarker,
} from 'react-icons/fa';

const FeaturedPropertyCard = ({ property }) => {
  const getRateDisplay = () => {
    const { rates } = property;
    if (rates.monthly) {
      return `$${rates.monthly.toLocaleString()}/mo`;
    } else if (rates.nightly) {
      return `$${rates.nightly.toLocaleString()}/night`;
    }
  };
  return (
    <div className='bg-white rounded-xl shadow-md relative flex flex-col md:flex-row'>
      <Image
        src={property.images[0]}
        alt=''
        width={800}
        height={600}
        className='w-full h-full object-cover rounded-t-xl md:rounded-tr-none md:rounded-l-xl md:w-[40%]'
      />
      <div className='p-6'>
        <h3 className='text-xl text-customVeryDarkGray font-bold'>
          {property.name}
        </h3>
        <div className='text-customVeryDarkGray'>{property.type}</div>
        <h3 className='absolute top-[10px] left-[10px] bg-white px-4 py-2 rounded-lg text-customDarkBlue font-bold text-right md:text-center lg:text-right'>
          {getRateDisplay()}
        </h3>
        <div className='flex justify-center gap-4 text-gray-500 mb-4'>
          <p>
            <FaBed className=' lg:inline  mr-2' /> {property.beds}{' '}
            <span className='md:hidden lg:inline'> Beds</span>
          </p>
          <p>
            <FaBath className=' lg:inline mr-2' /> {property.baths}{' '}
            <span className='md:hidden lg:inline'> Baths</span>
          </p>
          <p>
            <FaRulerCombined className=' lg:inline  mr-2' />{' '}
            {property.square_feet}{' '}
            <span className='md:hidden lg:inline'> sqft</span>
          </p>
        </div>

        <div className='flex justify-center gap-4 text-customDarkGreen text-sm mb-4'>
          {property.rates.nightly && (
            <p>
              <FaMoneyBill className='md:hidden lg:inline' /> Nightly
            </p>
          )}
          {property.rates.monthly && (
            <p>
              <FaMoneyBill className='md:hidden lg:inline' /> Monthly
            </p>
          )}
        </div>

        <div className='border border-gray-200 mb-5'></div>

        <div className='flex flex-col lg:flex-row justify-between'>
          <div className='flex flex-col items-center gap-4 mb-4 lg:mb-0'>
            <div className='flex items-center gap-2'>
              <FaMapMarker className='text-lg text-customPink' />
              <span className='text-customPink'>
                {property.location.city} {property.location.state}
              </span>
            </div>

            <Link
              href={`/properties/${property._id}`}
              className='w-[120px] h-[36px] bg-customDarkBlue hover:bg-customMedBlue text-white py-2 rounded-lg text-center text-sm flex items-center justify-center'>
              Details
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedPropertyCard;
