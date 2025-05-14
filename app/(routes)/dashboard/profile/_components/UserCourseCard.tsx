/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { getProgress } from "@/actions/get-progress";
import CourseProgress from "@/components/custom/CourseProgress";
import { db } from "@/utils/db";
import { certificate, course, purchase, userProgress } from "@/utils/schema";
import { and, eq } from "drizzle-orm";
import { BookOpen, Trash } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
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

const UserCourseCard = ({
  purchasedCourse,
  user,
  refreshData,
}: {
  purchasedCourse: any;
  user: any;
  refreshData: () => void;
}) => {
  const router = useRouter();

  const [courseInfo, setCourseInfo] = useState<any>();
  const [progressCount, setProgressCount] = useState<number>(0);

  const getCourseInfo = async () => {
    try {
      const result = await db
        .select()
        .from(course)
        .where(eq(course.courseId, purchasedCourse?.courseId));

      if (result) {
        setCourseInfo(result[0]);
        setProgressCount(await getProgress(user?.id, result[0]?.courseId));
      }
    } catch {
      toast(
        <p className="font-bold text-sm text-red-500">
          Internal error occured while fetching course info
        </p>
      );
    }
  };

  useEffect(() => {
    getCourseInfo();
  }, [purchasedCourse]);

  const handleDelete = async () => {
    try {
      const deleteCourseProgress = await db
        .delete(userProgress)
        .where(
          and(
            eq(userProgress.courseId, courseInfo?.courseId),
            eq(
              userProgress.userEmail,
              user?.primaryEmailAddress?.emailAddress as string
            ),
            eq(userProgress.userId, user?.id as string)
          )
        );

      if (deleteCourseProgress) {
        const deleteCourseCertificate = await db
          .delete(certificate)
          .where(
            and(
              eq(certificate.courseId, courseInfo?.courseId),
              eq(
                certificate.userEmail,
                user?.primaryEmailAddress?.emailAddress as string
              ),
              eq(certificate.userId, user?.id as string)
            )
          );

        if (deleteCourseCertificate) {
          const deleteCoursePayment = await db
            .delete(purchase)
            .where(
              and(
                eq(purchase.courseId, courseInfo?.courseId),
                eq(
                  purchase.userEmail,
                  user?.primaryEmailAddress?.emailAddress as string
                ),
                eq(purchase.userId, user?.id as string)
              )
            );

          if (deleteCoursePayment) {
            toast(
              <p className="font-bold text-sm text-green-500">
                Course progress and related data deleted successfully
              </p>
            );
            refreshData();
          }
        } else {
          return;
        }
      } else {
        return;
      }
    } catch (error) {
      toast(
        <p className="font-bold text-sm text-red-500">
          Internal error occured while deleting course progress
        </p>
      );
      console.log("Course progress delete error: ", error);
    }
  };

  return (
    <div className="p-5 rounded-lg bg-dark gap-3 relative">
      <div className="absolute bottom-1 right-2">
        <AlertDialog>
          <AlertDialogTrigger>
            <Trash className="w-5 h-5 text-red-500 cursor-pointer" />
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your
                course progress and remove related data from our servers.
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
      </div>
      <div className="flex items-start justify-between gap-5">
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-1">
            <BookOpen className="w-4 h-4 text-primary" />
            <p
              className="text-sm font-bold line-clamp-1 cursor-pointer"
              onClick={() =>
                router.push(`/viewCourse/courses/${courseInfo?.courseId}`)
              }
            >
              {courseInfo?.title}
            </p>
          </div>
          <CourseProgress
            variant={progressCount === 100 ? "success" : "default"}
            value={progressCount}
          />
        </div>
        {courseInfo?.imageUrl ? (
          <Image
            src={courseInfo?.imageUrl}
            alt="banner"
            width={1000}
            height={1000}
            className="w-10 h-10 rounded-full"
            loading="lazy"
            placeholder="blur"
            blurDataURL="/blur.jpg"
          />
        ) : (
          <Image
            src={"/empty-img-placeholder.jpg"}
            alt="banner"
            width={1000}
            height={1000}
            className="w-10 h-10 rounded-full"
            loading="lazy"
            placeholder="blur"
            blurDataURL="/blur.jpg"
          />
        )}
      </div>
    </div>
  );
};

export default UserCourseCard;
