"use client";

import { MoreHorizontal } from "lucide-react";
import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

// temporary
const events = [
  {
    id: 1,
    title: "lorem ipsum dolor sit amet",
    time: "12:00 PM - 2:00 PM",
    description:
      "lorem ipsum dolor sit amet in id dolor sit amet tempor incididunt",
  },
  {
    id: 2,
    title: "lorem ipsum dolor sit amet in id dolor sit amet tempor incididunt",
    time: "12:00 PM - 2:00 PM",
    description:
      "lorem ipsum dolor sit amet in id dolor sit amet tempor incididunt et accusam et accusam et et et et et et et et et et et et et et",
  },
  {
    id: 3,
    title: "lorem ipsum dolor",
    time: "12:00 PM - 2:00 PM",
    description:
      "lorem ipsum dolor sit amet in id dolor sit amet tempor incididunt et just e settore et",
  },
];

const EventCalendar = () => {
  const [value, onChange] = useState<Value>(new Date());

  return (
    <div className="bg-dark p-4 rounded-xl">
      <Calendar onChange={onChange} value={value} />

      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold my-4">Events</h1>
        <MoreHorizontal width={20} height={20} />
      </div>
      <div className="flex flex-col gap-4">
        {events.map((event, index) => (
          <div
            key={event.id || index}
            className="p-5 rounded-md border-2 border-dark-100 border-t-4 odd:border-t-primary even:border-t-secondary"
          >
            <div className="flex items-center justify-between">
              <h1 className="font-semibold text-light">{event.title}</h1>
              <span className="text-gray-300 text-xs">{event.time}</span>
            </div>
            <p className="mt-2 text-gray-400 text-sm">{event.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventCalendar;
