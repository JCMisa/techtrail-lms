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

const TeacherDashboardPage = () => {
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
      {loggedInUser?.role === "teacher" ? (
        <div>
          <p>Teacher Page</p>
        </div>
      ) : (
        <div className="bg-cover bg-fixed unauthorized-error h-screen bg-no-repeat bg-center flex items-center justify-center text-center relative overflow-hidden">
          <div className="absolute bottom-5 overflow-hidden flex flex-col gap-2 px-10">
            <h1 className="text-6xl font-bold text-red-600">UNAUTHORIZED</h1>
            <p className="text-lg">
              Access denied. You don&apos;t have permission to view this
              content. Please ensure you&apos;tre logged in with the correct
              credentials or contact our support team for assistance.
            </p>
            <Button onClick={() => router.back()}>Go Back</Button>
          </div>
        </div>
      )}

      <LoadingDialog loading={loading} />
    </div>
  );
};

export default TeacherDashboardPage;
