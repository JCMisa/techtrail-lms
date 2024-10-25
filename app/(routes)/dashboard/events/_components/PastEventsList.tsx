/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
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
import { deleteEventById } from "@/services/EventService";
import TableSkeleton from "./TableSkeleton";
import LoadingDialog from "@/app/_components/LoadingDialog";

const PastEventsList = ({
  eventList,
  refreshData,
}: {
  eventList: [];
  refreshData: () => void;
}) => {
  const [loading, setLoading] = useState(false);

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

  const handleSearch = async (query: string) => {
    console.log(query);
  };

  return (
    <div>
      <div className="flex flex-row items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-500">Past Events</h2>
        <div className="bg-dark px-5 flex flex-row items-center rounded-lg">
          <Search />
          <Input
            className="bg-transparent border-none"
            placeholder="Search..."
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>
      </div>
      {eventList?.length > 0 ? (
        <Table>
          <TableCaption>A list of past events.</TableCaption>
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
            {eventList?.map((event: any, index: number) => (
              <TableRow key={event?.id || index}>
                <TableCell className="font-medium">{event?.title}</TableCell>
                <TableCell>{event?.date}</TableCell>
                <TableCell>{event?.startTime}</TableCell>
                <TableCell>{event?.endTime}</TableCell>
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

export default PastEventsList;
