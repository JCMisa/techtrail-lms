/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Unauthorized from "@/app/(routes)/dashboard/_components/Unauthorized";
import LoadingDialog from "@/app/_components/LoadingDialog";
import { db } from "@/utils/db";
import { course } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import { eq } from "drizzle-orm";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

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

  const getCourse = async () => {
    try {
      setLoading(true);

      const result = await db
        .select()
        .from(course)
        .where(eq(course.courseId, params?.courseId));

      if (result) {
        setCourseRecord(result[0]);
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
    <div>
      {children} <LoadingDialog loading={loading} />
    </div>
  );
};

export default ViewCourseLayout;
