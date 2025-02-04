import '@/styles/globals.css';

import { TailwindIndicator } from '@/components/tailwind-indicator';
import { ThemeProvider } from '@/components/theme-provider';
import { MetadataUpdater } from '@/lib/dynamicMetadata';
import { fontRoboto, fontSatoshi } from '@/lib/fonts';
import { cn } from '@/lib/utils';
import { locales } from '@/navigation';
import { Metadata, Viewport } from 'next';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import { Toaster } from 'react-hot-toast';

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
};

interface RootLayoutProps {
  children: React.ReactNode;
  params: { locale: string };
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params: { locale },
}: Omit<RootLayoutProps, 'children'>) {
  const t = await getTranslations({ locale, namespace: 'metadata' });

  const metadata: Metadata = {
    title: {
      default: t('title'),
      template: `%s - ${t('title')}`,
    },
    description: t('description'),
    manifest: '/manifest-dark.webmanifest',
    icons: {
      icon: '/favicon-dark.ico',
    },
  };

  return metadata;
}

export default async function RootLayout({
  children,
  params: { locale },
}: RootLayoutProps) {
  unstable_setRequestLocale(locale);

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <meta
          name='viewport'
          content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0'
        />
      </head>
      <body
        className={cn(
          'min-h-screen bg-background font-satoshi antialiased',
          fontSatoshi.variable,
          fontRoboto.variable
        )}
      >
        <ThemeProvider
          attribute='class'
          defaultTheme='dark'
          // enableSystem={false}
        >
          {children}
          <Toaster />
          <MetadataUpdater />
        </ThemeProvider>
        <TailwindIndicator />
      </body>
    </html>
  );
}
