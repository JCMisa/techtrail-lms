"use client";

import { MoreHorizontal } from "lucide-react";
import React, { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const LineTypeChart = () => {
  const [loading, setLoading] = useState(false);

  const data = [
    {
      name: "Programming",
      count: 40,
    },
    {
      name: "AI",
      count: 10,
    },
    {
      name: "Networking",
      count: 23,
    },
    {
      name: "NL Processing",
      count: 52,
    },
    {
      name: "Web Development",
      count: 31,
    },
    {
      name: "Cybersecurity",
      count: 42,
    },
    {
      name: "Data Analytics",
      count: 12,
    },
  ];

  return (
    <>
      {loading ? (
        <div className="bg-dark rounded-xl w-full h-full p-4 flex flex-col gap-8 animate-pulse"></div>
      ) : (
        <div className="bg-dark rounded-xl w-full h-full p-4 flex flex-col gap-8">
          {/* title */}
          <div className="flex justify-between items-center">
            <h1 className="text-lg font-semibold">Course Type Analytics</h1>
            <MoreHorizontal width={20} height={20} />
          </div>
          {/* chart */}
          <div className="w-full h-[75%] flex items-center justify-center">
            <ResponsiveContainer width="100%" height="90%">
              <LineChart width={300} height={100} data={data}>
                <XAxis
                  dataKey="name"
                  tick={{ fill: "#EBD3F8" }}
                  tickLine={false}
                  tickMargin={10}
                />
                <YAxis tickMargin={20} />
                <Tooltip
                  contentStyle={{
                    borderRadius: "10px",
                    borderColor: "lightgray",
                  }}
                />
                <Legend
                  align="center"
                  verticalAlign="top"
                  wrapperStyle={{ paddingTop: "10px", paddingBottom: "30px" }}
                />
                <Line
                  type="monotone"
                  dataKey="count"
                  stroke="#7A1CAC"
                  legendType="circle"
                  strokeWidth={5}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </>
  );
};

export default LineTypeChart;
