import connectDB from '@/config/database';
import Message from '@/models/Message';
import '@/models/Property';
import { convertToSerializeableObject } from '@/utils/convertToObject';
import { getSessionUser } from '@/utils/getSessionUser';
import MessageCard from '@/components/MessageCard';

const MessagesPage = async () => {
  await connectDB();
  const sessionUser = await getSessionUser();
  if (!sessionUser || !sessionUser.userId) {
    return (
      <div className='text-center py-12'>
        <p className='text-lg text-customDarkGray'>
          You must be logged in to view messages.
        </p>
      </div>
    );
  }
  const { userId } = sessionUser;

  const readMessages = await Message.find({ recipient: userId, read: true })
    .populate('sender', 'name email')
    .populate('property', 'title location')
    .sort({ createdAt: -1 })
    .lean();

  const unreadMessages = await Message.find({ recipient: userId, read: false })
    .sort({ createdAt: -1 })
    .populate('sender', 'username')
    .populate('property', 'name')
    .lean();

  const messages = [...unreadMessages, ...readMessages].map((messageDoc) => {
    const message = convertToSerializeableObject(messageDoc);
    message.sender = convertToSerializeableObject(message.sender);
    message.property = convertToSerializeableObject(message.property);
    return message;
  });

  return (
    <section className='bg-customVeryLightBluePlus '>
      <div className='container m-auto py-24 max-w-6xl'>
        <div className='bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0'>
          <h1 className='text-2xl font-bold mb-4  text-customDarkGray'>
            Your Messages
          </h1>
          <div className='space-y-4'>
            {messages.length === 0 ? (
              <p>You have no messages</p>
            ) : (
              messages.map((message) => (
                <MessageCard key={message._id} message={message} />
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
export default MessagesPage;
