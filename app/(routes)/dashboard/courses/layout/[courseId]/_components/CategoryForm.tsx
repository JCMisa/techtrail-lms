/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { db } from "@/utils/db";
import { category, course } from "@/utils/schema";
import { eq } from "drizzle-orm";
import { Pencil } from "lucide-react";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface CategoryFormProps {
  initialData: any;
  courseId: string;
  refreshData: () => void;
  options: any;
}

const CategoryForm = ({
  initialData,
  courseId,
  refreshData,
  options,
}: CategoryFormProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [categoryLabel, setCategoryLabel] = useState<string>();

  const toggleEdit = () => setIsEditing((current) => !current);

  const onSubmit = async (selectedCategory: any) => {
    try {
      const result = await db
        .update(course)
        .set({
          categoryId: selectedCategory,
        })
        .where(eq(course?.courseId, courseId));

      if (result) {
        toast(
          <p className="font-bold text-sm text-green-500">
            Course category updated successfully
          </p>
        );
        refreshData();
        setIsEditing(false);
      }
    } catch {
      toast(
        <p className="font-bold text-sm text-red-500">
          Internal error occured while updating category
        </p>
      );
    }
  };

  const getCategoryLabel = async () => {
    try {
      const result = await db
        .select()
        .from(category)
        .where(eq(category?.id, initialData?.categoryId));
      if (result) {
        setCategoryLabel(result[0].name as string);
      }
    } catch {
      toast(
        <p className="font-bold text-sm text-red-500">
          Internal error occured while fetching category label
        </p>
      );
    }
  };

  useEffect(() => {
    getCategoryLabel();
  }, [initialData?.categoryId]);

  return (
    <div className="mt-6 border bg-dark rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        <p>Course Category</p>
        <Button onClick={toggleEdit} variant="ghost">
          {isEditing ? (
            "Cancel"
          ) : (
            <>
              <Pencil className="h-4 w-4 mr-2" /> Edit Category
            </>
          )}
        </Button>
      </div>
      {!isEditing ? (
        <p
          className={cn(
            "text-xs mt-2",
            !initialData?.categoryId && "text-slate-500 italic"
          )}
        >
          {categoryLabel || "No category"}
        </p>
      ) : (
        <div className="space-y-4 mt-4 flex flex-col">
          {/* select category */}
          <Select
            onValueChange={(value) => onSubmit(value)}
            defaultValue={initialData?.categoryId}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Theme" />
            </SelectTrigger>
            <SelectContent>
              {options &&
                options?.map((option: any) => (
                  <SelectItem key={option?.id} value={option?.id}>
                    {option?.name}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>
        </div>
      )}
    </div>
  );
};

export default CategoryForm;
