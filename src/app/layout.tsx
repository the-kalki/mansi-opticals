import type { Metadata, Viewport } from 'next';
import './globals.css';
import { ThemeProvider } from '@/components/providers/ThemeProvider';
import { ToastProvider } from '@/components/providers/ToastProvider';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { CartDrawer } from '@/components/cart/CartDrawer';
import { LensBuilderModal } from '@/components/builder/LensBuilderModal';

export const metadata: Metadata = {
  title: 'Mansi Opticals — Omnichannel Eyewear, Custom Lenses & Clinical Eye Care',
  description:
    'Experience lab-tested precision prescription glasses, titanium & acetate frames, automated contact lens subscriptions, and clinical eye exam bookings with certified optometrists.',
  keywords: [
    'eyeglasses',
    'prescription glasses',
    'custom lens builder',
    'clinical eye exam',
    'contact lens subscription',
    'titanium frames',
    'blue light protection',
    'Mansi Opticals',
  ],
  authors: [{ name: 'Mansi Opticals' }],
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#0D9488',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-slate-50 dark:bg-[#070B14] min-h-screen text-slate-900 dark:text-slate-100 flex flex-col font-sans">
        <ThemeProvider>
          <ToastProvider>
            {/* Ambient Background Gradient Mesh */}
            <div className="fixed inset-0 pointer-events-none -z-10 bg-mesh-light dark:bg-mesh-dark opacity-80" />

            {/* Global Header */}
            <Header />

            {/* Main Content Area */}
            <main className="flex-1 w-full">{children}</main>

            {/* Global Modals & Drawers */}
            <CartDrawer />
            <LensBuilderModal />

            {/* Global Footer */}
            <Footer />
          </ToastProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
