import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AuthProvider from '@/components/AuthProvider';
import { GlobalProvider } from '@/context/GlobalContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '@/assets/styles/globals.css';
import 'photoswipe/dist/photoswipe.css';

export const metadata = {
  title: 'Property Tracker',
  description: 'Find a suitable rental property',
  keywords: 'rental, property, crown heights, real estate',
  icons: {
    icon: '/favicon.ico',
    sizes: '128x128', // must be in public/
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body>
        <AuthProvider>
          <GlobalProvider>
            <Navbar />
            <main>{children}</main>
            <Footer />
            <ToastContainer />
          </GlobalProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
