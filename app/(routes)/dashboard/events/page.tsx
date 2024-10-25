/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { ArrowLeftCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import EventList from "./_components/EventList";
import { findUserByEmail } from "@/services/UserService";
import { useUser } from "@clerk/nextjs";
import { toast } from "sonner";
import Unauthorized from "../_components/Unauthorized";
import AddEvent from "./_components/AddEvent";

const EventsPage = () => {
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
    <div className="p-5">
      {loggedInUser?.role === "admin" ? (
        <>
          <div className="flex flex-row items-center justify-between">
            <div className="flex flex-row gap-2 items-center">
              <ArrowLeftCircle
                className="cursor-pointer"
                onClick={() => router.back()}
              />
              <h1 className="text-2xl font-bold">Manage Events</h1>
            </div>

            <div className="w-10 h-10 bg-primary rounded-full p-3 flex items-center justify-center cursor-pointer">
              <AddEvent refreshData={() => {}} />
            </div>
          </div>

          <div className="flex flex-col gap-5 mt-10">
            {/* current events */}
            <div className="my-10">
              <h2 className="text-xl font-semibold text-gray-500">
                Current Events
              </h2>
              <div className="">
                <EventList date="current" />
              </div>
            </div>

            {/* upcoming events */}
            <div className="my-10">
              <h2 className="text-xl font-semibold text-gray-500">
                Upcoming Events
              </h2>
              <div className="">
                <EventList date="upcoming" />
              </div>
            </div>

            {/* past events */}
            <div className="my-10">
              <h2 className="text-xl font-semibold text-gray-500">
                Past Events
              </h2>
              <div className="">
                <EventList date="expired" />
              </div>
            </div>
          </div>
        </>
      ) : (
        <Unauthorized />
      )}
    </div>
  );
};

export default EventsPage;
