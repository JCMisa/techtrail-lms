/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { db } from "@/utils/db";
import { course } from "@/utils/schema";
import { eq } from "drizzle-orm";
import { LoaderCircle, Pencil } from "lucide-react";
import React, { useState } from "react";
import { toast } from "sonner";

interface TitpleFormProps {
  initialData: {
    title: string;
  };
  courseId: string;
  refreshData: () => void;
}

const TitleForm = ({ initialData, courseId, refreshData }: TitpleFormProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [updatedTitle, setUpdatedTitle] = useState<any>();
  const [loading, setLoading] = useState(false);

  const toggleEdit = () => setIsEditing((current) => !current);

  const onSubmit = async () => {
    setLoading(true);
    try {
      const result = await db
        .update(course)
        .set({
          title: updatedTitle,
        })
        .where(eq(course?.courseId, courseId));

      if (result) {
        toast(
          <p className="font-bold text-sm text-green-500">
            Course title updated successfully
          </p>
        );
        refreshData();
        setIsEditing(false);
      }
    } catch {
      toast(
        <p className="font-bold text-sm text-red-500">
          Internal error occured while updating title
        </p>
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-6 border bg-dark rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        <p>Course Title</p>
        <Button onClick={toggleEdit} variant="ghost">
          {isEditing ? (
            "Cancel"
          ) : (
            <>
              <Pencil className="h-4 w-4 mr-2" /> Edit title
            </>
          )}
        </Button>
      </div>
      {!isEditing ? (
        <p className="text-sm mt-2">{initialData?.title}</p>
      ) : (
        <div className="space-y-4 mt-4 flex flex-col">
          <div className="flex flex-col gap-1">
            <p className="text-xs text-gray-500">Course title</p>
            <Input
              placeholder="e.g. 'Advanced web development'"
              onChange={(e) => setUpdatedTitle(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-x-2">
            <Button disabled={updatedTitle === ""} onClick={() => onSubmit()}>
              {loading ? <LoaderCircle className="animate-spin" /> : "Save"}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TitleForm;
