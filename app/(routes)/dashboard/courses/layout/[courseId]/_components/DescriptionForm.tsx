/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { db } from "@/utils/db";
import { course } from "@/utils/schema";
import { eq } from "drizzle-orm";
import { LoaderCircle, Pencil } from "lucide-react";
import React, { useState } from "react";
import { toast } from "sonner";

interface DescriptionFormProps {
  initialData: {
    description: string;
  };
  courseId: string;
  refreshData: () => void;
}

const DescriptionForm = ({
  initialData,
  courseId,
  refreshData,
}: DescriptionFormProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [updatedDescription, setUpdatedDescription] = useState<any>();
  const [loading, setLoading] = useState(false);

  const toggleEdit = () => setIsEditing((current) => !current);

  const onSubmit = async () => {
    setLoading(true);
    try {
      const result = await db
        .update(course)
        .set({
          description: updatedDescription,
        })
        .where(eq(course?.courseId, courseId));

      if (result) {
        toast(
          <p className="font-bold text-sm text-green-500">
            Course description updated successfully
          </p>
        );
        refreshData();
        setIsEditing(false);
      }
    } catch {
      toast(
        <p className="font-bold text-sm text-red-500">
          Internal error occured while updating description
        </p>
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-6 border bg-dark rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        <p>Course Description</p>
        <Button onClick={toggleEdit} variant="ghost">
          {isEditing ? (
            "Cancel"
          ) : (
            <>
              <Pencil className="h-4 w-4 mr-2" /> Edit Description
            </>
          )}
        </Button>
      </div>
      {!isEditing ? (
        <p
          className={cn(
            "text-xs mt-2",
            !initialData?.description && "text-slate-500 italic"
          )}
        >
          {initialData?.description
            ? initialData?.description
            : "No description"}
        </p>
      ) : (
        <div className="space-y-4 mt-4 flex flex-col">
          <div className="flex flex-col gap-1">
            <p className="text-xs text-gray-500">Course description</p>
            <Textarea
              placeholder="Provide more information about your course"
              onChange={(e) => setUpdatedDescription(e.target.value)}
            />
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

export default DescriptionForm;
