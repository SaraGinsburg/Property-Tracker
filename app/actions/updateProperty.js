'use server';
import connectDB from '@/config/database';
import cloudinary from '@/config/cloudinary';
import Property from '@/models/Property';
import { getSessionUser } from '@/utils/getSessionUser';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export const updateProperty = async (formData) => {
  await connectDB();

  const sessionUser = await getSessionUser();
  if (!sessionUser || !sessionUser.userId) {
    throw new Error('User ID is required');
  }
  const { userId } = sessionUser;

  const propertyId = formData.get('propertyId');
  const oldImages = formData.getAll('oldImages');

  const existingProperty = await Property.findById(propertyId);
  if (!existingProperty) {
    throw new Error('Property not found');
  }

  if (existingProperty.owner.toString() !== userId) {
    throw new Error('Current user does not own this property');
  }

  // Get new uploaded images from formData
  const images = formData.getAll('images').filter((image) => image.size > 0);

  // Current images in DB before update
  const currentImages = existingProperty.images || [];

  // Determine which old images were removed
  const removedImages = currentImages.filter((img) => !oldImages.includes(img));

  // Delete removed old images from Cloudinary
  if (removedImages.length > 0) {
    const publicIdsToDelete = removedImages.map((imageUrl) => {
      const parts = imageUrl.split('/');
      return parts.at(-1).split('.').at(0);
    });
    for (let publicId of publicIdsToDelete) {
      await cloudinary.uploader.destroy('propertytracker/' + publicId);
    }
  }

  // Upload new images and collect URLs
  const newImageUrls = [];
  if (images.length > 0) {
    for (const imageFile of images) {
      const imageBuffer = Buffer.from(await imageFile.arrayBuffer());
      const imageBase64 = imageBuffer.toString('base64');

      const result = await cloudinary.uploader.upload(
        `data:${imageFile.type};base64,${imageBase64}`,
        { folder: 'propertytracker' }
      );
      newImageUrls.push(result.secure_url);
    }
  }

  // Combine kept old images + new uploaded images
  const finalImages = [...oldImages, ...newImageUrls];

  const propertyData = {
    owner: userId,
    type: formData.get('type'),
    name: formData.get('name'),
    description: formData.get('description'),
    location: {
      street: formData.get('location.street'),
      city: formData.get('location.city'),
      state: formData.get('location.state'),
      zipcode: formData.get('location.zipcode'),
    },
    beds: formData.get('beds'),
    baths: formData.get('baths'),
    square_feet: formData.get('square_feet'),
    amenities: formData.getAll('amenities'),
    rates: {
      nightly: formData.get('rates.nightly'),
      monthly: formData.get('rates.monthly'),
    },
    seller_info: {
      name: formData.get('seller_info.name'),
      email: formData.get('seller_info.email'),
      phone: formData.get('seller_info.phone'),
    },
    images: finalImages,
  };

  const updatedProperty = await Property.findByIdAndUpdate(
    propertyId,
    propertyData,
    { new: true }
  );

  revalidatePath('/', 'layout');
  redirect(`/properties/${updatedProperty._id}`);

  return updatedProperty;
};

export default updateProperty;
