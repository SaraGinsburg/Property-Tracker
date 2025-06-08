'use server';
import connectDB from '@/config/database';
import User from '@/models/User';
import { getSessionUser } from '@/utils/getSessionUser';

async function checkBookmarkStatus(propertyId) {
  await connectDB();

  // Get the current user session
  const sessionUser = await getSessionUser();

  if (!sessionUser || !sessionUser.userId) {
    throw new Error('User not authenticated');
  }

  const { userId } = sessionUser;
  const user = await User.findById(userId);

  // Check if the property is bookmarked
  let isBookmarked = user.bookmarks.includes(propertyId);

  return { isBookmarked };
}
export default checkBookmarkStatus;
