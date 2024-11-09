import CourseCard from "@/components/custom/CourseCard";
import { db } from "@/utils/db";
import { course, purchase, userProgress } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import { and, eq, isNull } from "drizzle-orm";
import { toast } from "sonner";
import React, { useEffect, useState } from "react";
import UserCourseCard from "./UserCourseCard";
import SkeletonCard from "./SkeletonCard";
import { LoaderCircle } from "lucide-react";

const UserCoursesList = () => {
  const { user } = useUser();

  const [loading, setLoading] = useState(false);
  const [userCourses, setUserCourses] = useState<[] | any>([]);
  const [freeCourses, setfreeCourses] = useState<[] | any>([]);

  const getUserCourses = async () => {
    try {
      setLoading(true);

      const result = await db
        .select()
        .from(purchase)
        .where(eq(purchase.userId, user?.id as string));

      if (result) {
        setUserCourses(result);
      }
    } catch {
      toast(
        <p className="font-bold text-sm text-red-500">
          Internal error occured while fetching your courses
        </p>
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    user && getUserCourses();
  }, [user]);

  const getFreeCourses = async () => {
    try {
      const result = await db
        .select()
        .from(course)
        .where(and(isNull(course.price), eq(course.isPublished, true)));

      if (result) {
        setfreeCourses(result);
        console.log("free courses: ", result);
      }
    } catch {
      toast(
        <p className="font-bold text-sm text-red-500">
          Internal error occured while fetching your courses
        </p>
      );
    }
  };

  useEffect(() => {
    getFreeCourses();
  }, []);

  return (
    <>
      {loading ? (
        <div className="text-center flex items-center justify-center w-full">
          <LoaderCircle className="w-10 h-10 animate-spin" />
        </div>
      ) : (
        <>
          <div className="flex flex-col gap-2 my-3 mb-10">
            <h2 className="text-lg font-semibold">Purchased Courses</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
              {userCourses?.length > 0 &&
                userCourses?.map((item: any) => (
                  <UserCourseCard courseId={item?.courseId} key={item?.id} />
                ))}
            </div>
          </div>

          <div className="flex flex-col gap-2 my-3">
            <h2 className="text-lg font-semibold">Free Courses</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
              {freeCourses?.length > 0 &&
                freeCourses?.map((item: any) => (
                  <UserCourseCard courseId={item?.courseId} key={item?.id} />
                ))}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default UserCoursesList;
