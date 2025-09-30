// app/layout.tsx
import { Public_Sans } from 'next/font/google';
import './globals.css'

const publicSans = Public_Sans({ subsets: ['latin'] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={publicSans.className}>{children}</body>
    </html>
  );
}