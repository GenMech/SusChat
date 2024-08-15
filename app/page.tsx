import Footer from "@/components/main/Footer";
import HomeDiv from "@/components/main/HomeDiv";
import HomeNavbar from "@/components/main/HomeNavbar";

export default function Home() {
  return (
    <main className="relative flex flex-col items-center justify-center w-full h-full">
      <HomeNavbar />
      <HomeDiv />
      <Footer />
    </main>
  );
}
