import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/utils/authOptions';

//utility to get user from session
export const getSessionUser = async () => {
  const session = await getServerSession(authOptions);
  console.log('session', session);
  if (!session || !session.user) {
    return null;
  }

  return {
    user: session.user,
    userId: session.user.id,
  };
};
