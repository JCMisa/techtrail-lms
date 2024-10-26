/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { findUserByEmail } from "@/services/UserService";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import CurrentAnnouncements from "./_components/NonAdminAnnouncementsPage/CurrentAnnouncements";
import UpcommingAnnouncements from "./_components/NonAdminAnnouncementsPage/UpcommingAnnouncements";
import ExpiredAnnouncements from "./_components/NonAdminAnnouncementsPage/ExpiredAnnouncements";
import { ArrowLeftCircle } from "lucide-react";
import AddAnnouncement from "./_components/AddAnnouncement";
import {
  getAllAnnouncements,
  getCurrentAnnouncements,
  getExpiredAnnouncements,
  getUpcommingAnnouncements,
} from "@/services/AnnouncementService";
import moment from "moment";
import CurrentAnnouncementList from "./_components/CurrentAnnouncementList";
import UpcommingAnnouncementList from "./_components/UpcommingAnnouncementList";
import PastAnnouncementList from "./_components/PastAnnouncementList";
import AllAnnouncementList from "./_components/AllAnnouncementList";

const AnnouncementsPage = () => {
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
  const [allAnnouncements, setAllAnnouncements] = useState<any>([]);
  const [currentAnnouncementList, setCurrentAnnouncementList] = useState<any>(
    []
  );
  const [pastAnnouncementList, setPastAnnouncementList] = useState<any>([]);
  const [upcommingAnnouncementList, setUpcommingAnnouncementList] =
    useState<any>([]);

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

  const getCurrentAnnouncementsList = async () => {
    setLoading(true);
    try {
      const result = await getCurrentAnnouncements(
        moment().format("MM-DD-YYYY")
      );
      if (result) {
        setCurrentAnnouncementList(result?.data);
      }
    } catch (error) {
      toast(
        <p className="font-bold text-sm text-red-500">
          Internal error occured while fetching current announcements
        </p>
      );
    } finally {
      setLoading(false);
    }
  };

  const getExpiredAnnouncementsList = async () => {
    setLoading(true);
    try {
      const result = await getExpiredAnnouncements(
        moment().format("MM-DD-YYYY")
      );
      if (result) {
        setPastAnnouncementList(result?.data);
      }
    } catch (error) {
      toast(
        <p className="font-bold text-sm text-red-500">
          Internal error occured while fetching past announcements
        </p>
      );
    } finally {
      setLoading(false);
    }
  };

  const getUpcommingAnnouncementsList = async () => {
    setLoading(true);
    try {
      const result = await getUpcommingAnnouncements(
        moment().format("MM-DD-YYYY")
      );
      if (result) {
        setUpcommingAnnouncementList(result?.data);
      }
    } catch (error) {
      toast(
        <p className="font-bold text-sm text-red-500">
          Internal error occured while fetching upcoming announcements
        </p>
      );
    } finally {
      setLoading(false);
    }
  };

  const getAnnouncementsList = async () => {
    setLoading(true);
    try {
      const result = await getAllAnnouncements();
      if (result) {
        setAllAnnouncements(result?.data);
      }
    } catch (error) {
      toast(
        <p className="font-bold text-sm text-red-500">
          Internal error occured while fetching all announcements
        </p>
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAnnouncementsList();
    getCurrentAnnouncementsList();
    getExpiredAnnouncementsList();
    getUpcommingAnnouncementsList();
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
              <h1 className="text-2xl font-bold">Manage Announcements</h1>
            </div>
            <div className="bg-primary rounded-full w-10 h-10 p-3 flex items-center justify-center cursor-pointer">
              <AddAnnouncement
                refreshData={() => {
                  getAnnouncementsList();
                  getCurrentAnnouncementsList();
                  getExpiredAnnouncementsList();
                  getUpcommingAnnouncementsList();
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
                  <CurrentAnnouncementList
                    announcementList={currentAnnouncementList}
                    refreshData={() => getCurrentAnnouncementsList()}
                  />
                </div>
              </div>

              {/* upcoming events */}
              <div className="my-10 shadow-lg p-5 min-h-[40rem] max-h-[40rem] overflow-auto card-scroll">
                <div className="">
                  <UpcommingAnnouncementList
                    announcementList={upcommingAnnouncementList}
                    refreshData={() => getUpcommingAnnouncementsList()}
                  />
                </div>
              </div>

              {/* past events */}
              <div className="my-10 shadow-lg p-5 min-h-[40rem] max-h-[40rem] overflow-auto card-scroll">
                <div className="">
                  <PastAnnouncementList
                    announcementList={pastAnnouncementList}
                    refreshData={() => getExpiredAnnouncementsList()}
                  />
                </div>
              </div>
            </div>
            {/* all list */}
            <div className="col-span-2">
              <div className="my-10 shadow-lg p-5 min-h-[132.5rem] max-h-[132.5rem] overflow-auto card-scroll">
                <div className="">
                  <AllAnnouncementList
                    announcementList={allAnnouncements}
                    refreshData={() => {
                      getAnnouncementsList();
                      getCurrentAnnouncementsList();
                      getExpiredAnnouncementsList();
                      getUpcommingAnnouncementsList();
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="p-5 flex flex-col gap-10">
          <CurrentAnnouncements />
          <UpcommingAnnouncements />
          <ExpiredAnnouncements />
        </div>
      )}
    </div>
  );
};

export default AnnouncementsPage;
