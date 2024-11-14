/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useContext, useEffect, useState } from "react";
import { UserInputContext } from "../_context/UserInputContext";
import {
  courseCategories,
  premiumCourseCategories,
} from "@/utils/CategoryList";
import { UserSubscriptionContext } from "@/app/_context/UserSubscriptionContext";
import { useUser } from "@clerk/nextjs";
import { findUserByEmail } from "@/services/UserService";
import { toast } from "sonner";

const SelectCategory = () => {
  const { user } = useUser();

  const { userCourseInput, setUserCourseInput } = useContext(UserInputContext);
  const { userSubscription } = useContext(UserSubscriptionContext);

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
    } catch {
      toast(
        <p className="text-sm font-bold text-red-500">
          Internal error occured while fetching the user
        </p>
      );
    }
  };

  useEffect(() => {
    user && getUserByEmail();
  }, [user]);

  const handleCategoryChange = (category: string) => {
    // passing the category as an element inside the context array
    setUserCourseInput((prev: any) => ({
      ...prev,
      category: category,
    }));
  };

  return (
    <div className="px-10 md:px-20">
      <h2 className="text-sm">Select course category</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 mt-5">
        {/* change to premiumCourseCategories if user is subscribed to premium */}
        {userSubscription || loggedInUser?.role === "admin"
          ? premiumCourseCategories.map((item, index) => (
              <div
                onClick={() => handleCategoryChange(item.name)}
                className={`flex flex-col p-5 border items-center bg-dark shadow-lg rounded-xl cursor-pointer hover:border-primary hover:scale-110 transition-all ${
                  userCourseInput?.category == item.name &&
                  "border-primary scale-125"
                }`}
                key={item.id || index}
              >
                {item.icon}
                <h2>{item.name}</h2>
              </div>
            ))
          : courseCategories.map((item, index) => (
              <div
                onClick={() => handleCategoryChange(item.name)}
                className={`flex flex-col p-5 border items-center bg-dark shadow-lg rounded-xl cursor-pointer hover:border-primary hover:scale-110 transition-all ${
                  userCourseInput?.category == item.name &&
                  "border-primary scale-125"
                }`}
                key={item.id || index}
              >
                {item.icon}
                <h2>{item.name}</h2>
              </div>
            ))}
      </div>
    </div>
  );
};

export default SelectCategory;
