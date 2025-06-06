"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import Menu from "./_components/Menu";
import Navbar from "./_components/Navbar";
import { UserInputContext } from "./course/_context/UserInputContext";
import { Button } from "@/components/ui/button";
import { Brain } from "lucide-react";
import { UserSubscriptionContext } from "@/app/_context/UserSubscriptionContext";
import { TotalUsageContext } from "@/app/_context/TotalUsageContext";

const DashboardLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const [userCourseInput, setUserCourseInput] = useState([]);
  const [userSubscription, setUserSubscription] = useState(false);
  const [totalUsage, setTotalUsage] = useState(0);

  return (
    <>
      <UserSubscriptionContext.Provider
        value={{ userSubscription, setUserSubscription }}
      >
        <TotalUsageContext.Provider value={{ totalUsage, setTotalUsage }}>
          <UserInputContext.Provider
            value={{ userCourseInput, setUserCourseInput }}
          >
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
                    loading="lazy"
                    placeholder="blur"
                    blurDataURL="/blur.jpg"
                  />
                  <p className="lg:flex items-center text-light-100 no-underline hover:no-underline font-bold text-lg lg:text-xl hidden">
                    Tech
                    <span className="logo-text">Trail</span>
                  </p>
                </Link>

                {/* menu list */}
                <Menu />
              </div>

              {/* right */}
              <div className="w-[86%] md:w-[92%] lg:w-[84%] xl:w-[86%] bg-dark-100 overflow-scroll dashboard-card-scroll">
                <Navbar />
                {children}
                <Link href={"/dashboard/course/review"}>
                  <Button className="absolute bottom-5 right-5 rounded-full w-14 h-14">
                    <Brain />
                  </Button>
                </Link>
              </div>
            </div>
          </UserInputContext.Provider>
        </TotalUsageContext.Provider>
      </UserSubscriptionContext.Provider>
    </>
  );
};

export default DashboardLayout;
