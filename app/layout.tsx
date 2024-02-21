import '@/app/ui/global.css';
import { roboto } from '@/app/ui/fonts';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${roboto.className} flex min-h-screen select-none justify-center bg-purple-100 p-0 antialiased`}
      >
        <main className="flex min-h-full w-full flex-col rounded-xl bg-purple-50 px-10 pb-10 md:w-3/5 lg:w-1/2">
          {children}
        </main>
      </body>
    </html>
  );
}
