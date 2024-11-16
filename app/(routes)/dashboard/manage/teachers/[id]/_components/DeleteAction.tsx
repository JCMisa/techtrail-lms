/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
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
import { Trash } from "lucide-react";
import { deleteUserById } from "@/services/UserService";
import { useRouter } from "next/navigation";
import { db } from "@/utils/db";
import {
  attachment,
  chapter,
  chapterQuestion,
  course,
  purchase,
  stripeCustomer,
  subscribedUsers,
  userProgress,
} from "@/utils/schema";
import { eq } from "drizzle-orm";
import { toast } from "sonner";
import { deleteReviewerByEmail } from "@/services/AiOutputService";

const DeleteAction = ({
  teacherId,
  teacherInfo,
}: {
  teacherId: number;
  teacherInfo: any;
}) => {
  const router = useRouter();

  const handleDelete = async () => {
    try {
      const deleteAttachments = await db
        .delete(attachment)
        .where(eq(attachment.updatedBy, teacherInfo?.email as string));

      if (deleteAttachments) {
        const deleteChapters = await db
          .delete(chapter)
          .where(eq(chapter.createdBy, teacherInfo?.email as string));

        if (deleteChapters) {
          const deleteQuestions = await db
            .delete(chapterQuestion)
            .where(eq(chapterQuestion.createdBy, teacherInfo?.email as string));

          if (deleteQuestions) {
            const deleteCourse = await db
              .delete(course)
              .where(eq(course.userEmail, teacherInfo?.email as string));

            if (deleteCourse) {
              const deletePurchases = await db
                .delete(purchase)
                .where(eq(purchase.userEmail, teacherInfo?.email as string));

              if (deletePurchases) {
                const deleteStripeCustomer = await db
                  .delete(stripeCustomer)
                  .where(
                    eq(stripeCustomer.userEmail, teacherInfo?.email as string)
                  );

                if (deleteStripeCustomer) {
                  const deleteSubscription = await db
                    .delete(subscribedUsers)
                    .where(
                      eq(
                        subscribedUsers.userEmail,
                        teacherInfo?.email as string
                      )
                    );

                  if (deleteSubscription) {
                    const deleteProgress = await db
                      .delete(userProgress)
                      .where(
                        eq(userProgress.userEmail, teacherInfo?.email as string)
                      );

                    if (deleteProgress) {
                      const deleteReviewers = await deleteReviewerByEmail(
                        teacherInfo?.email as string
                      );

                      if (deleteReviewers?.data) {
                        const deleteUser = await deleteUserById(teacherId);
                        if (deleteUser) {
                          toast(
                            <p className="font-bold text-sm text-green-500">
                              User deleted successfully
                            </p>
                          );
                          router.replace("/dashboard/manage/teachers");
                        } else {
                          return;
                        }
                      } else {
                        return;
                      }
                    } else {
                      return;
                    }
                  } else {
                    return;
                  }
                } else {
                  return;
                }
              } else {
                return;
              }
            } else {
              return;
            }
          } else {
            return;
          }
        } else {
          return;
        }
      } else {
        return;
      }
    } catch (error) {
      console.log("delete user error: ", error);
      toast(
        <p className="font-bold text-sm text-red-500">
          Internal error occured while deleting the user
        </p>
      );
    }
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <Trash className="text-red-500 hover:text-red-600 transition-all w-5 h-5 cursor-pointer absolute top-5 right-5" />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the
            account and remove their data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={() => handleDelete()}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteAction;
