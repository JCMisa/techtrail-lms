import Spinner from "@/components/custom/Spinner";
import { db } from "@/utils/db";
import { course } from "@/utils/schema";
import { MoreHorizontal } from "lucide-react";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

const CourseCountCard = () => {
  const [loading, setLoading] = useState(false);
  const [courseCount, setCourseCount] = useState(0);

  const getCourseCount = async () => {
    try {
      setLoading(true);
      const result = await db.select().from(course);
      if (result?.length > 0) {
        setCourseCount(result.length);
      }
    } catch {
      toast(
        <p className="text-red-500 font-bold text-sm">
          Internal Error occured while fetching courses count
        </p>
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCourseCount();
  }, []);

  return (
    <div className="rounded-2xl odd:bg-primary-100 even:bg-primary p-4 flex-1 min-w-[130px] shadow-lg">
      <div className="flex justify-between items-center">
        <span className="text-[10px] bg-dark-100 px-2 py-1 rounded-full text-primary-100">
          2024/2025
        </span>
        <MoreHorizontal width={20} height={20} />
      </div>
      <h1 className="text-2xl font-semibold my-4">
        {loading ? <Spinner /> : courseCount}
      </h1>
      <h2 className="capitalize text-sm font-medium text-gray-200">courses</h2>
    </div>
  );
};

export default CourseCountCard;
