"use client";

import { Button } from "@/components/ui/button";
import { LoaderCircle, Trash } from "lucide-react";
import React, { useState } from "react";
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
import { toast } from "sonner";
import { db } from "@/utils/db";
import { chapter, course } from "@/utils/schema";
import { and, eq } from "drizzle-orm";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { useConfettiStore } from "@/hooks/use-confetti-store";

interface CourseActionsProps {
  disabled: boolean;
  courseId: string;
  isPublished: boolean;
  refreshData: () => void;
}

const CourseActions = ({
  disabled,
  courseId,
  isPublished,
  refreshData,
}: CourseActionsProps) => {
  const { user } = useUser();
  const router = useRouter();
  const confetti = useConfettiStore();

  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    try {
      setLoading(true);

      const deleteChapterResult = await db
        .delete(chapter)
        .where(eq(chapter.courseId, courseId));

      if (deleteChapterResult) {
        const deleteCourseResult = await db
          .delete(course)
          .where(
            and(
              eq(course.courseId, courseId),
              eq(
                course.userEmail,
                user?.primaryEmailAddress?.emailAddress as string
              )
            )
          );

        if (deleteCourseResult) {
          toast(
            <p className="font-bold text-sm text-green-500">
              Course deleted successfully
            </p>
          );
          router.replace(`/dashboard/courses`);
        }
      }
    } catch {
      toast(
        <p className="font-bold text-sm text-red-500">
          Internal error occured while deleting course
        </p>
      );
    } finally {
      setLoading(false);
    }
  };

  const handlePublish = async () => {
    try {
      setLoading(true);

      if (isPublished) {
        const resultUnpublish = await db
          .update(course)
          .set({
            isPublished: false,
          })
          .where(
            and(
              eq(course.courseId, courseId),
              eq(
                course.userEmail,
                user?.primaryEmailAddress?.emailAddress as string
              )
            )
          );

        if (resultUnpublish) {
          toast(
            <p className="font-bold text-sm text-green-500">
              Course unpublished successfully
            </p>
          );
          refreshData();
        }
      } else {
        const resultPublish = await db
          .update(course)
          .set({
            isPublished: true,
          })
          .where(
            and(
              eq(course.courseId, courseId),
              eq(
                course.userEmail,
                user?.primaryEmailAddress?.emailAddress as string
              )
            )
          );

        if (resultPublish) {
          toast(
            <p className="font-bold text-sm text-green-500">
              Course published successfully
            </p>
          );
          confetti.onOpen();
          refreshData();
        }
      }
    } catch {
      toast(
        <p className="font-bold text-sm text-red-500">
          Internal error occured while publishing course
        </p>
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center gap-x-2">
      <Button
        onClick={() => handlePublish()}
        disabled={disabled}
        variant={"outline"}
        size={"sm"}
      >
        {isPublished ? "Unpublish" : "Publish"}
      </Button>
      <AlertDialog>
        <AlertDialogTrigger>
          <Button size={"sm"}>
            <Trash className="h-4 w-4" />
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              course and remove related data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => handleDelete()}>
              {loading ? <LoaderCircle className="animate-spin" /> : "Continue"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default CourseActions;
