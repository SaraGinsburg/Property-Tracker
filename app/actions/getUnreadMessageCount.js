'use server';
import connectDB from '@/config/database';
import Message from '@/models/Message';
import { getSessionUser } from '@/utils/getSessionUser';

async function getUnreadMessageCount() {
  await connectDB();

  // Get the current user session
  const sessionUser = await getSessionUser();

  if (!sessionUser || !sessionUser.userId) {
    return { error: 'User ID is required' };
  }

  const { userId } = sessionUser;

  // Count unread messages for the user
  const count = await Message.countDocuments({
    recipient: userId,
    read: false,
  });
  return { count };
}
export default getUnreadMessageCount;
