/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { ArrowLeftCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { findUserByEmail } from "@/services/UserService";
import { useUser } from "@clerk/nextjs";
import { toast } from "sonner";
import {
  getAllCurrentEvents,
  getAllEvents,
  getAllExpiredEvents,
  getAllUpcomingEvents,
} from "@/services/EventService";
import moment from "moment";
import CurrentEventList from "./_components/CurrentEventList";
import PastEventsList from "./_components/PastEventsList";
import UpcomingEventsList from "./_components/UpcomingEventsList";
import AddEvent from "./_components/AddEvent";
import AllEventsList from "./_components/AllEventsList";
import CurrentEvents from "./_components/NonAdminEventsPage/CurrentEvents";
import UpcommingEvents from "./_components/NonAdminEventsPage/UpcommingEvents";
import ExpiredEvents from "./_components/NonAdminEventsPage/ExpiredEvents";

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
  const [allEvents, setAllEvents] = useState<any>([]);
  const [currentEventList, setCurrentEventList] = useState<any>([]);
  const [pastEventList, setPastEventList] = useState<any>([]);
  const [upcommingEventList, setUpcommingEventList] = useState<any>([]);

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
    setLoading(true);
    try {
      const result = await getAllCurrentEvents(moment().format("MM-DD-YYYY"));
      if (result) {
        setCurrentEventList(result?.data);
      }
    } catch (error) {
      toast(
        <p className="font-bold text-sm text-red-500">
          Internal error occured while fetching current events
        </p>
      );
    } finally {
      setLoading(false);
    }
  };

  const getExpiredEvents = async () => {
    setLoading(true);
    try {
      const result = await getAllExpiredEvents(moment().format("MM-DD-YYYY"));
      if (result) {
        setPastEventList(result?.data);
      }
    } catch (error) {
      toast(
        <p className="font-bold text-sm text-red-500">
          Internal error occured while fetching past events
        </p>
      );
    } finally {
      setLoading(false);
    }
  };

  const getUpcommingEvents = async () => {
    setLoading(true);
    try {
      const result = await getAllUpcomingEvents(moment().format("MM-DD-YYYY"));
      if (result) {
        setUpcommingEventList(result?.data);
      }
    } catch (error) {
      toast(
        <p className="font-bold text-sm text-red-500">
          Internal error occured while fetching upcoming events
        </p>
      );
    } finally {
      setLoading(false);
    }
  };

  const getEvents = async () => {
    setLoading(true);
    try {
      const result = await getAllEvents();
      if (result) {
        setAllEvents(result?.data);
      }
    } catch (error) {
      toast(
        <p className="font-bold text-sm text-red-500">
          Internal error occured while fetching all events
        </p>
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getEvents();
    getCurrentEvents();
    getExpiredEvents();
    getUpcommingEvents();
  }, []);

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
            <div className="bg-primary rounded-full w-10 h-10 p-3 flex items-center justify-center cursor-pointer">
              <AddEvent
                refreshData={() => {
                  getEvents();
                  getCurrentEvents();
                  getUpcommingEvents();
                  getExpiredEvents();
                }}
              />
            </div>
          </div>

          {/* table list */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* separated list */}
            <div className="flex flex-col gap-5">
              {/* current events */}
              <div className="my-10 shadow-lg p-5 min-h-[40rem] max-h-[40rem] overflow-auto card-scroll">
                <div className="">
                  <CurrentEventList
                    eventList={currentEventList}
                    refreshData={() => getCurrentEvents()}
                  />
                </div>
              </div>

              {/* upcoming events */}
              <div className="my-10 shadow-lg p-5 min-h-[40rem] max-h-[40rem] overflow-auto card-scroll">
                <div className="">
                  <UpcomingEventsList
                    eventList={upcommingEventList}
                    refreshData={() => getUpcommingEvents()}
                  />
                </div>
              </div>

              {/* past events */}
              <div className="my-10 shadow-lg p-5 min-h-[40rem] max-h-[40rem] overflow-auto card-scroll">
                <div className="">
                  <PastEventsList
                    eventList={pastEventList}
                    refreshData={() => getExpiredEvents()}
                  />
                </div>
              </div>
            </div>
            {/* all list */}
            <div className="col-span-2">
              <div className="my-10 shadow-lg p-5 min-h-[132.5rem] max-h-[132.5rem] overflow-auto card-scroll">
                <div className="">
                  <AllEventsList
                    eventList={allEvents}
                    refreshData={() => {
                      getEvents();
                      getCurrentEvents();
                      getUpcommingEvents();
                      getExpiredEvents();
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="p-5 flex flex-col gap-10">
          <CurrentEvents />
          <UpcommingEvents />
          <ExpiredEvents />
        </div>
      )}
    </div>
  );
};

export default EventsPage;
