/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { getUsersByRole } from "@/services/UserService";
import { MoreHorizontal } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { RadialBarChart, RadialBar, ResponsiveContainer } from "recharts";
import { toast } from "sonner";

const RadialChart = () => {
  const [loading, setLoading] = useState(false);
  const [studentsCount, setStudentsCount] = useState(0);
  const [teachersCount, setTeachersCount] = useState(0);

  const getCountOfStudents = async () => {
    setLoading(true);
    try {
      const result = await getUsersByRole("user");
      if (result) {
        console.log("student: ", result?.data);
        setStudentsCount(result?.data.length);
      }
    } catch (error) {
      toast(
        <p className="font-bold text-red-500 text-sm">
          Internal error occured while fetching the count of students
        </p>
      );
    } finally {
      setLoading(false);
    }
  };

  const getCountOfTeachers = async () => {
    setLoading(true);
    try {
      const result = await getUsersByRole("teacher");
      if (result) {
        console.log("teacher: ", result?.data);
        setTeachersCount(result?.data.length);
      }
    } catch (error) {
      toast(
        <p className="font-bold text-red-500 text-sm">
          Internal error occured while fetching the count of teachers
        </p>
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCountOfStudents();
    getCountOfTeachers();
  }, []);

  const data = [
    {
      name: "Total",
      count: studentsCount + teachersCount,
      fill: "#17141c",
    },
    {
      name: "Students",
      count: studentsCount,
      fill: "#1caca7",
    },
    {
      name: "Teachers",
      count: teachersCount,
      fill: "#AD49E1",
    },
  ];

  return (
    <div className="bg-dark rounded-xl w-full h-full p-4">
      {/* title */}
      <div className="flex justify-between items-center">
        <h1 className="text-lg font-semibold">Users</h1>
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
            <RadialBar background dataKey="count" />
          </RadialBarChart>
        </ResponsiveContainer>
        <Image
          src={"/student-teacher.png"}
          alt="chartIcon"
          width={80}
          height={80}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        />
      </div>
      {/* bottom */}
      <div className="flex justify-center gap-16">
        <div className="flex flex-col gap-1 items-center">
          <div className="w-5 h-5 bg-secondary rounded-full" />
          <h1 className="font-bold">{studentsCount}</h1>
          <h2 className="text-xs text-gray-400">
            Students (
            {Math.round(
              (studentsCount / (studentsCount + teachersCount)) * 100
            )}
            %)
          </h2>
        </div>
        <div className="flex flex-col gap-1 items-center">
          <div className="w-5 h-5 bg-primary-100 rounded-full" />
          <h1 className="font-bold">{teachersCount}</h1>
          <h2 className="text-xs text-gray-400">
            Teachers (
            {Math.round(
              (teachersCount / (studentsCount + teachersCount)) * 100
            )}
            %)
          </h2>
        </div>
      </div>
    </div>
  );
};

export default RadialChart;
