/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import LoadingDialog from "@/app/_components/LoadingDialog";
import { Button } from "@/components/ui/button";
import { findUserByEmail } from "@/services/UserService";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import Unauthorized from "../_components/Unauthorized";
import EventCalendar from "../admin/_components/EventCalendar";
import Announcements from "../admin/_components/Announcements";

const UserDashboardPage = () => {
  const { user } = useUser();
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState<{
    id: number;
    email: string;
    firstname: string;
    lastname: string;
    imageUrl: string;
    createdAt: string;
    role: string;
  }>();

  const getUserByEmail = async () => {
    setLoading(true);
    try {
      const result = await findUserByEmail(
        user?.primaryEmailAddress?.emailAddress as string
      );
      if (result) {
        setLoggedInUser(result?.data);
      }
    } catch (error) {
      toast(
        <p className="text-sm font-bold text-red-500">
          Internal error occured while fetching the user
        </p>
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    user && getUserByEmail();
  }, [user]);

  return (
    <div>
      {loggedInUser?.role === "user" ? (
        <div className="p-4 flex gap-4 flex-col xl:flex-row">
          {/* left */}
          <div className="w-full xl:w-2/3">
            <div className="h-full bg-dark-100 p-4 rounded-md">
              <div className="flex flex-col gap-1">
                <h1 className="text-3xl">
                  Welcome!{" "}
                  <span className="text-primary-100 font-semibold">
                    {user?.firstName}
                  </span>{" "}
                  👋🏻
                </h1>
                <p className="text-xs text-gray-400">
                  Check and manage your TechTrail courses
                </p>
              </div>
            </div>
          </div>

          {/* right */}
          <div className="w-full xl:w-1/3 flex flex-col gap-8">
            <EventCalendar />
            <Announcements />
          </div>
        </div>
      ) : (
        <Unauthorized />
      )}

      <LoadingDialog loading={loading} />
    </div>
  );
};

export default UserDashboardPage;