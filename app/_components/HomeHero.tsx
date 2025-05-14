/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import HomeFeatures from "./HomeFeatures";
import HomeStatistics from "./HomeStatistics";
import HomeTestimonials from "./HomeTestimonials";
import HomeContact from "./HomeContact";

const HomeHero = ({ loggedInUser }: { loggedInUser: any }) => {
  return (
    <>
      <div className="body-font flex flex-col gap-48">
        <div className="container mx-auto flex px-5 pt-44 md:flex-row flex-col items-center">
          {/* hero */}
          <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6 md:mb-0 mb-10">
            <Image
              className="mx-auto w-full md:w-4/5 transform transition hover:scale-105 duration-700 ease-in-out hover:rotate-6"
              src="/mac-code.webp"
              alt="mac-svg"
              width={1000}
              height={1000}
              loading="lazy"
              placeholder="blur"
              blurDataURL="/blur.jpg"
            />
          </div>
          <div className="lg:flex-grow md:w-1/2 lg:pl-24 md:pl-16 flex flex-col md:items-start md:text-left items-center text-center">
            <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-white">
              Ready to <span className="text-primary">Level Up</span>? Start
              Your
              <br className="hidden lg:inline-block" />
              <span className="text-primary">TechTrail </span>
              Today
            </h1>
            <p className="mb-8 leading-relaxed">
              Master tech, one step at a time. TechTrail offers tailored
              learning paths to guide you towards your tech goals.
            </p>
            <div className="flex justify-center items-center gap-3">
              <Button variant={"outline"}>Learn More</Button>
              {loggedInUser?.role === "user" && (
                <Button className="w-full" asChild>
                  <Link href={"/dashboard/user"}>Get Started</Link>
                </Button>
              )}
              {loggedInUser?.role === "teacher" && (
                <Button className="w-full" asChild>
                  <Link href={"/dashboard/teacher"}>Get Started</Link>
                </Button>
              )}
              {loggedInUser?.role === "admin" && (
                <Button className="w-full" asChild>
                  <Link href={"/dashboard/admin"}>Get Started</Link>
                </Button>
              )}
              {!loggedInUser && (
                <Button className="w-full" asChild>
                  <Link href={"/sign-in"}>Get Started</Link>
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* statistics */}
        <HomeStatistics />

        {/* features */}
        <HomeFeatures />

        {/* testimonials */}
        <HomeTestimonials />

        {/* contact */}
        <HomeContact />
      </div>
    </>
  );
};

export default HomeHero;
