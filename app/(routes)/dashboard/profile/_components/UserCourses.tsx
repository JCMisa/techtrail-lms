/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-explicit-any */
import Empty from "@/app/_components/Empty";
import { db } from "@/utils/db";
import { userProgress } from "@/utils/schema";
import { eq } from "drizzle-orm";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import UserCourseCard from "./UserCourseCard";

const UserCourses = ({ user }: { user: any }) => {
  const [userCourses, setUserCourses] = useState<any>([]);

  const getUserCourses = async () => {
    try {
      const result = await db
        .select()
        .from(userProgress)
        .where(
          eq(
            userProgress.userEmail,
            user?.primaryEmailAddress?.emailAddress as string
          )
        );

      if (result?.length > 0) {
        // this will remove all duplicates from userProgress based on courseId
        const userCoursesInProgress = result?.reduce(
          (acc: any, current: any) => {
            const x = acc.find(
              (item: any) => item?.courseId === current.courseId
            );
            if (!x) {
              return acc.concat([current]);
            } else {
              return acc;
            }
          },
          []
        );

        setUserCourses(userCoursesInProgress);
      }
    } catch {
      toast(
        <p className="text-sm font-bold text-red-500">
          Internal error occured while fetching user courses
        </p>
      );
    }
  };

  useEffect(() => {
    user && getUserCourses();
  }, [user]);

  return (
    <>
      <h2 className="text-lg font-bold">Courses in Progress</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
        {userCourses?.length > 0 ? (
          userCourses?.map((course: any) => (
            <div key={course?.id}>
              <UserCourseCard purchasedCourse={course} user={user} />
            </div>
          ))
        ) : (
          <div className="flex items-center justify-center">
            <Empty
              header="You have no courses"
              subheader="Please wait while we fetch necessary data to show"
            />
          </div>
        )}
      </div>
    </>
  );
};

export default UserCourses;
