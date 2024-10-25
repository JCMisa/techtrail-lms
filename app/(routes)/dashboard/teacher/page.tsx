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
      {loggedInUser?.role === "teacher" ? (
        <div>
          <p>Teacher Page</p>
        </div>
      ) : (
        <Unauthorized />
      )}

      <LoadingDialog loading={loading} />
    </div>
  );
};

export default TeacherDashboardPage;
