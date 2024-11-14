/* eslint-disable @typescript-eslint/no-explicit-any */
import Spinner from "@/components/custom/Spinner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { db } from "@/utils/db";
import { chapter } from "@/utils/schema";
import { and, eq } from "drizzle-orm";
import { Pencil } from "lucide-react";
import React, { useState } from "react";
import { toast } from "sonner";

interface ChapterTitpleFormProps {
  initialData: {
    title: string;
  };
  courseId: string;
  chapterId: string;
  refreshData: () => void;
}

const ChapterTitleForm = ({
  initialData,
  courseId,
  chapterId,
  refreshData,
}: ChapterTitpleFormProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [updatedTitle, setUpdatedTitle] = useState<any>();
  const [loading, setLoading] = useState(false);

  const toggleEdit = () => setIsEditing((current) => !current);

  const onSubmit = async () => {
    setLoading(true);
    try {
      const result = await db
        .update(chapter)
        .set({
          title: updatedTitle,
        })
        .where(
          and(eq(chapter?.chapterId, chapterId), eq(chapter.courseId, courseId))
        );

      if (result) {
        toast(
          <p className="font-bold text-sm text-green-500">
            Chapter title updated successfully
          </p>
        );
        refreshData();
        setIsEditing(false);
      }
    } catch {
      toast(
        <p className="font-bold text-sm text-red-500">
          Internal error occured while updating chapter title
        </p>
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-6 border bg-dark rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        <p>Chapter Title</p>
        <Button onClick={toggleEdit} variant="ghost">
          {isEditing ? (
            "Cancel"
          ) : (
            <>
              <Pencil className="h-4 w-4 mr-2" /> Edit chapter title
            </>
          )}
        </Button>
      </div>
      {!isEditing ? (
        <p className="text-xs mt-2">{initialData?.title}</p>
      ) : (
        <div className="space-y-4 mt-4 flex flex-col">
          <div className="flex flex-col gap-1">
            <p className="text-xs text-gray-500">Chapter title</p>
            <Input
              placeholder="e.g. 'Introduction to the course'"
              onChange={(e) => setUpdatedTitle(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-x-2">
            <Button disabled={updatedTitle === ""} onClick={() => onSubmit()}>
              {loading ? <Spinner /> : "Save"}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChapterTitleForm;
