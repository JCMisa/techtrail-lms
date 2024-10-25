/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
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

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import moment from "moment";
import { toast } from "sonner";
import LoadingDialog from "@/app/_components/LoadingDialog";
import { addEvent } from "@/services/EventService";
import { useUser } from "@clerk/nextjs";

const AddEvent = ({ refreshData }: { refreshData: () => void }) => {
  const { user } = useUser();

  const [eventInput, setEventInput] = useState<any>();
  const [loading, setLoading] = useState(false);

  const handleInputChange = (name: any, value: any) => {
    setEventInput((prev: any) => ({
      ...prev,
      [name]: value,
    }));
  };

  const createEvent = async () => {
    setLoading(true);
    try {
      const result = await addEvent(
        eventInput.title,
        eventInput.description,
        eventInput.startTime,
        eventInput.endTime,
        moment(eventInput.date).format("MM-DD-YYYY"),
        user?.primaryEmailAddress?.emailAddress as string
      );
      if (result) {
        toast(
          <p className="font-bold text-sm text-green-500">
            Event created successfully
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
      {/* add modal */}
      <Dialog>
        <DialogTrigger asChild>
          <Plus />
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create Event</DialogTitle>
            <DialogDescription>
              Please provide the necessary information below to initiate the
              event creation process. You may modify the details at any time.
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
            <div className="flex flex-col md:flex-row items-center justify-center gap-5 w-full">
              <div className="flex flex-col w-full gap-1">
                <label className="text-xs text-gray-500">Time Start</label>
                <Input
                  type="time"
                  onChange={(e) =>
                    handleInputChange("startTime", e.target.value)
                  }
                />
              </div>
              <div className="flex flex-col w-full gap-1">
                <label className="text-xs text-gray-500">Time End</label>
                <Input
                  type="time"
                  onChange={(e) => handleInputChange("endTime", e.target.value)}
                />
              </div>
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
              <Button type="button" onClick={() => createEvent()}>
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

export default AddEvent;
