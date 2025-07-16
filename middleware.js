export { default } from 'next-auth/middleware';
import { withAuth } from 'next-auth/middleware';
export const config = {
  matcher: ['/properties/add', '/profile', '/properties/saved', '/messages'],
};
