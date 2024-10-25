/* eslint-disable react/no-children-prop */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import AddEvent from "../../events/_components/AddEvent";
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
import { toast } from "sonner";
import { deleteEventById } from "@/services/EventService";
import LoadingDialog from "@/app/_components/LoadingDialog";

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

const EventCalendar = ({
  eventsList,
  canEdit = false,
  refreshData,
}: {
  eventsList?: [] | any;
  canEdit: boolean;
  refreshData: () => void;
}) => {
  const [value, onChange] = useState<Value>(new Date());
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

  return (
    <div className="bg-dark p-4 rounded-xl">
      <Calendar onChange={onChange} value={value} />

      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold my-4">Events</h1>
        {canEdit && <AddEvent refreshData={refreshData} />}
      </div>
      <div className="flex flex-col gap-4">
        {eventsList?.length > 0
          ? eventsList?.map((event: any, index: number) => (
              <div
                key={event?.id || index}
                className="p-5 rounded-md border-2 border-dark-100 border-t-4 odd:border-t-primary even:border-t-secondary relative"
              >
                <div className="flex items-center justify-between">
                  <h1 className="font-semibold text-light">{event?.title}</h1>
                  <div className="flex flex-col items-center">
                    <span className="text-gray-300 text-xs">{event?.date}</span>
                    <span className="text-gray-500 text-[10px]">
                      {event?.startTime} - {event?.endTime}
                    </span>
                  </div>
                </div>
                <p className="mt-2 text-gray-400 text-sm">
                  {event?.description}
                </p>

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
                )}
              </div>
            ))
          : [1, 2, 3].map((item) => <div key={item}></div>)}
      </div>
      <LoadingDialog loading={loading} />
    </div>
  );
};

export default EventCalendar;
