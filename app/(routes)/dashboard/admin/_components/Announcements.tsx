/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import AddAnnouncement from "../../announcements/_components/AddAnnouncement";
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
import { LoaderCircle, Trash } from "lucide-react";
import { deleteAnnouncement } from "@/services/AnnouncementService";
import { toast } from "sonner";

const Announcements = ({
  announcementList,
  canEdit = false,
  refreshData,
}: {
  announcementList?: [] | any;
  canEdit: boolean;
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
    <div className="bg-dark p-4 rounded-xl">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Announcements</h1>
        {canEdit && <AddAnnouncement refreshData={refreshData} />}
      </div>
      <div className="flex flex-col gap-4 mt-4">
        {announcementList.map((item: any, index: number) => (
          <div
            key={item.id || index}
            className="bg-dark-100 rounded-md p-4 relative"
          >
            <div className="flex items-center justify-between">
              <h2 className="font-semibold text-light">{item.title}</h2>
              <span className="text-xs text-gray-300 bg-dark-100 rounded-md px-1 py-1">
                {item.time}
              </span>
            </div>
            <p className="mt-2 text-gray-400 text-sm">{item.description}</p>

            {/* delete button */}
            {canEdit && (
              <AlertDialog>
                <AlertDialogTrigger>
                  <Trash className="w-5 h-5 absolute bottom-3 right-3 text-red-500" />
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete
                      your announcement and remove related data from our
                      servers.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={() => deleteAnnouncementById(item?.id)}
                    >
                      {loading ? (
                        <LoaderCircle className="animate-spin" />
                      ) : (
                        "Continue"
                      )}
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Announcements;
