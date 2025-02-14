import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AuthProvider from '@/components/AuthProvider';

import '@/assets/styles/globals.css';
export const metadata = {
  title: 'Property Tracker',
  keywords: 'rental, property, crown heights, real estate',
  description: 'Find a suitable rental property',
};
const MainLayout = ({ children }) => {
  return (
    <AuthProvider>
      <html>
        <body>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </body>
      </html>
    </AuthProvider>
  );
};

export default MainLayout;
