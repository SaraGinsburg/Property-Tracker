const PropertyPage = async ({ params }) => {
  const { id } = await params;
  return <div>Property Page {params.id}</div>;
};

export default PropertyPage;
