'use server';
import connectDB from '@/config/database';
import Property from '@/models/Property';
import { getSessionUser } from '@/utils/getSessionUser';
import { revalidatePath } from 'next/cache';
import { convertToSerializeableObject } from '@/utils/convertToObject';

export const updateProperty = async (formData) => {
  try {
    await connectDB();
    const sessionUser = await getSessionUser();
    if (!sessionUser || !sessionUser.userId) {
      throw new Error('User ID is required');
    }
    const { userId } = sessionUser;

    const propertyId = formData.get('propertyId');
    let oldImages = formData.getAll('oldImages');
    if (!Array.isArray(oldImages)) {
      oldImages = oldImages ? [oldImages] : [];
    }
    const existingProperty = await Property.findById(propertyId);
    if (!existingProperty) throw new Error('Property not found');
    if (existingProperty.owner.toString() !== userId) {
      throw new Error('Current user does not own this property');
    }

    // Get uploaded image URLs from client, safely parse and ensure array of strings
    let uploadedImages = [];
    try {
      uploadedImages = JSON.parse(formData.get('uploadedImages') || '[]');
    } catch {
      uploadedImages = [];
    }
    if (!Array.isArray(uploadedImages)) {
      uploadedImages = uploadedImages ? [uploadedImages] : [];
    }

    // Combine kept old images + uploaded images, ensure unique and no empty strings
    const finalImages = [
      ...new Set([...oldImages, ...uploadedImages].filter(Boolean)),
    ];
    // Prepare property data
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
      beds: parseInt(formData.get('beds')) || 0,
      baths: parseInt(formData.get('baths')) || 0,
      square_feet: parseInt(formData.get('square_feet')) || 0,
      amenities: formData.getAll('amenities'),
      rates: {
        nightly: parseFloat(formData.get('rates.nightly')) || 0,
        monthly: parseFloat(formData.get('rates.monthly')) || 0,
      },
      seller_info: {
        name: formData.get('seller_info.name'),
        email: formData.get('seller_info.email'),
        phone: formData.get('seller_info.phone'),
      },
      images: finalImages,
    };

    const updatedPropertyDoc = await Property.findByIdAndUpdate(
      propertyId,
      propertyData,
      { new: true }
    );

    if (!updatedPropertyDoc) throw new Error('Property not found');

    // Convert to plain object
    const updatedProperty = convertToSerializeableObject(
      updatedPropertyDoc.toObject()
    );

    // Revalidate path so pages update
    revalidatePath('/', 'layout');

    return { success: true, property: updatedProperty };
  } catch (err) {
    console.error('Failed to update property:', err);
    return { success: false, error: err.message };
  }
};

export default updateProperty;
