const Hero = () => {
  return (
    <section className='bg-customMedBlue py-20 mb-4'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center'>
        <div className='text-center'>
          <h1 className='text-4xl font-extrabold text-white sm:text-5xl md:text-6xl'>
            Find The Perfect Rental
          </h1>
          <p className='my-4 text-xl text-white'>
            Discover the perfect property that suits your needs.
          </p>
        </div>
        {/* <!-- Form Component --> */}
        <form className='mt-3 mx-auto max-w-2xl w-full flex flex-col md:flex-row items-center'>
          <div className='w-full md:w-3/5 md:pr-2 mb-4 md:mb-0'>
            <label htmlFor='location' className='sr-only'>
              Location
            </label>
            <input
              type='text'
              id='location'
              placeholder='Enter Location (City, State, Zip, etc)'
              className='w-full px-4 py-3 rounded-lg bg-white text-gray-800 focus:outline-none focus:ring focus:ring-customBlue'
            />
          </div>
          <div className='w-full md:w-2/5 md:pl-2'>
            <label htmlFor='property-type' className='sr-only'>
              Property Type
            </label>
            <select
              id='property-type'
              className='w-full px-4 py-3 rounded-lg bg-white text-gray-400 focus:outline-none focus:ring focus:ring-customBlue'>
              <option value='All' className='text-gray-400'>
                All
              </option>
              <option value='Apartment' className='text-gray-400'>
                Apartment
              </option>
              <option value='Studio' className='text-gray-400'>
                Studio
              </option>
              <option value='Condo' className='text-gray-400'>
                Condo
              </option>
              <option value='House' className='text-gray-400'>
                House
              </option>
              <option value='Cabin Or Cottage' className='text-gray-400'>
                Cabin or Cottage
              </option>
              <option value='Loft' className='text-gray-400'>
                Loft
              </option>
              <option value='Room' className='text-gray-400'>
                Room
              </option>
              <option value='Other' className='text-gray-400'>
                Other
              </option>
            </select>
          </div>
          <button
            type='submit'
            className='md:ml-4 mt-4 md:mt-0 w-full md:w-auto px-6 py-3 rounded-lg text-slate-300 hover:bg-slate-400 hover:text-white focus:outline-none focus:ring focus:ring-blue-500'>
            Search
          </button>
        </form>
      </div>
    </section>
  );
};

export default Hero;
