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
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import {
  deleteEventById,
  filterByTitle,
  updateEventById,
} from "@/services/EventService";
import TableSkeleton from "./TableSkeleton";
import LoadingDialog from "@/app/_components/LoadingDialog";
import { Search, SquarePen, Trash } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";

const AllEventsList = ({
  eventList,
  refreshData,
}: {
  eventList: [];
  refreshData: () => void;
}) => {
  const [loading, setLoading] = useState(false);
  const [newTitle, setNewTitle] = useState<string>("");
  const [newDescription, setNewDescription] = useState<string>("");
  const [newStartTime, setNewStartTime] = useState<string>("");
  const [newEndTime, setNewEndTime] = useState<string>("");
  const [newDate, setNewDate] = useState<string>("");
  const [filteredEventList, setFilteredEventList] = useState<[] | any>([]);

  const deleteEvent = async (eventId: number) => {
    setLoading(true);
    try {
      const result = await deleteEventById(eventId);
      if (result) {
        toast(
          <p className="font-bold text-sm text-green-500">
            Event deleted successfully
          </p>
        );
        refreshData();
      }
    } catch (error) {
      toast(
        <p className="font-bold text-sm text-red-500">
          Internal error occured while deleting the event
        </p>
      );
    } finally {
      setLoading(false);
    }
  };

  const updateEvent = async (eventId: number) => {
    try {
      const result = await updateEventById(
        eventId,
        newTitle,
        newDescription,
        newStartTime,
        newEndTime,
        format(new Date(newDate), "MM-dd-yyyy")
      );
      if (result) {
        toast(
          <p className="font-bold text-sm text-green-500">
            Event updated successfully
          </p>
        );
        refreshData();
      }
    } catch (error) {
      toast(
        <p className="font-bold text-sm text-red-500">
          Internal error occured while updating the event
        </p>
      );
    }
  };

  const handleSearch = async (titleQuery: string) => {
    try {
      const result = await filterByTitle(titleQuery);
      if (result) {
        setFilteredEventList(result?.data);
      }
    } catch (error) {
      toast(
        <p className="font-bold text-sm text-red-500">
          Internal error occured while searching events
        </p>
      );
    }
  };

  return (
    <div>
      <div className="flex flex-row items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-500">All Events</h2>
        <div className="flex flex-row items-center gap-2 bg-dark px-5 rounded-lg">
          <Search className="w-4 h-4" />
          <Input
            placeholder="Search..."
            className="bg-transparent border-none"
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>
      </div>
      {eventList?.length > 0 || filteredEventList?.length > 0 ? (
        <Table>
          <TableCaption>A list of all the events.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Title</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Time Start</TableHead>
              <TableHead>Time End</TableHead>
              <TableHead>Created By</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {(filteredEventList?.length > 0
              ? filteredEventList
              : eventList
            )?.map((event: any, index: number) => (
              <TableRow key={event?.id || index}>
                <TableCell className="font-medium">{event?.title}</TableCell>
                <TableCell>{event?.date}</TableCell>
                <TableCell>{event?.startTime}</TableCell>
                <TableCell>{event?.endTime}</TableCell>
                <TableCell>{event?.createdBy}</TableCell>
                <TableCell className="text-right">
                  <div className="flex flex-row items-center gap-5 justify-center">
                    {/* edit dialog */}
                    <Dialog>
                      <DialogTrigger>
                        <SquarePen className="text-yellow-500 hover:text-yellow-600 cursor-pointer" />
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Edit Event</DialogTitle>
                          <DialogDescription>
                            Customize your event to fit your specific needs.
                            Update the information and settings to your liking.
                          </DialogDescription>
                        </DialogHeader>
                        <div className="flex flex-col gap-3">
                          <div className="flex flex-col gap-1">
                            <label className="text-xs text-gray-500">
                              Title
                            </label>
                            <Input
                              defaultValue={event?.title}
                              onChange={(e) =>
                                setNewTitle(
                                  e.target.value ? e.target.value : event?.title
                                )
                              }
                            />
                          </div>
                          <div className="flex flex-col gap-1">
                            <label className="text-xs text-gray-500">
                              Description
                            </label>
                            <Textarea
                              defaultValue={event?.description}
                              onChange={(e) =>
                                setNewDescription(
                                  e.target.value
                                    ? e.target.value
                                    : event?.description
                                )
                              }
                            />
                          </div>
                          <div className="flex flex-col md:flex-row justify-center items-center gap-3 w-full">
                            <div className="flex flex-col gap-1 w-full">
                              <label className="text-xs text-gray-500">
                                Time Start
                              </label>
                              <Input
                                type="time"
                                defaultValue={event?.startTime}
                                onChange={(e) =>
                                  setNewStartTime(
                                    e.target.value
                                      ? e.target.value
                                      : event?.startTime
                                  )
                                }
                              />
                            </div>
                            <div className="flex flex-col gap-1 w-full">
                              <label className="text-xs text-gray-500">
                                Time End
                              </label>
                              <Input
                                type="time"
                                defaultValue={event?.endTime}
                                onChange={(e) =>
                                  setNewEndTime(
                                    e.target.value
                                      ? e.target.value
                                      : event?.endTime
                                  )
                                }
                              />
                            </div>
                          </div>
                          <div className="flex flex-col gap-1">
                            <label className="text-xs text-gray-500">
                              Event Date
                            </label>
                            <Input
                              type="date"
                              defaultValue={event?.date}
                              onChange={(e) =>
                                setNewDate(
                                  e.target.value ? e.target.value : event?.date
                                )
                              }
                            />
                          </div>
                        </div>
                        <div className="flex flex-row gap-3 items-center justify-start">
                          <DialogClose>
                            <Button variant={"outline"}>Close</Button>
                          </DialogClose>
                          <DialogClose>
                            <Button onClick={() => updateEvent(event?.id)}>
                              Edit
                            </Button>
                          </DialogClose>
                        </div>
                      </DialogContent>
                    </Dialog>
                    {/* delete dialog */}
                    <AlertDialog>
                      <AlertDialogTrigger>
                        <Trash className="text-red-500 hover:text-red-600 cursor-pointer" />
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>
                            Are you absolutely sure?
                          </AlertDialogTitle>
                          <AlertDialogDescription>
                            This action cannot be undone. This will permanently
                            delete your event and remove related data from our
                            servers.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => deleteEvent(event?.id)}
                          >
                            Continue
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
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

export default AllEventsList;
