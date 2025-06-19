import connectDB from '@/config/database';
import Message from '@/models/Message';
import '@/models/Property';
import { convertToSerializeableObject } from '@/utils/convertToObject';
import { getSessionUser } from '@/utils/getSessionUser';

const MessagesPage = async () => {
  connectDB();
  const sessionUser = await getSessionUser();
  const { userId } = sessionUser;
  const readMessages = await Message.find({ recipient: userId, read: true })
    .populate('sender', 'name email')
    .populate('property', 'title location')
    .sort({ createdAt: -1 });

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
            <div className='space-y-4'></div>
            {messages.length === 0 ? (
              <p>You have no messages</p>
            ) : (
              `You have ${messages.length} message${
                messages.length > 1 ? 's' : ''
              }`
            )}
          </h1>
        </div>
      </div>
      <p>This is the messages page.</p>
    </section>
  );
};
export default MessagesPage;
