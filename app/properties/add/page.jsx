import PropertyAddForm from '@/components/PropertyAddForm';

const AddPropertyPage = () => {
  return (
    <section className='bg-customVeryLightBlue rounded-lg'>
      <div className='container m-auto max-w-2xl py-24'>
        <div className='bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0'>
          <PropertyAddForm />
        </div>
      </div>{' '}
      Add Property Page
    </section>
  );
};

export default AddPropertyPage;
