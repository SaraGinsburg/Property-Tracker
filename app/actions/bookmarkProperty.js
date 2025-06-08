'use server';
import connectDB from '@/config/database';
import User from '@/models/User';
import { getSessionUser } from '@/utils/getSessionUser';
import { revalidatePath } from 'next/cache';

async function bookmarkProperty(propertyId) {
  await connectDB();

  // Get the current user session
  const sessionUser = await getSessionUser();

  if (!sessionUser || !sessionUser.userId) {
    throw new Error('User not authenticated');
  }

  const { userId } = sessionUser;
  const user = await User.findById(userId);

  const isBookmarked = user.bookmarks.includes(propertyId);
  let message;
  if (isBookmarked) {
    // If the property is already bookmarked, remove it
    user.bookmarks.pull(propertyId);
    message = 'Property removed from bookmarks';
    isBookmarked = false;
  } else {
    // If the property is not bookmarked, add it
    user.bookmarks.push(propertyId);
    message = 'Property bookmarked successfully';
    isBookmarked = true;
  }
  // Save the user with updated bookmarks
  await user.save();

  // Revalidate the path to ensure the latest data is fetched
  revalidatePath('/properties/saved', 'page');

  return { message, isBookmarked };
}

export { bookmarkProperty };
