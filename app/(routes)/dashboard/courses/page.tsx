/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { DataTable } from "./_components/dataTable/data-table";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { db } from "@/utils/db";
import { course } from "@/utils/schema";
import { desc, eq } from "drizzle-orm";
import { columns } from "./_components/dataTable/columns";

const CoursesPage = async () => {
  const { userId } = auth();

  if (!userId) {
    return redirect("/");
  }

  const courses = await db
    .select()
    .from(course)
    .where(eq(course.userId, userId))
    .orderBy(desc(course.id));

  return (
    <div className="p-6">
      <DataTable
        columns={columns}
        data={courses}
        topic="title"
        showCreate={true}
      />
    </div>
  );
};

export default CoursesPage;
