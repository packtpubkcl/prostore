import Header from '@/components/shared/header';
import Footer from '@/components/footer';
import '@/assets/styles/globals.css';
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-screen flex-col">
      <Header></Header>
      <main className="wrapper flex-1">{children}</main>
      <Footer />
    </div>
  );
}
