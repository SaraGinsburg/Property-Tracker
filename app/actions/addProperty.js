'use server';
import connectDB from '@/config/database';
import Property from '@/models/Property';
import { getSessionUser } from '@/utils/getSessionUser';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

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
    //const imageUrls = formData.getAll('images') || []; //this is array of URLs
    let imageUrls = [];
    try {
      imageUrls = JSON.parse(formData.get('images') || '[]');
    } catch {
      imageUrls = [];
    }
    if (!Array.isArray(imageUrls)) {
      imageUrls = imageUrls ? [imageUrls] : [];
    }
    //

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
      images: imageUrls,
    };

    const newProperty = new Property(propertyData);
    await newProperty.save();

    revalidatePath('/', 'layout');
    redirect(`/properties/${newProperty._id}`);
  } catch (error) {
    if (error?.digest?.startsWith('NEXT_REDIRECT')) {
      throw error; // Let Next.js handle it silently
    }
    console.error('Error in addProperty:', error);
    throw error;
  }
}

export default addProperty;
