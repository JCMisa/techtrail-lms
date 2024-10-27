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
import { getAllCurrentEvents } from "@/services/EventService";
import moment from "moment";
import EventCalendar from "../admin/_components/EventCalendar";
import Announcements from "../admin/_components/Announcements";
import { getAllLatestAnnouncements } from "@/services/AnnouncementService";
import Analytics from "./_components/Analytics";

const TeacherDashboardPage = () => {
  const { user } = useUser();
  const router = useRouter();

  const [currentEvents, setCurrentEvents] = useState([]);
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
  const [latestAnnouncements, setLatestAnnouncements] = useState([]);

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

  const getCurrentEvents = async () => {
    try {
      const result = await getAllCurrentEvents(moment().format("MM-DD-YYYY"));
      if (result) {
        setCurrentEvents(result?.data);
      }
    } catch (error) {
      toast(
        <p className="font-bold text-sm text-red-500">
          Internal error occured while fetching events
        </p>
      );
    }
  };

  useEffect(() => {
    getCurrentEvents();
  }, []);

  const getLatestAnnouncements = async () => {
    try {
      const result = await getAllLatestAnnouncements(5);
      if (result) {
        setLatestAnnouncements(result?.data);
      }
    } catch (error) {
      toast(
        <p className="font-bold text-sm text-red-500">
          Internal error occured while fetching latest announcements
        </p>
      );
    }
  };

  useEffect(() => {
    getLatestAnnouncements();
  }, []);

  return (
    <div>
      {loggedInUser?.role === "teacher" ? (
        <div className="p-4 flex gap-4 flex-col xl:flex-row">
          {/* left */}
          <div className="w-full xl:w-2/3 flex flex-col gap-8">
            <h2 className="font-bold text-2xl">
              Welcome! Teacher {user?.firstName} 👋🏻
            </h2>

            <Analytics />
          </div>

          {/* right */}
          <div className="w-full xl:w-1/3 flex flex-col gap-8">
            <EventCalendar
              eventsList={currentEvents}
              canEdit={false}
              refreshData={() => {}}
            />
            <Announcements
              announcementList={latestAnnouncements}
              refreshData={() => getLatestAnnouncements()}
              canEdit={false}
            />
          </div>
        </div>
      ) : (
        <Unauthorized />
      )}

      <LoadingDialog loading={loading} />
    </div>
  );
};

export default TeacherDashboardPage;
