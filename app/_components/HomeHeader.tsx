import Spinner from "@/components/custom/Spinner";
import { Button } from "@/components/ui/button";
import { ClerkLoaded, ClerkLoading, UserButton, useUser } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const HomeHeader = () => {
  const { user } = useUser();

  return (
    <header className="text-gray-400 bg-dark-100 body-font">
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <Link
          href={"/"}
          className="flex title-font font-medium items-center text-white mb-4 md:mb-0 cursor-pointer"
        >
          <Image
            src={"/techtrail-logo.svg"}
            alt="logo"
            width={1000}
            height={1000}
            className="w-8 h-8"
          />
          <p className="ml-3 text-xl logo-text">TechTrail</p>
        </Link>
        <nav className="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center">
          <a className="mr-5 hover:text-white cursor-pointer" href="#top">
            Home
          </a>
          <a className="mr-5 hover:text-white cursor-pointer" href="#guide">
            Guide
          </a>
          <a
            className="mr-5 hover:text-white cursor-pointer"
            href="#testimonial"
          >
            Testimonial
          </a>
          <a className="mr-5 hover:text-white cursor-pointer" href="#contact">
            Contact
          </a>
        </nav>
        {user ? (
          <div className="flex items-center gap-3">
            <ClerkLoading>
              <Spinner />
            </ClerkLoading>
            <ClerkLoaded>
              <UserButton />
              <div className="flex flex-col">
                <p className="text-md">{user && user?.fullName}</p>
                <span className="text-xs text-gray-400">
                  {user && user?.primaryEmailAddress?.emailAddress}
                </span>
              </div>
            </ClerkLoaded>
          </div>
        ) : (
          <Button asChild>
            <Link href={"/sign-in"} className="min-w-32 max-w-32">
              Sign in
            </Link>
          </Button>
        )}
      </div>
    </header>
  );
};

export default HomeHeader;
