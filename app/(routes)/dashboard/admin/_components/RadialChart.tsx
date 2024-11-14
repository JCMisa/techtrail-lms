/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { getAllUsers } from "@/services/UserService";
import { db } from "@/utils/db";
import { subscribedUsers } from "@/utils/schema";
import { Bell, MoreHorizontal } from "lucide-react";
import React, { useEffect, useState } from "react";
import {
  RadialBarChart,
  RadialBar,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { toast } from "sonner";

const RadialChart = () => {
  const [totalUsers, setTotalUsers] = useState<number | null>(0);
  const [subscribed, setSubscribed] = useState<number | null>(0);

  const getTotalUsers = async () => {
    try {
      const result = await getAllUsers();
      if (result) {
        setTotalUsers(result?.data?.length as number);
      }
    } catch {
      toast(
        <p className="font-bold text-sm text-red-500">
          Internal error occured while fetching total users
        </p>
      );
    }
  };

  const getSubscribedUsers = async () => {
    try {
      const result = await db.select().from(subscribedUsers);
      if (result) {
        setSubscribed(result?.length as number);
      }
    } catch {
      toast(
        <p className="font-bold text-sm text-red-500">
          Internal error occured while fetching subscribed users
        </p>
      );
    }
  };

  useEffect(() => {
    getTotalUsers();
    getSubscribedUsers();
  }, []);

  const data = [
    {
      name: "Total",
      count: totalUsers || 0,
      fill: "#1e1e1e",
    },
    {
      name: "Not Subscribed",
      count: totalUsers! - subscribed!,
      fill: "#AD49E1",
    },
    {
      name: "Subscribed",
      count: subscribed || 0,
      fill: "#0098ff",
    },
  ];

  return (
    <>
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
              <Tooltip
                contentStyle={{
                  borderRadius: "10px",
                  borderColor: "lightgray",
                }}
              />
              <RadialBar background dataKey="count" stroke="#17141c" />
            </RadialBarChart>
          </ResponsiveContainer>
          <Bell
            width={100}
            height={100}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-primary bg-dark-100 p-4 rounded-full w-20 h-20"
          />
        </div>

        {/* bottom */}
        <div className="flex justify-center gap-16">
          <div className="flex flex-col gap-1 items-center">
            <div className="w-5 h-5 bg-secondary-100 rounded-full" />
            <h1 className="font-bold">{totalUsers! - subscribed!}</h1>
            <h2 className="text-[9px] text-gray-400">
              !Subscribed (
              {Math.round(((totalUsers! - subscribed!) / totalUsers!) * 100)} %)
            </h2>
          </div>
          <div className="flex flex-col gap-1 items-center justify-center">
            <div className="w-5 h-5 bg-primary rounded-full" />
            <h1 className="font-bold">{subscribed}</h1>
            <h2 className="text-[9px] text-gray-400">
              Subscribed ({Math.round((subscribed! / totalUsers!) * 100)}%)
            </h2>
          </div>
        </div>
      </div>
    </>
  );
};

export default RadialChart;
