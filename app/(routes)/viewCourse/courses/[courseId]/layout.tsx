/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { getProgress } from "@/actions/get-progress";
import Unauthorized from "@/app/(routes)/dashboard/_components/Unauthorized";
import LoadingDialog from "@/app/_components/LoadingDialog";
import { db } from "@/utils/db";
import { course } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import { eq } from "drizzle-orm";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import CourseSidebar from "./_components/CourseSidebar";
import CourseNavbar from "./_components/CourseNavbar";

const ViewCourseLayout = ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { courseId: string };
}) => {
  const { user } = useUser();

  const [loading, setLoading] = useState(false);
  const [courseRecord, setCourseRecord] = useState<any>();
  const [progressCount, setProgressCount] = useState<number>(0);

  const getCourse = async () => {
    try {
      setLoading(true);

      const result = await db
        .select()
        .from(course)
        .where(eq(course.courseId, params?.courseId));

      if (result) {
        setCourseRecord(result[0]);
        setProgressCount(await getProgress(user?.id, courseRecord?.courseId));
      }
    } catch {
      toast(
        <p className="font-bold text-sm text-red-500">
          Internal error occured while fetching course
        </p>
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCourse();
  }, [params?.courseId]);

  if (!user) {
    return <Unauthorized />;
  }

  return (
    <div className="h-full">
      <div className="h-[89px] md:pl-80 fixed inset-y-0 w-full z-50">
        <CourseNavbar course={courseRecord} progressCount={progressCount} />
      </div>
      <div className="hidden md:flex h-full w-80 flex-col fixed inset-y-0 z-50">
        <CourseSidebar course={courseRecord} progressCount={progressCount} />
      </div>
      <main className="md:pl-80 pt-[89px] h-full">{children}</main>
      <LoadingDialog loading={loading} />
    </div>
  );
};

export default ViewCourseLayout;
