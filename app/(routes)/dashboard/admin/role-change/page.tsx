"use client";

import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Empty from "@/app/_components/Empty";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import {
  getAllRequests,
  grantRoleChangeRequest,
  rejectRoleChangeRequest,
} from "@/services/RoleChangeService";
import { Button } from "@/components/ui/button";
import { LoaderCircleIcon } from "lucide-react";
import Link from "next/link";

interface RequestType {
  id: number;
  userEmail: string;
  userCurrentRole: string;
  userReason: string;
  roleChangeProof: string;
  createdAt: string;
}

const ManageRoleChangePage = () => {
  const [requestChangeList, setRequestChangeList] = useState([]);
  const [loading, setLoading] = useState(false);

  const getAllRoleChangeRequests = async () => {
    setLoading(true);
    try {
      const requestList = await getAllRequests();
      if (requestList) {
        setRequestChangeList(requestList?.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllRoleChangeRequests();
  }, []);

  const handleGrantRequest = async (userEmail: string) => {
    setLoading(true);
    try {
      const updateUserRole = await grantRoleChangeRequest(userEmail);
      if (updateUserRole?.data) {
        toast(
          <p className="text-sm text-green-500 font-bold">
            User role updated successfully!
          </p>
        );
        getAllRoleChangeRequests();
      }
    } catch {
      toast(
        <p className="text-sm text-red-500 font-bold">
          Internal error occured while updating user role.
        </p>
      );
    } finally {
      setLoading(false);
    }
  };

  const handleRejectRequest = async (requestId: number) => {
    setLoading(true);
    try {
      const updateUserRole = await rejectRoleChangeRequest(requestId);
      if (updateUserRole?.data) {
        toast(
          <p className="text-sm text-green-500 font-bold">
            User role rejected successfully!
          </p>
        );
        getAllRoleChangeRequests();
      }
    } catch {
      toast(
        <p className="text-sm text-red-500 font-bold">
          Internal error occured while rejecting user role.
        </p>
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <div className="flex flex-row items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-500">
          Manage Role Change Requests
        </h2>
      </div>
      {requestChangeList?.length > 0 ? (
        <Table>
          <TableCaption>List of all the requests.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Requested By</TableHead>
              <TableHead>Current Role</TableHead>
              <TableHead>Request Reason</TableHead>
              <TableHead>Proof</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {requestChangeList?.map((request: RequestType) => (
              <TableRow key={request?.id}>
                <TableCell>{request?.userEmail}</TableCell>
                <TableCell>
                  {request?.userCurrentRole === "admin" && (
                    <Badge className="bg-primary text-xs">Admin</Badge>
                  )}
                  {request?.userCurrentRole === "teacher" && (
                    <Badge className="bg-secondary-100 text-xs">Teacher</Badge>
                  )}
                  {request?.userCurrentRole === "user" && (
                    <Badge className="bg-emerald-500 text-xs">Student</Badge>
                  )}
                </TableCell>
                <TableCell className="min-h-32 max-h-32 card-scroll overflow-y-auto">
                  {request?.userReason}
                </TableCell>
                <TableCell>
                  {request?.roleChangeProof && (
                    <Button asChild variant={"outline"} size={"sm"}>
                      <Link href={request?.roleChangeProof} target="_blank">
                        View
                      </Link>
                    </Button>
                  )}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex flex-row items-center gap-2 justify-end">
                    {/* grant button */}
                    <Button
                      size={"sm"}
                      onClick={() => handleGrantRequest(request?.userEmail)}
                      disabled={loading}
                    >
                      {loading ? (
                        <LoaderCircleIcon className="size-4 animate-spin" />
                      ) : (
                        "Grant"
                      )}
                    </Button>

                    {/* reject button */}
                    <Button
                      size={"sm"}
                      variant={"destructive"}
                      onClick={() => handleRejectRequest(request?.id)}
                      disabled={loading}
                    >
                      {loading ? (
                        <LoaderCircleIcon className="size-4 animate-spin" />
                      ) : (
                        "Reject"
                      )}
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <Empty
          header="No Users Found"
          subheader="Please wait while we fetch necessary data to show"
        />
      )}
    </div>
  );
};

export default ManageRoleChangePage;
