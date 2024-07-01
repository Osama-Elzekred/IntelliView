import { Inter } from 'next/font/google';
import './globals.css';
import Head from 'next/head';
import CustomHead from './components/head';
import Script from 'next/script';
import ToastProvider from './components/Toast/ToastContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Intelliview - AI-Powered Mock Interviews',
  description:
    'Intelliview helps you prepare for job interviews with AI-driven mock interview sessions, detailed analysis, and personalized feedback.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <CustomHead />
      <body>
        {' '}
        <ToastProvider>{children}</ToastProvider>
      </body>
    </html>
  );
}
