import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '../ui/components/styles/globals.css';
import { AppProvider } from '@/contexts/AppContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Bar Cometa - Sistema de Pedidos',
  description: 'Sistema de gestión de pedidos de cerveza',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <AppProvider>
          {children}
        </AppProvider>
      </body>
    </html>
  );
}