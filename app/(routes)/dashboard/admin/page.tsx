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
import UserCard from "./_components/UserCard";
import RadialChart from "./_components/RadialChart";
import BarTrailChart from "./_components/BarTrailChart";
import LineTypeChart from "./_components/LineTypeChart";
import EventCalendar from "./_components/EventCalendar";
import Announcements from "./_components/Announcements";

const AdminDashboardPage = () => {
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
      {loggedInUser?.role === "admin" ? (
        <div className="p-4 flex gap-4 flex-col md:flex-row">
          {/* left */}
          <div className="w-full lg:w-2/3 flex flex-col gap-8">
            {/* user cards */}
            <div className="flex gap-4 justify-between flex-wrap">
              <UserCard type="user" />
              <UserCard type="teacher" />
              <UserCard type="admin" />
            </div>
            {/* middle charts */}
            <div className="flex gap-4 flex-col lg:flex-row">
              {/* user subscribers count chart */}
              <div className="w-full lg:w-1/3 h-[450px]">
                {/* todo: add the realtime data for the count of users who are subscribed from the database */}
                <RadialChart />
              </div>
              {/* courses difficulties count chart */}
              <div className="w-full lg:w-2/3 h-[450px]">
                {/* todo: add the realtime data for the count of courses difficulties from the database */}
                <BarTrailChart />
              </div>
            </div>
            {/* bottom chart for the count of course types created */}
            <div className="w-full h-[500px]">
              {/* todo: add the realtime data for the count of courses types from the database */}
              <LineTypeChart />
            </div>
          </div>
          {/* right */}
          <div className="w-full lg:w-1/3 flex flex-col gap-8">
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

export default AdminDashboardPage;
