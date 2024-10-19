import Image from "next/image";
import Link from "next/link";
import React from "react";
import Menu from "./_components/Menu";
import Navbar from "./_components/Navbar";

const DashboardLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="h-screen flex">
      {/* left */}
      <div className="w-[14%] md:w-[8%] lg:w-[16%] xl:w-[14%] p-4">
        {/* logo */}
        <Link
          href={"/"}
          className="flex items-center gap-2 justify-center lg:justify-start"
        >
          <Image
            src={"/techtrail-logo.svg"}
            alt="logo"
            width={20}
            height={20}
          />
          <p className="lg:flex items-center text-light-100 no-underline hover:no-underline font-bold text-lg lg:text-xl hidden">
            Tech
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#7A1CAC] via-[#AD49E1] to-[#1caca7]">
              Trail
            </span>
          </p>
        </Link>

        {/* menu list */}
        <Menu />
      </div>

      {/* right */}
      <div className="w-[86%] md:w-[92%] lg:w-[84%] xl:w-[86%] bg-dark-100 overflow-scroll dashboard-card-scroll">
        <Navbar />
        {children}
      </div>
    </div>
  );
};

export default DashboardLayout;
