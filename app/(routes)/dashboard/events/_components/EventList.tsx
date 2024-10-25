/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  deleteEventById,
  getAllCurrentEvents,
  getAllExpiredEvents,
  getAllUpcomingEvents,
} from "@/services/EventService";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
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
import TableSkeleton from "./TableSkeleton";
import LoadingDialog from "@/app/_components/LoadingDialog";

const EventList = ({ date }: { date?: string }) => {
  const [loading, setLoading] = useState(false);
  const [eventList, setEventList] = useState([]);

  const getCurrentEvents = async () => {
    setLoading(true);
    try {
      const result = await getAllCurrentEvents(moment().format("MM-DD-YYYY"));
      if (result) {
        setEventList(result?.data);
      }
    } catch (error) {
      toast(
        <p className="font-bold text-sm text-red-500">
          Internal error occured while fetching current events
        </p>
      );
    } finally {
      setLoading(false);
    }
  };

  const getUpcommingEvents = async () => {
    setLoading(true);
    try {
      const result = await getAllUpcomingEvents(moment().format("MM-DD-YYYY"));
      if (result) {
        setEventList(result?.data);
      }
    } catch (error) {
      toast(
        <p className="font-bold text-sm text-red-500">
          Internal error occured while fetching upcoming events
        </p>
      );
    } finally {
      setLoading(false);
    }
  };

  const getExpiredEvents = async () => {
    setLoading(true);
    try {
      const result = await getAllExpiredEvents(moment().format("MM-DD-YYYY"));
      if (result) {
        setEventList(result?.data);
      }
    } catch (error) {
      toast(
        <p className="font-bold text-sm text-red-500">
          Internal error occured while fetching past events
        </p>
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    date === "current" && getCurrentEvents();
    date === "upcoming" && getUpcommingEvents();
    date === "expired" && getExpiredEvents();
  }, [date]);

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
        getCurrentEvents();
        getUpcommingEvents();
        getExpiredEvents();
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

  return (
    <div>
      {eventList?.length > 0 ? (
        <Table>
          <TableCaption>A list of {date} events.</TableCaption>
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

export default EventList;
