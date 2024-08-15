import Footer from "@/components/main/Footer";
import Navbar from "@/components/main/Navbar";
import React from "react";

function SearchLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex items-center w-full h-full">
      <Navbar />
      <div className="relative w-full h-full">
        {children}
        <Footer />
      </div>
    </div>
  );
}

export default SearchLayout;
