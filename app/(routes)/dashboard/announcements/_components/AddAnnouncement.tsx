/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import LoadingDialog from "@/app/_components/LoadingDialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Plus } from "lucide-react";
import { useUser } from "@clerk/nextjs";
import { addAnnouncement } from "@/services/AnnouncementService";
import { toast } from "sonner";
import { format } from "date-fns";

const AddAnnouncement = ({ refreshData }: { refreshData: () => void }) => {
  const { user } = useUser();

  const [eventInput, setEventInput] = useState<any>();
  const [loading, setLoading] = useState(false);

  const handleInputChange = (name: any, value: any) => {
    setEventInput((prev: any) => ({
      ...prev,
      [name]: value,
    }));
  };

  const createAnnouncement = async () => {
    setLoading(true);
    try {
      const result = await addAnnouncement(
        eventInput.title,
        eventInput.description,
        format(new Date(eventInput.date), "MM-dd-yyyy"),
        user?.primaryEmailAddress?.emailAddress as string
      );
      if (result) {
        toast(
          <p className="font-bold text-sm text-green-500">
            Announcement created successfully
          </p>
        );
        refreshData();
      }
    } catch (error) {
      toast(
        <p className="font-bold text-sm text-red-500">
          Internal error occured while adding an event
        </p>
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Plus className="cursor-pointer" />
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create Announcement</DialogTitle>
            <DialogDescription>
              Please provide the necessary information below to initiate the
              announcement creation process. You may modify the details at any
              time.
            </DialogDescription>
          </DialogHeader>
          <div className="my-3 flex flex-col gap-3">
            <div className="flex flex-col gap-1">
              <label className="text-xs text-gray-500">Title</label>
              <Input
                onChange={(e) => handleInputChange("title", e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs text-gray-500">Description</label>
              <Textarea
                onChange={(e) =>
                  handleInputChange("description", e.target.value)
                }
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs text-gray-500">Event Date</label>
              <Input
                type="date"
                onChange={(e) => handleInputChange("date", e.target.value)}
              />
            </div>
          </div>
          <DialogFooter className="sm:justify-start">
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Close
              </Button>
            </DialogClose>
            <DialogClose asChild>
              <Button type="button" onClick={() => createAnnouncement()}>
                Create
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <LoadingDialog loading={loading} />
    </div>
  );
};

export default AddAnnouncement;
