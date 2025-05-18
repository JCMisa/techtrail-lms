/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { db } from "@/utils/db";
import { course, purchase } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import { and, eq, isNull, or } from "drizzle-orm";
import React, { useEffect, useState } from "react";
import UserCourseCard from "./UserCourseCard";
import Empty from "@/app/_components/Empty";
import Spinner from "@/components/custom/Spinner";

const UserCoursesList = () => {
  const { user } = useUser();

  const [loading, setLoading] = useState(false);
  const [userCourses, setUserCourses] = useState<[] | any>([]);
  const [freeCourses, setfreeCourses] = useState<[] | any>([]);

  const getUserCourses = async () => {
    setLoading(true);

    const result = await db
      .select()
      .from(purchase)
      .where(eq(purchase.userId, user?.id as string));

    if (result) {
      setUserCourses(result);
      setLoading(false);
    }
  };

  useEffect(() => {
    user && getUserCourses();
  }, [user]);

  const getFreeCourses = async () => {
    const result = await db
      .select()
      .from(course)
      .where(
        or(
          eq(course.price, "0"),
          and(isNull(course.price), eq(course.isPublished, true))
        )
      );

    if (result) {
      setfreeCourses(result);
      console.log("free courses: ", result);
    }
  };

  useEffect(() => {
    getFreeCourses();
  }, []);

  return (
    <>
      {loading ? (
        <div className="text-center flex items-center justify-center w-full">
          <Spinner />
        </div>
      ) : (
        <>
          <div className="flex flex-col gap-2 my-3 mb-10">
            <h2 className="text-lg font-semibold">Purchased Courses</h2>

            {userCourses?.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                {userCourses?.map((item: any) => (
                  <UserCourseCard courseId={item?.courseId} key={item?.id} />
                ))}
              </div>
            ) : (
              <Empty
                header="No Purchased Courses"
                subheader="You have no purchased courses yet. Please buy a course first"
              />
            )}
          </div>

          <div className="flex flex-col gap-2 my-3">
            <h2 className="text-lg font-semibold">Free Courses</h2>

            {freeCourses?.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                {freeCourses?.map((item: any) => (
                  <UserCourseCard courseId={item?.courseId} key={item?.id} />
                ))}
              </div>
            ) : (
              <Empty
                header="No Free Courses"
                subheader="Please wait for any free courses to be available"
              />
            )}
          </div>
        </>
      )}
    </>
  );
};

export default UserCoursesList;
