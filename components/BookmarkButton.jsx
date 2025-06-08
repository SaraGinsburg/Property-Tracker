import { FaBookmark } from 'react-icons/fa';

const BookmarkButton = ({ property }) => {
  return (
    <div>
      <button className='bg-customMedBlue hover:bg-customBlue text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center'>
        <FaBookmark className='mr-2' />
        Bookmark Property
      </button>
    </div>
  );
};

export default BookmarkButton;
