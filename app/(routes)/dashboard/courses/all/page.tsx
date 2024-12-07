import React from "react";
import { DataTable } from "../_components/dataTable/data-table";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { db } from "@/utils/db";
import { course } from "@/utils/schema";
import { desc } from "drizzle-orm";
import { columns } from "../_components/dataTable/columns";

const AllCourses = async () => {
  const { userId } = auth();

  if (!userId) {
    return redirect("/");
  }

  const courses = await db.select().from(course).orderBy(desc(course.id));

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

export default AllCourses;
