export { default } from 'next-auth/middleware';

// middleware.js
import { withAuth } from 'next-auth/middleware';

// export default withAuth({
//   // Optional: add custom logic or callbacks here
// });

export const config = {
  matcher: ['/properties/add', '/profile', '/properties/saved', '/messages'],
};
