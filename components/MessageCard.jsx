'use client';
import { useState } from 'react';
import { toast } from 'react-toastify';
import markMessageAsRead from '@/app/actions/markMessageAsRead';
import deleteMessage from '@/app/actions/deleteMessage';

const MessageCard = ({ message }) => {
  const [isRead, setIsRead] = useState(message.read);
  const [isDeleted, setIsDeleted] = useState(false);

  const handleReadClick = async () => {
    const read = await markMessageAsRead(message._id);
    setIsRead(read);
    toast.success(`Marked as ${read ? 'Read' : 'New'}`);
  };
  const handleDeleteClick = async () => {
    await deleteMessage(message._id);
    setIsDeleted(true);
    toast.success('Message deleted successfully');
  };
  if (isDeleted) return <p className=''>Deleted message</p>;
  return (
    <div className='relative bg-white p-4  text-customVeryDarkGray rounded-md shadow-md border border-customMedGray'>
      {!isRead && (
        <div className='absolute top-2 right-2 bg-yellow-400 text-white px-2 py-1 rounded-md text-xs'>
          New
        </div>
      )}
      <h2 className='font-medium mb-4'>
        <span className=' font-semibold'>Property Inquiry:</span>{' '}
        {message.property.name}
      </h2>
      <p className=' mb-2 font-medium text-lg'>{message.body}</p>

      <ul className='mt-4'>
        <li className='text-customVeryDarkGray'>
          Reply Email:{' '}
          <a
            href={`mailto:${message.email}`}
            className='font-medium text-customMedGreen text-lg hover:underline'>
            {message.email}
          </a>
        </li>
        <li>
          Reply Phone:{' '}
          <a
            href={`tel:${message.phone}`}
            className='text-customMedGreen font-medium text-lg hover:underline'>
            {message.phone}
          </a>
        </li>
        <li>
          <span className='font-semibold'>Received:</span>{' '}
          <span className='font-medium text-lg'>
            {new Date(message.createdAt).toLocaleString()}
          </span>
        </li>
      </ul>

      <button
        onClick={handleReadClick}
        className='mt-4 mr-3 py-1 px-3 font-medium text-xl rounded-md bg-customDarkBlue  text-white'>
        {isRead ? 'Mark As New' : 'Mark As Read'}
      </button>

      <button
        onClick={handleDeleteClick}
        className='mt-4  py-1 px-3 font-medium text-xl rounded-md bg-customRed  hover:bg-customMedBlue text-white'>
        Delete
      </button>
    </div>
  );
};

export default MessageCard;
