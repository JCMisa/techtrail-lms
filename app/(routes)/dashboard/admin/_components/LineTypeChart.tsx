"use client";

import { getAllReviewersByCategory } from "@/services/AiOutputService";
import { MoreHorizontal } from "lucide-react";
import React, { useEffect, useState } from "react";
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
  const [programmingCount, setProgrammingCount] = useState<number>(0);
  const [aiCount, setAiCount] = useState<number>(0);
  const [networkingCount, setNetworkingCount] = useState<number>(0);
  const [webDevCount, setWebDevCount] = useState<number>(0);
  const [cybersecurityCount, setCybersecurityCount] = useState<number>(0);
  const [dataAnalyticsCount, setDataAnalyticsCount] = useState<number>(0);

  const getProgrammingCount = async () => {
    try {
      const result = await getAllReviewersByCategory("Programming");
      if (result?.data) {
        setProgrammingCount(result?.data?.length as number);
      }
    } catch (error) {
      console.log("get programming reviewers count error: ", error);
    }
  };

  const getAiCount = async () => {
    try {
      const result = await getAllReviewersByCategory("Artificial Intelligence");
      if (result?.data) {
        setAiCount(result?.data?.length as number);
      }
    } catch (error) {
      console.log("get ai reviewers count error: ", error);
    }
  };

  const getNetworkingCount = async () => {
    try {
      const result = await getAllReviewersByCategory("Networking");
      if (result?.data) {
        setNetworkingCount(result?.data?.length as number);
      }
    } catch (error) {
      console.log("get networking reviewers count error: ", error);
    }
  };

  const getWebDevCount = async () => {
    try {
      const result = await getAllReviewersByCategory("Web Development");
      if (result?.data) {
        setWebDevCount(result?.data?.length as number);
      }
    } catch (error) {
      console.log("get web dev reviewers count error: ", error);
    }
  };

  const getCyberCount = async () => {
    try {
      const result = await getAllReviewersByCategory("Cybersecurity");
      if (result?.data) {
        setCybersecurityCount(result?.data?.length as number);
      }
    } catch (error) {
      console.log("get cybersecurity reviewers count error: ", error);
    }
  };

  const getDataAnalyticsCount = async () => {
    try {
      const result = await getAllReviewersByCategory("Data Analytics");
      if (result?.data) {
        setDataAnalyticsCount(result?.data?.length as number);
      }
    } catch (error) {
      console.log("get data analytics reviewers count error: ", error);
    }
  };

  useEffect(() => {
    getProgrammingCount();
    getAiCount();
    getNetworkingCount();
    getWebDevCount();
    getCyberCount();
    getDataAnalyticsCount();
  }, []);

  const data = [
    {
      name: "Programming",
      count: programmingCount,
    },
    {
      name: "AI",
      count: aiCount,
    },
    {
      name: "Networking",
      count: networkingCount,
    },
    {
      name: "Web Development",
      count: webDevCount,
    },
    {
      name: "Cybersecurity",
      count: cybersecurityCount,
    },
    {
      name: "Data Analytics",
      count: dataAnalyticsCount,
    },
  ];

  return (
    <>
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
                  color: "#EBD3F8",
                  backgroundColor: "#17141c",
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
                stroke="#0098ff"
                legendType="circle"
                strokeWidth={5}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </>
  );
};

export default LineTypeChart;
