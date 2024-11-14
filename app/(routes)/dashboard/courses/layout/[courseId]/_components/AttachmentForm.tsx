/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { db } from "@/utils/db";
import { attachment } from "@/utils/schema";
import { File, PlusCircle, Trash } from "lucide-react";
import React, { useState } from "react";
import { toast } from "sonner";
import FileUpload from "../../../_components/FileUpload";
import moment from "moment";
import { useUser } from "@clerk/nextjs";
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
import { eq } from "drizzle-orm";
import Spinner from "@/components/custom/Spinner";

interface AttachmentFormProps {
  initialData: any;
  courseId: string;
  refreshData: () => void;
}

const AttachmentForm = ({
  initialData,
  courseId,
  refreshData,
}: AttachmentFormProps) => {
  const { user } = useUser();

  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  const toggleEdit = () => setIsEditing((current) => !current);

  const onSubmit = async (attachments: any) => {
    try {
      const result = await db.insert(attachment).values({
        name:
          attachments?.attachmentUrl &&
          attachments?.attachmentUrl?.split("/").pop(),
        url: attachments?.attachmentUrl,
        courseId: courseId,
        createdAt: moment().format("MM-DD-YYYY"),
        updatedBy: user?.primaryEmailAddress?.emailAddress,
      });

      if (result) {
        toast(
          <p className="font-bold text-sm text-green-500">
            Course attachment added successfully
          </p>
        );
        refreshData();
        setIsEditing(false);
      }
    } catch {
      toast(
        <p className="font-bold text-sm text-red-500">
          Internal error occured while inserting attachment
        </p>
      );
    }
  };

  const deleteAttachment = async (attachmentId: number) => {
    setLoading(true);
    try {
      const result = await db
        .delete(attachment)
        .where(eq(attachment.id, attachmentId));

      if (result) {
        toast(
          <p className="font-bold text-sm text-green-500">
            Course attachment deleted successfully
          </p>
        );
        refreshData();
      }
    } catch {
      toast(
        <p className="text-sm font-bold text-red-500">
          Internal error occured while deleting attachment
        </p>
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-6 border bg-dark rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        <p>Course Attachments</p>
        <Button onClick={toggleEdit} variant="ghost">
          {isEditing && "Cancel"}
          {!isEditing && (
            <>
              <PlusCircle className="h-4 w-5 mr-2" />
              Add a file
            </>
          )}
        </Button>
      </div>
      {!isEditing && (
        <>
          {initialData?.length === 0 && (
            <p className="text-xs mt-2 text-slate-500 italic">
              No Attachments yet
            </p>
          )}
          {initialData?.length > 0 && (
            <div className="space-y-2">
              {initialData?.map((attachment: any) => (
                <div
                  key={attachment?.id}
                  className="flex items-center p-3 w-full bg-dark-100 border-dark-100 text-light-100 rounded-md"
                >
                  <File className="h-4 w-4 mr-2 flex-shrink-0" />
                  <p className="text-xs line-clamp-1 mr-2">
                    {attachment?.name}
                  </p>
                  <AlertDialog>
                    <AlertDialogTrigger>
                      <Trash className="h-4 w-4 text-red-500 hover:text-red-600 cursor-pointer" />
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Are you absolutely sure?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently
                          delete your attachment from our servers.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => deleteAttachment(attachment?.id)}
                        >
                          {loading ? <Spinner /> : "Continue"}
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              ))}
            </div>
          )}
        </>
      )}
      {isEditing && (
        <div>
          <FileUpload
            endpoint="courseAttachment"
            onChange={(url) => {
              if (url) {
                onSubmit({ attachmentUrl: url });
              }
            }}
          />
          <div className="text-xs text-muted-foreground mt-4">
            Add anything your students might need to complete the course.
          </div>
        </div>
      )}
    </div>
  );
};

export default AttachmentForm;
