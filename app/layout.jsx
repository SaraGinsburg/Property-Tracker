import Navbar from '@/components/Navbar';
import '@/assets/styles/globals.css';
export const metadata = {
  title: 'Property Tracker',
  keywords: 'rental, property, crown heights, real estate',
  description: 'Find a suitable rental property',
};
const MainLayout = ({ children }) => {
  return (
    <html>
      <body>
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
};

export default MainLayout;
