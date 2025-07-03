'use server';
import connectDB from '@/config/database';
import Message from '@/models/Message';
import { getSessionUser } from '@/utils/getSessionUser';
import { revalidatePath } from 'next/cache';

async function markMessageAsRead(messageId) {
  await connectDB();

  // Get the current user session
  const sessionUser = await getSessionUser();

  if (!sessionUser || !sessionUser.userId) {
    throw new Error('Message not authenticated');
  }

  const { userId } = sessionUser;
  // Find the message by ID and ensure it belongs to the user
  const message = await Message.findById(messageId);
  if (!message) {
    throw new Error('Message not found');
  }
  if (message.recipient.toString() !== userId) {
    throw new Error('You do not have permission to mark this message as read');
  }

  message.read = !message.read; // Toggle the read status
  revalidatePath('/messages', 'page');
  await message.save();

  return message.read;
}
export default markMessageAsRead;
