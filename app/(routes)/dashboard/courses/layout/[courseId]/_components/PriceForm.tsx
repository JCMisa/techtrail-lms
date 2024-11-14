/* eslint-disable @typescript-eslint/no-explicit-any */
import Spinner from "@/components/custom/Spinner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { formatCurrency } from "@/lib/formatCurrency";
import { cn } from "@/lib/utils";
import { db } from "@/utils/db";
import { course } from "@/utils/schema";
import { eq } from "drizzle-orm";
import { Pencil } from "lucide-react";
import React, { useState } from "react";
import { toast } from "sonner";

interface PriceFormProps {
  initialData: any;
  courseId: string;
  refreshData: () => void;
}

const PriceForm = ({ initialData, courseId, refreshData }: PriceFormProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [updatedPrice, setUpdatedPrice] = useState<any>();
  const [loading, setLoading] = useState(false);

  const toggleEdit = () => setIsEditing((current) => !current);

  const onSubmit = async () => {
    setLoading(true);
    try {
      const result = await db
        .update(course)
        .set({
          price: updatedPrice,
        })
        .where(eq(course?.courseId, courseId));

      if (result) {
        toast(
          <p className="font-bold text-sm text-green-500">
            Course price updated successfully
          </p>
        );
        refreshData();
        setIsEditing(false);
      }
    } catch {
      toast(
        <p className="font-bold text-sm text-red-500">
          Internal error occured while updating price
        </p>
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-6 border bg-dark rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        <p>Course Price</p>
        <Button onClick={toggleEdit} variant="ghost">
          {isEditing ? (
            "Cancel"
          ) : (
            <>
              <Pencil className="h-4 w-4 mr-2" /> Edit Price
            </>
          )}
        </Button>
      </div>
      {!isEditing ? (
        <p
          className={cn(
            "text-xs mt-2",
            !initialData?.price && "text-slate-500 italic"
          )}
        >
          {initialData?.price
            ? formatCurrency(initialData?.price)
            : formatCurrency(0)}
        </p>
      ) : (
        <div className="space-y-4 mt-4 flex flex-col">
          <div className="flex flex-col gap-1">
            <p className="text-xs text-gray-500">Course price</p>
            <Input
              type="number"
              step={"0.01"}
              placeholder="Set a price for your course"
              onChange={(e) => setUpdatedPrice(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-x-2">
            <Button disabled={updatedPrice === ""} onClick={() => onSubmit()}>
              {loading ? <Spinner /> : "Save"}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PriceForm;
