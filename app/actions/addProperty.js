'use server';

async function addPropery(formData) {
  console.log(formData.getAll('amenities'));
}

export default addPropery;
