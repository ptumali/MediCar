import './globals.css';

export const metadata = {
  title: 'Medi-Car',
  description: 'Car Diagnosis Web App',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
