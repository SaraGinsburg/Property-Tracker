'use server';
import cloudinary from '@/config/cloudinary';
import connectDB from '@/config/database';
import Property from '@/models/Property';
import { revalidatePath } from 'next/cache';
import { getSessionUser } from '@/utils/getSessionUser';

async function deleteProperty(propertyId) {
  const sessionUser = await getSessionUser();

  // check for session
  if (!sessionUser || !sessionUser.userId) {
    throw new Error('User ID is required');
  }

  const { userId } = sessionUser;

  // Connect to the database
  await connectDB();

  // Check if the property belongs to the user
  const property = await Property.findById(propertyId);
  if (!property) {
    throw new Error('Property not found');
  }
  // verify ownership
  if (property.owner.toString() !== userId) {
    throw new Error('Unauthorized');
  }

  // Extract public ID from image URLs
  const publicIds = property.images.map((imageUrl) => {
    const parts = imageUrl.split('/');
    const publicId = parts.at(-1).split('.')[0];
    return publicId;
  });

  // Delete images from Cloudinary in parallel
  if (publicIds.length > 0) {
    await Promise.all(
      publicIds.map((publicId) =>
        cloudinary.uploader.destroy(`propertytracker/${publicId}`)
      )
    );
  }

  //delete the property from the MongoDB database
  await property.deleteOne();

  // Revalidate the paths where the property might appear
  revalidatePath('/', 'layout');
  revalidatePath('/properties');
  revalidatePath(`/properties/${propertyId}`);

  // Return a success response for the client
  return { success: true, propertyId };
}
export default deleteProperty;
