/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import AskRoleChangeDialog from "@/components/custom/AskRoleChangeDialog";
import { Button } from "@/components/ui/button";
import { getUserRequests } from "@/services/RoleChangeService";
import { findUserByEmail } from "@/services/UserService";
import { UserButton, useUser } from "@clerk/nextjs";
import { Megaphone, MessageCircleMore } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

const Navbar = () => {
  const { user } = useUser();

  const [loggedInUser, setLoggedInUser] = useState<{
    id: number;
    email: string;
    firstname: string;
    lastname: string;
    imageUrl: string;
    createdAt: string;
    role: string;
  }>();
  const [userRequests, setUserRequests] = useState([]);

  const getUserByEmail = async () => {
    try {
      const result = await findUserByEmail(
        user?.primaryEmailAddress?.emailAddress as string
      );
      if (result) {
        setLoggedInUser(result?.data);
      }
    } catch (error) {
      toast(
        <p className="font-bold text-sm text-red-500">
          Internal error occured while fetching the user
        </p>
      );
    }
  };

  const getUserTotalRoleChangeRequests = async () => {
    try {
      const result = await getUserRequests(
        user?.primaryEmailAddress?.emailAddress as string
      );
      if (result?.data) {
        console.log("Requests found:", result.data);
        setUserRequests(result.data);
      } else {
        console.log("No requests found");
        setUserRequests([]);
      }
    } catch (error) {
      console.error("Error fetching requests:", error);
      setUserRequests([]);
      toast(
        <p className="font-bold text-sm text-red-500">
          Error fetching user requests: Unknown error
        </p>
      );
    }
  };

  useEffect(() => {
    if (user) {
      getUserByEmail();
    }
  }, [user]);

  useEffect(() => {
    getUserTotalRoleChangeRequests();
  }, []);

  return (
    <div className="flex items-center justify-between p-4 shadow-lg">
      {/* search bar */}

      {/* icons and user */}
      <div className="flex items-center gap-6 justify-end w-full">
        {loggedInUser?.role === "user" && userRequests.length < 3 ? (
          <AskRoleChangeDialog />
        ) : (
          loggedInUser?.role === "admin" && (
            <Button asChild variant={"outline"} size={"sm"}>
              <Link href="/dashboard/admin/role-change">
                Manage Role Change
              </Link>
            </Button>
          )
        )}
        <div className="flex items-center gap-3">
          <div className="bg-dark rounded-full w-7 h-7 flex items-center justify-center cursor-pointer p-2">
            <MessageCircleMore className="w-5 h-5" />
          </div>
          <div className="bg-dark rounded-full w-7 h-7 flex items-center justify-center cursor-pointer p-2 relative">
            <Megaphone className="w-5 h-5" />
            <div className="absolute -top-2 -right-1 w-4 h-4 text-xs flex items-center justify-center bg-primary-100 text-white rounded-full">
              1
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <UserButton />
          <div className="flex flex-col">
            <span className="text-xs leading-3 font-medium">
              {user?.fullName}
            </span>
            <span className="text-[10px] text-gray-400">
              {loggedInUser?.role.toUpperCase()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
