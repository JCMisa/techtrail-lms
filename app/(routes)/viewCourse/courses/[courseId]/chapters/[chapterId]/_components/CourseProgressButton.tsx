import Spinner from "@/components/custom/Spinner";
import { Button } from "@/components/ui/button";
import { useConfettiStore } from "@/hooks/use-confetti-store";
import { db } from "@/utils/db";
import { userProgress } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import { and, eq } from "drizzle-orm";
import { CheckCircle, XCircle } from "lucide-react";
import moment from "moment";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";

const CourseProgressButton = ({
  courseId,
  chapterId,
  nextChapterId,
  isCompleted,
  refreshData,
}: {
  courseId: string;
  chapterId: string;
  nextChapterId: string;
  isCompleted?: boolean;
  refreshData: () => void;
}) => {
  const { user } = useUser();
  const router = useRouter();
  const confetti = useConfettiStore();

  const Icon = isCompleted ? XCircle : CheckCircle;

  const [loading, setLoading] = useState(false);

  const onClick = async () => {
    try {
      setLoading(true);
      const checkIfExisting = await db
        .select()
        .from(userProgress)
        .where(
          and(
            eq(userProgress.userId, user?.id as string),
            eq(userProgress.chapterId, chapterId)
          )
        );

      // update user progress to completed if it exist, else add the record
      if (checkIfExisting?.length > 0) {
        await db
          .update(userProgress)
          .set({
            isCompleted: !isCompleted,
          })
          .where(
            and(
              eq(userProgress.userId, user?.id as string),
              eq(userProgress.chapterId, chapterId)
            )
          );
        refreshData();
      } else {
        await db.insert(userProgress).values({
          userId: user?.id,
          userEmail: user?.primaryEmailAddress?.emailAddress,
          courseId: courseId,
          chapterId: chapterId,
          isCompleted: !isCompleted,
          createdAt: moment().format("MM-DD-YYYY"),
          updatedAt: moment().format("MM-DD-YYYY"),
        });
        refreshData();
      }

      if (!isCompleted && !nextChapterId) {
        confetti.onOpen();
      }

      if (!isCompleted && nextChapterId) {
        router.push(
          `/viewCourse/courses/${courseId}/chapters/${nextChapterId}`
        );
      }

      toast(
        <p className="font-bold text-sm text-green-500">Progress Updated!</p>
      );
    } catch {
      toast(
        <p className="font-bold text-sm text-red-500">
          Internal error occured while marking as done
        </p>
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      onClick={onClick}
      disabled={loading}
      type="button"
      variant={isCompleted ? "outline" : "secondary"}
      className="w-full md:w-auto"
    >
      {loading ? (
        <Spinner />
      ) : (
        <>
          {isCompleted ? "Restart Progress" : "Mark as complete"}
          <Icon className="w-4 h-4 ml-2" />
        </>
      )}
    </Button>
  );
};

export default CourseProgressButton;
