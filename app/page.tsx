/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useUser } from "@clerk/nextjs";
import HomeFooter from "./_components/HomeFooter";
import HomeHeader from "./_components/HomeHeader";
import HomeHero from "./_components/HomeHero";
import LoadingDialog from "./_components/LoadingDialog";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { addUser, findUserByEmail } from "@/services/UserService";
import { format } from "date-fns";
import Link from "next/link";
import { ArrowUp } from "lucide-react";

export default function Home() {
  const { user } = useUser();

  const [loading, setLoading] = useState(false);
  const [userLoggedIn, setUserLoggedIn] = useState();

  const addUserToDb = async (
    userEmail: string,
    userFirstname: string,
    userLastname: string,
    userImg: string,
    userCreatedAt: string,
    userRole: string
  ) => {
    setLoading(true);
    try {
      const result1 = await findUserByEmail(
        user?.primaryEmailAddress?.emailAddress as string
      );
      if (result1?.data == null) {
        const result2 = await addUser(
          userEmail,
          userFirstname,
          userLastname,
          userImg,
          userCreatedAt,
          userRole
        );
        if (result2) {
          toast(
            <p className="text-sm font-bold text-green-500">
              User saved successfully
            </p>
          );
          setUserLoggedIn(result2?.data);
        }
      } else {
        setUserLoggedIn(result1?.data);
        return;
      }
    } catch (error) {
      toast(
        <p className="text-sm font-bold text-red-500">
          Internal error occured while saving the user
        </p>
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    user &&
      addUserToDb(
        user?.primaryEmailAddress?.emailAddress as string,
        user?.firstName as string,
        user?.lastName as string,
        user?.imageUrl as string,
        format(new Date(), "MM-dd-yyyy"),
        "user"
      );
  }, [user]);

  return (
    <div className="relative">
      <HomeHeader />
      <HomeHero loggedInUser={userLoggedIn} />
      <HomeFooter />
      <Link
        href={"#top"}
        className="cursor-pointer p-3 rounded-full bg-primary hover:bg-primary-100 transition-all fixed bottom-5 right-5"
      >
        <ArrowUp className="w-5 h-5" />
      </Link>
      <LoadingDialog loading={loading} />
    </div>
  );
}
