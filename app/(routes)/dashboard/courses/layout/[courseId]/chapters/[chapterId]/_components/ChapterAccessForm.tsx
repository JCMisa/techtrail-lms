/* eslint-disable @typescript-eslint/no-explicit-any */
import { Preview } from "@/components/custom/preview";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { db } from "@/utils/db";
import { chapter } from "@/utils/schema";
import { and, eq } from "drizzle-orm";
import { LoaderCircle, Pencil } from "lucide-react";
import React, { useState } from "react";
import { toast } from "sonner";
import { Checkbox } from "@/components/ui/checkbox";

interface ChapterAccessFormProps {
  initialData: any;
  courseId: string;
  chapterId: string;
  refreshData: () => void;
}

const ChapterAccessForm = ({
  initialData,
  courseId,
  chapterId,
  refreshData,
}: ChapterAccessFormProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [updatedAccess, setUpdatedAccess] = useState<boolean>();
  const [loading, setLoading] = useState(false);

  const toggleEdit = () => setIsEditing((current) => !current);

  const onSubmit = async (value: any) => {
    setLoading(true);
    try {
      const result = await db
        .update(chapter)
        .set({
          isFree: value,
        })
        .where(
          and(eq(chapter?.courseId, courseId), eq(chapter.chapterId, chapterId))
        );
      if (result) {
        toast(
          <p className="font-bold text-sm text-green-500">
            Chapter access updated successfully
          </p>
        );
        refreshData();
        setIsEditing(false);
      }
    } catch {
      toast(
        <p className="font-bold text-sm text-red-500">
          Internal error occured while updating chapter access
        </p>
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-6 border bg-dark rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        <p>Chapter Access</p>
        <Button onClick={toggleEdit} variant="ghost">
          {isEditing ? (
            "Cancel"
          ) : (
            <>
              <Pencil className="h-4 w-4 mr-2" /> Edit Chapter Access
            </>
          )}
        </Button>
      </div>
      {!isEditing ? (
        <p
          className={cn(
            "text-xs mt-2",
            !initialData?.isFree && "text-slate-500 italic"
          )}
        >
          {initialData?.isFree ? (
            <>This chapter is free for preview.</>
          ) : (
            <>This chapter is not free</>
          )}
        </p>
      ) : (
        <div className="space-y-4 mt-4 flex flex-col">
          <div className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
            <Checkbox
              checked={initialData && initialData?.isFree}
              onCheckedChange={(value) => onSubmit(value)}
            />
            <div className="space-y-1 leading-none">
              <p className="text-xs italic text-gray-500">
                Check this box if you want to make this chapter free for preview
              </p>
            </div>
          </div>
          {/* <div className="flex items-center gap-x-2">
            <Button onClick={() => onSubmit()}>
              {loading ? <LoaderCircle className="animate-spin" /> : "Save"}
            </Button>
          </div> */}
        </div>
      )}
    </div>
  );
};

export default ChapterAccessForm;
