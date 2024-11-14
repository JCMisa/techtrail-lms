/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const HomeHero = ({ loggedInUser }: { loggedInUser: any }) => {
  return (
    <>
      {/* <!--Left Col--> */}
      <div className="flex flex-col w-full xl:w-2/5 justify-center lg:items-start overflow-y-hidden">
        <h1 className="my-4 text-3xl md:text-4xl text-light opacity-75 font-bold leading-tight text-center md:text-left">
          Ready to Level Up? Start Your{" "}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#0098ff] via-[#007acc] to-[#AD49E1]">
            TechTrail{" "}
          </span>
          Today
        </h1>
        <p className="leading-normal text-gray-300 md:text-lg mb-8 text-center md:text-left">
          Master tech, one step at a time. TechTrail offers tailored learning
          paths to guide you towards your tech goals.
        </p>

        <div className="flex items-center gap-5 w-full">
          <Button variant={"outline"} className="w-full">
            Learn More
          </Button>
          {/* if user is admin */}
          {loggedInUser?.role === "admin" && (
            <Button className="w-full" asChild>
              <Link href={"/dashboard/admin"}>Get Started</Link>
            </Button>
          )}

          {/* if user is teacher */}
          {loggedInUser?.role === "teacher" && (
            <Button className="w-full" asChild>
              <Link href={"/dashboard/teacher"}>Get Started</Link>
            </Button>
          )}

          {/* if user is user */}
          {loggedInUser?.role === "user" && (
            <Button className="w-full" asChild>
              <Link href={"/dashboard/user"}>Get Started</Link>
            </Button>
          )}
        </div>
      </div>

      {/* <!--Right Col--> */}
      <div className="w-full xl:w-3/5 p-12 overflow-hidden">
        <Image
          className="mx-auto w-full md:w-4/5 transform transition hover:scale-105 duration-700 ease-in-out hover:rotate-6"
          src="/mac-code.webp"
          alt="mac-svg"
          width={1000}
          height={1000}
        />
      </div>
    </>
  );
};

export default HomeHero;
