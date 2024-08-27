import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Suspense } from 'react';
import Loading from './loading';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <>
          <Header />
          <main className=" py-5">
            <div className="container m-auto">
              <Suspense fallback={<Loading />}>{children}</Suspense>
            </div>
          </main>
          <Footer />
        </>
      </body>
    </html>
  );
}
