import "./globals.css";

export const metadata = {
  title: "Panari Resort Booking System",
  description: "A simple booking system for Panari Resort",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
