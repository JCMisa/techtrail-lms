/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import { Eye, Trash } from "lucide-react";
import { useRouter } from "next/navigation";

const DropdownOption = ({
  children,
  deleteCourse,
  reviewerCourseId,
}: {
  children: any;
  deleteCourse: () => void;
  reviewerCourseId: number;
}) => {
  const router = useRouter();
  const [openAlert, setOpenAlert] = useState(false);

  const deleteConfirmation = () => {
    deleteCourse();
    setOpenAlert(false);
  };

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger>{children}</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem
            onClick={() => setOpenAlert(true)}
            className="cursor-pointer"
          >
            <div className="flex items-center gap-1">
              <Trash className="w-3 h-3" /> Delete
            </div>
          </DropdownMenuItem>

          <DropdownMenuItem
            onClick={() =>
              router.push(
                `/dashboard/course/review/reviewView/${reviewerCourseId}`
              )
            }
            className="cursor-pointer"
          >
            <div className="flex items-center gap-1">
              <Eye className="w-3 h-3" /> View
            </div>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <AlertDialog open={openAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              reviewer and remove related data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setOpenAlert(false)}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction onClick={() => deleteConfirmation()}>
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default DropdownOption;
