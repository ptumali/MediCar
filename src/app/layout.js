import './globals.css';

export const metadata = {
  title: 'Medi-Car',
  description: 'Car Diagnosis Web App'
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-white text-black min-h-screen">
        {children}
      </body>
    </html>
  );
}
