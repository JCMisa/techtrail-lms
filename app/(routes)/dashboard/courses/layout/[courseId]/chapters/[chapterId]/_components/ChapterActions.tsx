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
import { chapter } from "@/utils/schema";
import { and, eq } from "drizzle-orm";
import { useRouter } from "next/navigation";

interface ChapterActionsProps {
  disabled: boolean;
  courseId: string;
  chapterId: string;
  isPublished: boolean;
  refreshData: () => void;
}

const ChapterActions = ({
  disabled,
  courseId,
  chapterId,
  isPublished,
  refreshData,
}: ChapterActionsProps) => {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    try {
      setLoading(true);

      const result = await db
        .delete(chapter)
        .where(
          and(eq(chapter.courseId, courseId), eq(chapter.chapterId, chapterId))
        );

      if (result) {
        toast(
          <p className="font-bold text-sm text-green-500">
            Chapter deleted successfully
          </p>
        );
        router.replace(`/dashboard/courses/layout/${courseId}`);
      }
    } catch {
      toast(
        <p className="font-bold text-sm text-red-500">
          Internal error occured while deleting chapter
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
          .update(chapter)
          .set({
            isPublished: false,
          })
          .where(
            and(
              eq(chapter.courseId, courseId),
              eq(chapter.chapterId, chapterId)
            )
          );

        if (resultUnpublish) {
          toast(
            <p className="font-bold text-sm text-green-500">
              Chapter unpublished successfully
            </p>
          );
          refreshData();
        }
      } else {
        const resultPublish = await db
          .update(chapter)
          .set({
            isPublished: true,
          })
          .where(
            and(
              eq(chapter.courseId, courseId),
              eq(chapter.chapterId, chapterId)
            )
          );

        if (resultPublish) {
          toast(
            <p className="font-bold text-sm text-green-500">
              Chapter published successfully
            </p>
          );
          refreshData();
        }
      }
    } catch {
      toast(
        <p className="font-bold text-sm text-red-500">
          Internal error occured while publishing chapter
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
              chapter and remove related data from our servers.
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

export default ChapterActions;
