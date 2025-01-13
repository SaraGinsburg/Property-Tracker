import '@/assets/styles/globals.css';
export const metadata = {
  title: 'Property Track',
  keywords: 'rental, property, crown heights, real estate',
  description: 'Find a suitable rental property',
};
const MainLayout = ({ children }) => {
  return (
    <html>
      <body>
        <main>{children}</main>
      </body>
    </html>
  );
};

export default MainLayout;
