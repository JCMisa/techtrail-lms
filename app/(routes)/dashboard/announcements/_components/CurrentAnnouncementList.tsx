/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import LoadingDialog from "@/app/_components/LoadingDialog";
import TableSkeleton from "../../events/_components/TableSkeleton";
import { deleteAnnouncement } from "@/services/AnnouncementService";

const CurrentAnnouncementList = ({
  announcementList,
  refreshData,
}: {
  announcementList: [];
  refreshData: () => void;
}) => {
  const [loading, setLoading] = useState(false);

  const deleteAnnouncementById = async (announcementId: number) => {
    setLoading(true);
    try {
      const result = await deleteAnnouncement(announcementId);
      if (result) {
        toast(
          <p className="font-bold text-sm text-green-500">
            Announcement deleted successfully
          </p>
        );
        refreshData();
      }
    } catch (error) {
      toast(
        <p className="font-bold text-sm text-red-500">
          Internal error occured while deleting the announcement
        </p>
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-500">
        Current Announcements
      </h2>
      {announcementList?.length > 0 ? (
        <Table>
          <TableCaption>A list of current announcements.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Title</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Created By</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {announcementList?.map((event: any, index: number) => (
              <TableRow key={event?.id || index}>
                <TableCell className="font-medium">{event?.title}</TableCell>
                <TableCell>{event?.date}</TableCell>
                <TableCell>{event?.createdBy}</TableCell>
                <TableCell className="text-right">
                  <AlertDialog>
                    <AlertDialogTrigger>
                      <Button className="bg-red-500 hover:bg-red-600">
                        Delete
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Are you absolutely sure?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently
                          delete your announcement and remove related data from
                          our servers.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => deleteAnnouncementById(event?.id)}
                        >
                          Continue
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <TableSkeleton />
      )}
      <LoadingDialog loading={loading} />
    </div>
  );
};

export default CurrentAnnouncementList;
