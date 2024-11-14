import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/formatCurrency";
import axios from "axios";
import React, { useState } from "react";
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
import Spinner from "@/components/custom/Spinner";

const CourseEnrollButton = ({
  courseId,
  price,
  courseName,
}: {
  courseId: string;
  price: number;
  courseName: string;
}) => {
  const [loading, setLoading] = useState(false);

  const onClick = async () => {
    try {
      setLoading(true);

      const response = await axios.post(
        `/viewCourse/courses/${courseId}/checkout`
      );
      window.location.assign(response.data.url);
    } catch {
      toast(
        <p className="font-bold text-sm text-red-500">Something went wrong</p>
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <Button disabled={loading} className="w-full md:w-auto" size={"sm"}>
          {loading ? (
            <Spinner />
          ) : (
            `Enroll for ${formatCurrency(price ? price : 0)}`
          )}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you absolutely sure to buy this course?
          </AlertDialogTitle>
          <AlertDialogDescription>
            You&apos;re about to purchase {courseName} for{" "}
            {formatCurrency(price)}. This purchase is final and non-refundable.
            Please review the course details before confirming.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={onClick}>
            {loading ? <Spinner /> : "Proceed"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default CourseEnrollButton;
