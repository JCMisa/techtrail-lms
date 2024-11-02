/* eslint-disable @typescript-eslint/no-explicit-any */
import { Editor } from "@/components/custom/editor";
import { Preview } from "@/components/custom/preview";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { db } from "@/utils/db";
import { chapter } from "@/utils/schema";
import { and, eq } from "drizzle-orm";
import { LoaderCircle, Pencil } from "lucide-react";
import React, { useState } from "react";
import { toast } from "sonner";

interface ChapterDescriptionFormProps {
  initialData: {
    description: string;
  };
  courseId: string;
  chapterId: string;
  refreshData: () => void;
}

const ChapterDescriptionForm = ({
  initialData,
  courseId,
  chapterId,
  refreshData,
}: ChapterDescriptionFormProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [updatedDescription, setUpdatedDescription] = useState<any>();
  const [loading, setLoading] = useState(false);

  const toggleEdit = () => setIsEditing((current) => !current);

  const onSubmit = async () => {
    setLoading(true);
    try {
      const result = await db
        .update(chapter)
        .set({
          description: updatedDescription,
        })
        .where(
          and(eq(chapter?.courseId, courseId), eq(chapter.chapterId, chapterId))
        );

      if (result) {
        toast(
          <p className="font-bold text-sm text-green-500">
            Chapter description updated successfully
          </p>
        );
        refreshData();
        setIsEditing(false);
      }
    } catch {
      toast(
        <p className="font-bold text-sm text-red-500">
          Internal error occured while updating chapter description
        </p>
      );
    } finally {
      setLoading(false);
    }
  };

  const handleQuillChange = (value: string) => {
    setUpdatedDescription(value);
  };

  return (
    <div className="mt-6 border bg-dark rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        <p>Chapter Description</p>
        <Button onClick={toggleEdit} variant="ghost">
          {isEditing ? (
            "Cancel"
          ) : (
            <>
              <Pencil className="h-4 w-4 mr-2" /> Edit Chapter Description
            </>
          )}
        </Button>
      </div>
      {!isEditing ? (
        <div
          className={cn(
            "text-xs mt-2",
            !initialData?.description && "text-slate-500 italic"
          )}
        >
          {initialData?.description ? (
            <Preview value={initialData?.description} />
          ) : (
            "No description"
          )}
        </div>
      ) : (
        <div className="space-y-4 mt-4 flex flex-col">
          <div className="flex flex-col gap-1">
            <p className="text-xs text-gray-500">Chapter description</p>
            <Editor onChange={handleQuillChange} value={updatedDescription} />
          </div>
          <div className="flex items-center gap-x-2">
            <Button
              disabled={updatedDescription === ""}
              onClick={() => onSubmit()}
            >
              {loading ? <LoaderCircle className="animate-spin" /> : "Save"}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChapterDescriptionForm;
