import { FaShare } from 'react-icons/fa';

const ShareButtons = ({ property }) => {
  return (
    <div>
      <button className='bg-customVeryLightPink hover:bg-customLightPink text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center'>
        <FaShare className='mr-2' /> Share Property
      </button>
    </div>
  );
};

export default ShareButtons;
