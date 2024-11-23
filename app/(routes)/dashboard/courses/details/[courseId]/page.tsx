/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from "sonner";
import { db } from "@/utils/db";
import { userProgress } from "@/utils/schema";
import { eq } from "drizzle-orm";
import StudentRow from "./_components/StudentRow";

const CourseDetails = ({ params }: { params: { courseId: string } }) => {
  const [students, setStudents] = useState<any>([]);

  const getStudentsUnderThisCourse = async () => {
    try {
      const result = await db
        .select()
        .from(userProgress)
        .where(eq(userProgress.courseId, params?.courseId));

      if (result?.length > 0) {
        const studentInProgressEmails = result?.reduce(
          (acc: any, current: any) => {
            const x = acc.find(
              (item: any) => item?.userEmail === current.userEmail
            );
            if (!x) {
              return acc.concat([current]);
            } else {
              return acc;
            }
          },
          []
        );
        console.log("user emails in progress: ", studentInProgressEmails);
        setStudents(studentInProgressEmails);
      }
    } catch {
      toast(
        <p className="font-bold text-sm text-red-500">
          Internal error occured while fetching students
        </p>
      );
    }
  };

  useEffect(() => {
    getStudentsUnderThisCourse();
  }, [params?.courseId]);

  return (
    <div className="p-4">
      <h2 className="font-bold text-2xl">Course Students</h2>
      <p className="text-sm text-gray-400">
        Discover the dedicated individuals who are currently enrolled in or have
        successfully completed this course, and are paving their paths to
        success!
      </p>

      <div className="mt-5">
        <Table>
          <TableCaption>A list of students taking this course.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Profile</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Progress</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {students?.length > 0 &&
              students?.map((student: any) => (
                <StudentRow
                  key={student?.id}
                  userEmail={student?.userEmail}
                  courseId={params?.courseId}
                  userId={student?.userId}
                  refreshData={() => getStudentsUnderThisCourse()}
                />
              ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default CourseDetails;
