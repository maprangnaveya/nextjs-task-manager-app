import '@/app/ui/global.css';
import { roboto } from '@/app/ui/fonts';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${roboto.className} antialiased`}>
        <div
          className={
            'flex min-h-screen justify-center bg-purple-100 p-6 md:p-0 lg:p-0'
          }
        >
          {children}
        </div>
      </body>
    </html>
  );
}
