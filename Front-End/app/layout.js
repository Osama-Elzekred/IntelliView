import { Inter } from 'next/font/google';
import './globals.css';
import Head from 'next/head';
import CustomHead from './components/head';
import Script from 'next/script';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <CustomHead />
      <body>{children}</body>

      <Script src="/js/jquery.min.js"></Script>
      <Script src="/js/bootstrap.bundle.min.js"></Script>
      <Script src="/js/isotope.pkgd.min.js"></Script>
      <Script src="/js/stickyfill.min.js"></Script>
      <Script src="/js/jquery.fancybox.min.js"></Script>
      <Script src="/js/jquery.easing.1.3.js"></Script>
      <Script src="/js/jquery.waypoints.min.js"></Script>
      <Script src="/js/jquery.animateNumber.min.js"></Script>
      <Script src="/js/owl.carousel.min.js"></Script>
      <Script src="/js/quill.min.js"></Script>
      <Script src="/js/bootstrap-select.min.js"></Script>
      <Script src="/js/custom.js"></Script>
    </html>
  );
}
