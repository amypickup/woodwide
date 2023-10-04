import CookingNavbar from "../components/CookingNavbar";
import Footer from "../components/Footer";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <CookingNavbar />
      {children}
      <Footer />
    </>
  );
}
