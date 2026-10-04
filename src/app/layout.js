import './globals.css';

export const metadata = {
  title: 'ADRY TV - Premium Stories & Audio',
  description: 'ADRY TV - Mobile Responsive',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div className="mobile-wrapper">
          {children}
        </div>
      </body>
    </html>
  );
}
