/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { Bell, MoreHorizontal } from "lucide-react";
import React, { useState } from "react";
import { RadialBarChart, RadialBar, ResponsiveContainer } from "recharts";

const RadialChart = () => {
  const [loading, setLoading] = useState(false);

  const data = [
    {
      name: "Total",
      count: 10,
      fill: "#17141c",
    },
    {
      name: "Not Subscribed",
      count: 7,
      fill: "#1caca7",
    },
    {
      name: "Subscribed",
      count: 3,
      fill: "#AD49E1",
    },
  ];

  return (
    <>
      {loading ? (
        <div className="bg-dark rounded-xl w-full h-full p-4 animate-pulse"></div>
      ) : (
        <div className="bg-dark rounded-xl w-full h-full p-4">
          {/* title */}
          <div className="flex justify-between items-center">
            <h1 className="text-lg font-semibold">Subscribers</h1>
            <MoreHorizontal width={20} height={20} />
          </div>

          {/* chart */}
          <div className="w-full h-[75%] relative">
            <ResponsiveContainer>
              <RadialBarChart
                cx="50%"
                cy="50%"
                innerRadius="40%"
                outerRadius="100%"
                barSize={32}
                data={data}
              >
                <RadialBar background dataKey="count" stroke="#17141c" />
              </RadialBarChart>
            </ResponsiveContainer>
            <Bell
              width={100}
              height={100}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-primary-100 bg-dark-100 p-4 rounded-full w-20 h-20"
            />
          </div>

          {/* bottom */}
          <div className="flex justify-center gap-16">
            <div className="flex flex-col gap-1 items-center">
              <div className="w-5 h-5 bg-secondary rounded-full" />
              <h1 className="font-bold">{7}</h1>
              <h2 className="text-[9px] text-gray-400">Not Subscribed (70%)</h2>
            </div>
            <div className="flex flex-col gap-1 items-center">
              <div className="w-5 h-5 bg-primary-100 rounded-full" />
              <h1 className="font-bold">{3}</h1>
              <h2 className="text-[9px] text-gray-400">Subscribed (30%)</h2>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default RadialChart;
