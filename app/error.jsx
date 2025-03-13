'use client';
import Link from 'next/link';
import { FaExclamationCircle } from 'react-icons/fa';

const ErrorPage = ({ error }) => {
  return (
    <section className='bg-customVeryLightBlue min-h-screen flex-grow'>
      <div className='container m-auto max-w-2xl py-24'>
        <div className='bg-white px-6 py-10 mb-4 shadow-md rounded-md border m-4 md:m-0'>
          <div className='flex justify-center'>
            <FaExclamationCircle className=' text-yellow-400 text-8xl' />
          </div>
          <div className='text-center'>
            <h1 className='text-3xl font-bold mt-8 mb-2 text-customDarkBlue'>
              Something Went Wrong
            </h1>
            <p className='text-customBlue text-xl mb-10'>{error.toString()}</p>
            <Link
              href='/'
              className='bg-customDarkBlue hover:bg-customMedBlue text-white font-bold py-4 px-6 rounded-xl'>
              Go Home
            </Link>
          </div>
        </div>
      </div>
      <div className='flex-grow'></div>
    </section>
  );
};

export default ErrorPage;
