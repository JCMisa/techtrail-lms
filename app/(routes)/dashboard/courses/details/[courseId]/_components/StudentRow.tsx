/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { TableCell, TableRow } from "@/components/ui/table";
import { findUserByEmail } from "@/services/UserService";
import Image from "next/image";
import CourseProgress from "@/components/custom/CourseProgress";
import { toast } from "sonner";
import { db } from "@/utils/db";
import { certificate, course, userProgress } from "@/utils/schema";
import { eq } from "drizzle-orm";
import { getProgress } from "@/actions/get-progress";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Trash } from "lucide-react";

const StudentRow = ({
  userEmail,
  courseId,
  userId,
  refreshData,
}: {
  userEmail: string;
  courseId: string;
  userId: string;
  refreshData: () => void;
}) => {
  const [student, setStudent] = useState<any>();
  const [progressCount, setProgressCount] = useState<number>(0);

  const getStudentInfo = async () => {
    try {
      const user = await findUserByEmail(userEmail);
      if (user?.data) {
        setStudent(user?.data);
      }
    } catch (error) {
      console.log("get user info error: ", error);
    }
  };

  useEffect(() => {
    getStudentInfo();
  }, [userEmail]);

  const getCourse = async () => {
    try {
      const result = await db
        .select()
        .from(course)
        .where(eq(course.courseId, courseId));

      if (result) {
        setProgressCount(await getProgress(userId, result[0]?.courseId));
      }
    } catch {
      toast(
        <p className="font-bold text-sm text-red-500">
          Internal error occured while fetching course
        </p>
      );
    }
  };

  useEffect(() => {
    getCourse();
  }, [courseId]);

  const handleDelete = async () => {
    try {
      const deleteProgress = await db
        .delete(userProgress)
        .where(eq(userProgress.userEmail, userEmail));
      if (deleteProgress) {
        const deleteCertificate = await db
          .delete(certificate)
          .where(eq(certificate.userEmail, userEmail));
        if (deleteCertificate) {
          toast(
            <p className="font-bold text-sm text-green-500">
              Student&apos;s progress deleted successfully
            </p>
          );
          refreshData();
        }
      }
    } catch {
      toast(
        <p className="font-bold text-sm text-red-500">
          Internal error occured while deleting student&apos; progress
        </p>
      );
    }
  };

  return (
    <TableRow>
      <TableCell className="font-medium">
        {student ? (
          <Image
            src={student?.imageUrl as string}
            alt="profile"
            width={1000}
            height={1000}
            className="w-10 h-10 rounded-full"
          />
        ) : (
          <Image
            src={"/empty-img-placeholder.jpg"}
            alt="profile"
            width={1000}
            height={1000}
            className="w-10 h-10 rounded-full"
          />
        )}
      </TableCell>
      <TableCell>
        {student?.firstname} {student?.lastname}
      </TableCell>
      <TableCell>{userEmail}</TableCell>
      <TableCell>
        <CourseProgress
          variant={progressCount === 100 ? "success" : "default"}
          value={progressCount}
        />
      </TableCell>
      <TableCell className="text-right">
        <AlertDialog>
          <AlertDialogTrigger>
            <Trash className="w-5 h-5 cursor-pointer text-red-500 hover:text-red-600 transition-all" />
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete
                student&apos;s progress and remove related data from our
                servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={() => handleDelete()}>
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </TableCell>
    </TableRow>
  );
};

export default StudentRow;
