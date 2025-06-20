import React from 'react';

const MessageCard = ({ message }) => {
  return (
    <div className='relative bg-white p-4  text-customVeryDarkGray rounded-md shadow-md border border-customMedGray'>
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

      <button className='mt-4 mr-3 py-1 px-3 font-medium text-xl rounded-md bg-customDarkBlue  hover:bg-customMedBlue text-white'>
        Mark As Read
      </button>

      <button className='mt-4  py-1 px-3 font-medium text-xl rounded-md bg-customRed  hover:bg-customMedBlue text-white'>
        Delete
      </button>
    </div>
  );
};

export default MessageCard;
