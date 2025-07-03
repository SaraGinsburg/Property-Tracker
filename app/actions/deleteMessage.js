'use server';
import connectDB from '@/config/database';
import Message from '@/models/Message';
import { getSessionUser } from '@/utils/getSessionUser';
import { revalidatePath, revalidateTag } from 'next/cache';

async function deleteMessage(messageId, formData) {
  await connectDB();
  const sessionUser = await getSessionUser();
  if (!sessionUser || !sessionUser.userId) {
    throw new Error('User ID is required');
  }
  const { userId } = sessionUser;
  const message = await Message.findById(messageId);

  if (userId !== message.recipient.toString()) {
    throw new Error('You cannot delete a message that is not yours');
  }

  await message.deleteOne();

  revalidatePath('/messages', 'page');
}
export default deleteMessage;
