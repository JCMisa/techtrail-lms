/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { Input } from "@/components/ui/input";
import { findUserByEmail } from "@/services/UserService";
import { UserButton, useUser } from "@clerk/nextjs";
import { Megaphone, MessageCircleMore, Search } from "lucide-react";
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

  useEffect(() => {
    user && getUserByEmail();
  }, [user]);

  return (
    <div className="flex items-center justify-between p-4">
      {/* search bar */}
      <div className="hidden md:flex items-center px-4 bg-dark rounded-lg ring-[1.5px] ring-primary-100">
        <Search className="w-5 h-5" />
        <Input
          placeholder="Search..."
          type="text"
          className="border-none bg-transparent w-[200px] p-2 outline-none"
        />
      </div>

      {/* icons and user */}
      <div className="flex items-center gap-6 justify-end w-full">
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

        <div className="flex flex-col">
          <span className="text-xs leading-3 font-medium">
            {user?.fullName}
          </span>
          <span className="text-[10px] text-gray-400 text-right">
            {loggedInUser?.role.toUpperCase()}
          </span>
        </div>
        <UserButton />
      </div>
    </div>
  );
};

export default Navbar;