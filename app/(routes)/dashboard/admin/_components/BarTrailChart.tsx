"use client";

import { db } from "@/utils/db";
import { course } from "@/utils/schema";
import { eq } from "drizzle-orm";
import { MoreHorizontal } from "lucide-react";
import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";
import { toast } from "sonner";

const BarTrailChart = () => {
  const [programmingCourses, setProgrammingCourses] = useState(0);
  const [aiCourses, setAiCourses] = useState(0);
  const [networkingCourses, setNetworkingCourses] = useState(0);
  const [webDevelopmentCourses, setWebDevelopmentCourses] = useState(0);
  const [cyberSecurity, setCyberSecurity] = useState(0);
  const [dataAnalytics, setDataAnalytics] = useState(0);

  const getAllProgrammingCourses = async () => {
    try {
      const result = await db
        .select()
        .from(course)
        .where(eq(course.categoryId, "1"));

      if (result?.length > 0) {
        setProgrammingCourses(result?.length);
      }
    } catch {
      toast(
        <p className="font-bold text-sm text-red-500">
          Internal error occured while fetching all programming courses
        </p>
      );
    }
  };

  const getAllAICourses = async () => {
    try {
      const result = await db
        .select()
        .from(course)
        .where(eq(course.categoryId, "2"));

      if (result?.length > 0) {
        setAiCourses(result?.length);
      }
    } catch {
      toast(
        <p className="font-bold text-sm text-red-500">
          Internal error occured while fetching all AI courses
        </p>
      );
    }
  };

  const getAllNetworkingCourses = async () => {
    try {
      const result = await db
        .select()
        .from(course)
        .where(eq(course.categoryId, "3"));

      if (result?.length > 0) {
        setNetworkingCourses(result?.length);
      }
    } catch {
      toast(
        <p className="font-bold text-sm text-red-500">
          Internal error occured while fetching all Networking courses
        </p>
      );
    }
  };

  const getAllWebDevelopmentCourses = async () => {
    try {
      const result = await db
        .select()
        .from(course)
        .where(eq(course.categoryId, "4"));

      if (result?.length > 0) {
        setWebDevelopmentCourses(result?.length);
      }
    } catch {
      toast(
        <p className="font-bold text-sm text-red-500">
          Internal error occured while fetching all Web Development courses
        </p>
      );
    }
  };

  const getAllCyberSecurityCourses = async () => {
    try {
      const result = await db
        .select()
        .from(course)
        .where(eq(course.categoryId, "5"));

      if (result?.length > 0) {
        setCyberSecurity(result?.length);
      }
    } catch {
      toast(
        <p className="font-bold text-sm text-red-500">
          Internal error occured while fetching all Cybersecurity courses
        </p>
      );
    }
  };

  const getAllDataAnalyticsCourses = async () => {
    try {
      const result = await db
        .select()
        .from(course)
        .where(eq(course.categoryId, "6"));

      if (result?.length > 0) {
        setDataAnalytics(result?.length);
      }
    } catch {
      toast(
        <p className="font-bold text-sm text-red-500">
          Internal error occured while fetching all Data Analytics courses
        </p>
      );
    }
  };

  useEffect(() => {
    getAllProgrammingCourses();
    getAllAICourses();
    getAllNetworkingCourses();
    getAllWebDevelopmentCourses();
    getAllCyberSecurityCourses();
    getAllDataAnalyticsCourses();
  }, []);

  const data = [
    {
      name: "Programming",
      count: programmingCourses,
      amt: 6,
    },
    {
      name: "AI",
      count: aiCourses,
      amt: 6,
    },
    {
      name: "Networking",
      count: networkingCourses,
      amt: 6,
    },
    {
      name: "Web",
      count: webDevelopmentCourses,
      amt: 6,
    },
    {
      name: "Cyber",
      count: cyberSecurity,
      amt: 6,
    },
    {
      name: "Data",
      count: dataAnalytics,
      amt: 6,
    },
  ];

  return (
    <>
      <div className="bg-dark rounded-xl w-full p-4 h-full flex flex-col gap-8">
        {/* title */}
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold">Course Category Created</h2>
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
              <Bar
                dataKey="name"
                fill="#AD49E1"
                legendType="diamond"
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
