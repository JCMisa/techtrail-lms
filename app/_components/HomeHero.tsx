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
        <h1 className="my-4 text-3xl md:text-4xl text-light-100 opacity-75 font-bold leading-tight text-center md:text-left">
          Ready to Level Up? Start Your{" "}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#7A1CAC] via-[#AD49E1] to-[#1caca7]">
            TechTrail{" "}
          </span>
          Today
        </h1>
        <p className="leading-normal text-base md:text-xl mb-8 text-center md:text-left">
          Master tech, one step at a time. TechTrail offers tailored learning
          paths to guide you towards your tech goals.
        </p>

        <div className="flex items-center gap-5 w-full">
          <Button variant={"outline"} className="w-full">
            Learn More
          </Button>
          {/* if user is admin */}
          {loggedInUser?.role === "admin" && (
            <Link
              href={"/dashboard/admin"}
              className="w-full hover:bg-primary-200"
            >
              <Button className="w-full hover:bg-primary-200">
                Get Started
              </Button>
            </Link>
          )}

          {/* if user is teacher */}
          {loggedInUser?.role === "teacher" && (
            <Link
              href={"/dashboard/teacher"}
              className="w-full hover:bg-primary-200"
            >
              <Button className="w-full hover:bg-primary-200">
                Get Started
              </Button>
            </Link>
          )}

          {/* if user is user */}
          {loggedInUser?.role === "user" && (
            <Link
              href={"/dashboard/user"}
              className="w-full hover:bg-primary-200"
            >
              <Button className="w-full hover:bg-primary-200">
                Get Started
              </Button>
            </Link>
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
