import InfoBox from './InfoBox';

const InfoBoxes = () => {
  return (
    <section>
      <div className='container-xl lg:container m-auto'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-lg'>
          <InfoBox
            heading='For Renters'
            buttonInfo={{
              text: 'Browse Properties',
              link: '/properties',
            }}>
            Find your ideal rental. Bookmark properties and connect with owners.
          </InfoBox>
          <InfoBox
            heading='For Property Owners'
            buttonInfo={{
              text: 'Add Property',
              link: '/properties/add',
            }}>
            List your property for short-term or long-term rentals and reach
            potential renters.
          </InfoBox>{' '}
        </div>
      </div>
    </section>
  );
};

export default InfoBoxes;
