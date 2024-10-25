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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CoursesList from "./_components/CoursesList";
import ReviewersList from "./_components/ReviewersList";
import { getAllCurrentEvents } from "@/services/EventService";
import moment from "moment";

const UserDashboardPage = () => {
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

  return (
    <div>
      {loggedInUser?.role === "user" ? (
        <div className="p-4 flex gap-4 flex-col xl:flex-row">
          {/* left */}
          <div className="w-full xl:w-2/3 flex flex-col gap-8">
            <div>
              <div className="flex flex-row items-center gap-2">
                <h2 className="font-bold text-2xl">
                  Welcome! {user?.firstName} 👋🏻
                </h2>
              </div>

              <Tabs defaultValue="courses" className="w-full mt-5 bg-dark">
                <TabsList className="w-full justify-start bg-primary">
                  <TabsTrigger value="courses" className="text-light">
                    Courses
                  </TabsTrigger>
                  <TabsTrigger value="reviewers" className="text-light">
                    Reviewers
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="courses" className="p-5">
                  <CoursesList />
                </TabsContent>
                <TabsContent value="reviewers" className="p-5 pb-10 relative">
                  <ReviewersList />
                </TabsContent>
              </Tabs>
            </div>
            <LoadingDialog loading={loading} />
          </div>

          {/* right */}
          <div className="w-full xl:w-1/3 flex flex-col gap-8">
            <EventCalendar
              eventsList={currentEvents}
              canEdit={false}
              refreshData={() => {}}
            />
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
