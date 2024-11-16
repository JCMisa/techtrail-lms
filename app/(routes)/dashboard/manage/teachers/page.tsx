import React from "react";
import { DataTable } from "../../courses/_components/dataTable/data-table";
import { teacherColumns } from "../../courses/_components/dataTable/teacherColumns";
import { getUsersByRole } from "@/services/UserService";

const ManageTeachersPage = async () => {
  const teachers = await getUsersByRole("teacher");
  return (
    <div className="p-6">
      <DataTable
        columns={teacherColumns}
        data={teachers?.data}
        topic="email"
        showCreate={false}
      />
    </div>
  );
};

export default ManageTeachersPage;
