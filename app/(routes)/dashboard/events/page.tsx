"use client";

import { ArrowLeftCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import EventList from "./_components/EventList";

const EventsPage = () => {
  const router = useRouter();

  return (
    <div className="p-5">
      <div className="flex flex-row gap-2 items-center">
        <ArrowLeftCircle
          className="cursor-pointer"
          onClick={() => router.back()}
        />
        <h1 className="text-2xl font-bold">Manage Events</h1>
      </div>

      <div className="flex flex-col gap-5">
        {/* current events */}
        <div>
          <h2 className="text-xl font-semibold text-gray-500">
            Current Events
          </h2>
          <div className="flex flex-wrap">
            <EventList date="now" />
          </div>
        </div>

        {/* upcoming events */}
        <div>
          <h2 className="text-xl font-semibold text-gray-500">
            Upcoming Events
          </h2>
          <div className="flex flex-wrap">
            <EventList date="upcoming" />
          </div>
        </div>

        {/* past events */}
        <div>
          <h2 className="text-xl font-semibold text-gray-500">Past Events</h2>
          <div className="flex flex-wrap">
            <EventList date="expired" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventsPage;
