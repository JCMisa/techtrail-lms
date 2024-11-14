import { Button } from "@/components/ui/button";
import { UserButton, useUser } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

const HomeHeader = () => {
  const { user, isSignedIn } = useUser();
  const router = useRouter();

  return (
    <div className="w-full container mx-auto px-5">
      <div className="w-full flex items-center justify-between pt-3">
        <div className="flex items-center gap-2">
          <Image
            src={"/techtrail-logo.svg"}
            alt="logo"
            width={1000}
            height={1000}
            className="w-8 h-8"
          />
          <Link
            className="flex items-center text-light no-underline hover:no-underline font-bold text-xl lg:text-2xl"
            href="/"
          >
            Tech
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#0098ff] via-[#007acc] to-[#AD49E1]">
              Trail
            </span>
          </Link>
        </div>

        <div className="flex w-1/2 justify-end content-center">
          {isSignedIn ? (
            <div className="flex items-center gap-1">
              <UserButton />
              <div className="hidden sm:flex flex-col">
                <p className="text-light-100 text-sm">{user?.fullName}</p>
                <p className="text-gray-500 text-xs">
                  {user?.primaryEmailAddress?.emailAddress}
                </p>
              </div>
            </div>
          ) : (
            <Button onClick={() => router.push("/sign-in")}>Sign-in</Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomeHeader;
