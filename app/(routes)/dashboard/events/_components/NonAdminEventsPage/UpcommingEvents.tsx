/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { getAllUpcomingEvents } from "@/services/EventService";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

const UpcommingEvents = () => {
  const [upcommingEvents, setUpcommingEvents] = useState<[] | any>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const getAllUpcommingEventsList = async () => {
    setLoading(true);
    try {
      const result = await getAllUpcomingEvents(moment().format("MM-DD-YYYY"));
      if (result) {
        setUpcommingEvents(result?.data);
      }
    } catch (error) {
      toast(
        <p className="font-bold text-sm text-red-500">
          Internal error ocured while fetching upcomming events
        </p>
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllUpcommingEventsList();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center">
      <h2 className="font-semibold text-2xl">Upcomming Events</h2>
      {/* current event list */}
      <div className="my-10">
        {!loading ? (
          <div className="w-full flex flex-wrap gap-5 justify-center">
            {upcommingEvents?.length > 0 &&
              upcommingEvents?.map((event: any, index: number) => (
                <div
                  key={event?.id}
                  className="bg-dark min-w-60 max-w-60 min-h-28 max-h-28 p-5 rounded-md border-2 border-dark-100 border-t-4 odd:border-t-primary even:border-t-secondary shadow-lg overflow-auto event-card-scroll"
                >
                  <div className="flex flex-col">
                    <h1 className="font-semibold text-light">{event?.title}</h1>
                    <div className="flex flex-row items-center justify-between">
                      <span className="text-gray-300 text-xs">
                        {event?.date}
                      </span>
                      <span className="text-gray-500 text-[10px]">
                        {event?.startTime} - {event?.endTime}
                      </span>
                    </div>
                  </div>
                  <p className="mt-2 text-gray-400 text-sm">
                    {event?.description}
                  </p>
                </div>
              ))}
          </div>
        ) : (
          <div className="w-full flex flex-wrap gap-5 justify-center">
            {[1, 2, 3, 4, 5].map((item: any, index: number) => (
              <div
                key={index}
                className="bg-dark min-w-60 max-w-60 min-h-28 max-h-28 p-5 rounded-md border-2 border-dark-100 border-t-4 odd:border-t-primary even:border-t-secondary shadow-lg animate-pulse"
              ></div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default UpcommingEvents;
