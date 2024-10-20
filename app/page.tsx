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
import moment from "moment";

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
        moment().format("MM-DD-YYYY"),
        "user"
      );
  }, [user]);

  return (
    <div>
      <div className="leading-normal tracking-normal text-light bg-cover bg-fixed gradient-header">
        <div className="h-full">
          {/* <!--Nav--> */}
          <HomeHeader />

          {/* <!--Main--> */}
          <div className="container pt-24 md:pt-36 mx-auto flex flex-wrap flex-col md:flex-row items-center px-5">
            <HomeHero loggedInUser={userLoggedIn} />

            {/* <!--Footer--> */}
            <HomeFooter />
          </div>
        </div>
      </div>
      <LoadingDialog loading={loading} />
    </div>
  );
}
