import './globals.css';
import Header from '@/components/Header';
import Footer from '../components/Footer';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main className=" py-5">
          <div className="container m-auto">{children}</div>
        </main>
        <Footer />
      </body>
    </html>
  );
}
