"use client";

import { MoreHorizontal } from "lucide-react";
import React from "react";
import {
  BarChart,
  Bar,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";

const BarTrailChart = () => {
  const data = [
    {
      name: "Easy",
      count: 3,
      amt: 2400,
    },
    {
      name: "Medium",
      count: 2,
      amt: 2210,
    },
    {
      name: "Hard",
      count: 5,
      amt: 2290,
    },
  ];

  return (
    <>
      <div className="bg-dark rounded-xl w-full p-4 h-full flex flex-col gap-8">
        {/* title */}
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold">Course Difficulties Count</h2>
          <MoreHorizontal width={20} height={20} />
        </div>
        {/* chart */}
        <div className="w-full h-[75%] flex items-center justify-center">
          <ResponsiveContainer width="100%" height="90%">
            <BarChart
              width={150}
              height={40}
              data={data}
              barSize={100}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <XAxis
                dataKey="name"
                tick={{ fill: "#EBD3F8" }}
                tickLine={false}
              />
              <YAxis />
              <Tooltip
                contentStyle={{
                  borderRadius: "10px",
                  borderColor: "lightgray",
                }}
              />
              <Legend
                align="left"
                verticalAlign="top"
                wrapperStyle={{ paddingTop: "20px", paddingBottom: "40px" }}
              />
              <Bar
                dataKey="count"
                fill="#0098ff"
                legendType="circle"
                radius={[10, 10, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </>
  );
};

export default BarTrailChart;
