/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  getAllCurrentEvents,
  getAllExpiredEvents,
  getAllUpcomingEvents,
} from "@/services/EventService";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

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
    date === "now" && getCurrentEvents();
    date === "upcoming" && getUpcommingEvents();
    date === "expired" && getExpiredEvents();
  }, [date]);

  return (
    <div>
      {eventList?.length > 0 &&
        eventList?.map((event: any, index: number) => (
          <div key={event?.id || index}>{event?.title}</div>
        ))}
    </div>
  );
};

export default EventList;
