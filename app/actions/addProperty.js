'use server';
import connectDB from '@/config/database';
import Property from '@/models/Property';
import { getSessionUser } from '@/utils/getSessionUser';
import { revalidatePath, revalidateTag } from 'next/cache';
import { redirect } from 'next/navigation';
import cloudinary from '@/config/cloudinary';

async function addProperty(formData) {
  try {
    try {
      await connectDB();
    } catch (dbError) {
      console.error('Failed to connect to database:', dbError);
      throw dbError;
    }

    const sessionUser = await getSessionUser();
    if (!sessionUser || !sessionUser.userId) {
      throw new Error('User ID is required');
    }
    const { userId } = sessionUser;

    //Access all values from amenities and images
    const amenities = formData.getAll('amenities') || [];
    const images = (formData.getAll('images') || []).filter(
      (image) => image.name !== ''
    );

    console.log('images', images);
    const propertyData = {
      owner: userId,
      type: formData.get('type') || '',
      name: formData.get('name') || '',
      description: formData.get('description') || '',
      location: {
        street: formData.get('location.street') || '',
        city: formData.get('location.city') || '',
        state: formData.get('location.state') || '',
        zipcode: formData.get('location.zipcode') || '',
      },
      beds: formData.get('beds') || '',
      baths: formData.get('baths') || '',
      square_feet: formData.get('square_feet') || '',

      amenities,
      rates: {
        nightly: formData.get('rates.nightly') || '',
        monthly: formData.get('rates.monthly') || '',
      },
      seller_info: {
        name: formData.get('seller_info.name') || '',
        email: formData.get('seller_info.email') || '',
        phone: formData.get('seller_info.phone') || '',
      },
    };

    const imageUrls = [];

    for (const imageFile of images) {
      const imageBuffer = await imageFile.arrayBuffer();
      const imageArray = Array.from(new Uint8Array(imageBuffer));
      const imageData = Buffer.from(imageArray);

      //convert to base64
      const imageBase64 = imageData.toString('base64');

      //make request to cloudinary
      const result = await cloudinary.uploader.upload(
        `data:image/png;base64,${imageBase64}`,
        {
          folder: 'propertytracker',
        }
      );
      imageUrls.push(result.secure_url);
    }
    propertyData.images = imageUrls;

    const newProperty = new Property(propertyData);
    await newProperty.save();

    revalidatePath('/', 'layout');
    redirect(`/properties/${newProperty._id}`);
  } catch (error) {
    console.error('Error in addProperty:', error);
    throw error;
  }
}

export default addProperty;
