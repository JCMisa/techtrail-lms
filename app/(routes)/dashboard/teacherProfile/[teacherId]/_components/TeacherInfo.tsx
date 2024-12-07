import { findUserById } from "@/services/UserService";
import Image from "next/image";
import { notFound } from "next/navigation";
import React from "react";

const TeacherInfo = async ({ teacherId }: { teacherId: number }) => {
  const teacher = await findUserById(teacherId);

  if (teacher?.data === null) return notFound();

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex items-center justify-center w-full">
        <Image
          src={teacher?.data?.imageUrl as string}
          alt="image-profile"
          width={1000}
          height={1000}
          className="w-52 h-52 rounded-full"
        />
      </div>
      <div className="flex flex-col items-center mt-5">
        <p className="text-xl">
          {teacher?.data?.firstname} {teacher?.data?.lastname}
        </p>
        <span className="text-sm text-gray-400">{teacher?.data?.email}</span>
      </div>

      <div className="mt-10">
        <a
          href={`mailto:${teacher?.data?.email}`}
          className="p-3 px-10 bg-primary hover:bg-primary-100 cursor-pointer shadow-md text-sm rounded-lg"
        >
          Get in touch
        </a>
      </div>
    </div>
  );
};

export default TeacherInfo;
