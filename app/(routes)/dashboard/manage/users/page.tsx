/* eslint-disable @typescript-eslint/no-explicit-any */
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, SquarePen } from "lucide-react";
import { Input } from "@/components/ui/input";
import Empty from "@/app/_components/Empty";
import {
  filterUserByEmail,
  getAllUsers,
  updateUserRole,
} from "@/services/UserService";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import DeleteUserAction from "./_components/DeleteUserAction";
import { toast } from "sonner";

const ManageUsersPage = () => {
  const [usersList, setUsersList] = useState<any>();
  const [filteredUsersList, setFilteredUsersList] = useState<[] | any>([]);

  //   const handleSearch = async (titleQuery: string) => {
  //     try {
  //       const result = await filterAnnouncementsByTitle(titleQuery);
  //       if (result) {
  //         setFilteredAnnouncementList(result?.data);
  //       }
  //     } catch (error) {
  //       toast(
  //         <p className="font-bold text-sm text-red-500">
  //           Internal error occured while searching announcements
  //         </p>
  //       );
  //     }
  //   };

  const getUsersList = async () => {
    try {
      const usersList = await getAllUsers();
      if (usersList) {
        setUsersList(usersList?.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUsersList();
  }, []);

  const handleUpdateRole = async (userId: number, roleValue: string) => {
    try {
      const updateUser = await updateUserRole(userId, roleValue);
      if (updateUser?.data) {
        toast(
          <p className="text-sm text-green-500 font-bold">
            User role updated successfully!
          </p>
        );
        getUsersList();
      }
    } catch {
      toast(
        <p className="text-sm text-red-500 font-bold">
          Internal error occured while updating use role.
        </p>
      );
    }
  };

  const handleSearch = async (userEmail: string) => {
    try {
      const result = await filterUserByEmail(userEmail);
      if (result?.data) {
        setFilteredUsersList(result?.data);
      }
    } catch (error) {
      console.log("filter users by email error: ", error);
    }
  };

  return (
    <div className="p-6">
      <div className="flex flex-row items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-500">Manage Users</h2>
        <div className="flex flex-row items-center gap-2 bg-dark px-5 rounded-lg">
          <Search className="w-4 h-4 mr-3" />
          <Input
            placeholder="Search by email..."
            className="bg-transparent border-none"
            onChange={(e) => handleSearch(e.target.value)}
          />
          {filteredUsersList?.length > 0 && (
            <span
              className="text-sm cursor-pointer ml-3"
              onClick={() => {
                setFilteredUsersList([]);
              }}
            >
              x
            </span>
          )}
        </div>
      </div>
      {usersList?.length > 0 || filteredUsersList?.length > 0 ? (
        <Table>
          <TableCaption>List of all the users.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Profile</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Fullname</TableHead>
              <TableHead>Role</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {(filteredUsersList?.length > 0
              ? filteredUsersList
              : usersList
            )?.map((user: any, index: number) => (
              <TableRow key={user?.id || index}>
                <TableCell>
                  {user?.imageUrl ? (
                    <Image
                      src={user?.imageUrl && user?.imageUrl}
                      alt="profile"
                      width={1000}
                      height={1000}
                      className="w-10 h-10 rounded-full"
                      loading="lazy"
                      placeholder="blur"
                      blurDataURL="/blur.jpg"
                    />
                  ) : (
                    <Image
                      src={"/empty-img-placeholder.jpg"}
                      alt="profile"
                      width={1000}
                      height={1000}
                      className="w-10 h-10 rounded-full"
                      loading="lazy"
                      placeholder="blur"
                      blurDataURL="/blur.jpg"
                    />
                  )}
                </TableCell>
                <TableCell>{user?.email}</TableCell>
                <TableCell>
                  {user?.firstname} {user?.lastname}
                </TableCell>
                <TableCell>
                  {user?.role === "admin" && (
                    <Badge className="bg-primary text-xs">Admin</Badge>
                  )}
                  {user?.role === "teacher" && (
                    <Badge className="bg-secondary-100 text-xs">Teacher</Badge>
                  )}
                  {user?.role === "user" && (
                    <Badge className="bg-emerald-500 text-xs">Student</Badge>
                  )}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex flex-row items-center gap-5 justify-end">
                    {/* edit button */}
                    <Dialog>
                      <DialogTrigger>
                        <SquarePen className="text-yellow-500 hover:text-yellow-600 cursor-pointer" />
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Edit User Role</DialogTitle>
                          <DialogDescription>
                            Customize your user role to fit their specific
                            needs.
                          </DialogDescription>
                        </DialogHeader>
                        <div className="my-5 w-full">
                          <Select
                            onValueChange={(value) =>
                              handleUpdateRole(user?.id, value)
                            }
                            defaultValue={user?.role}
                          >
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder={user?.role} />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="admin">Admin</SelectItem>
                              <SelectItem value="teacher">Teacher</SelectItem>
                              <SelectItem value="user">Student</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </DialogContent>
                    </Dialog>

                    {/* delete button */}
                    <DeleteUserAction
                      userId={user?.id}
                      userInfo={user}
                      refreshData={() => getUsersList()}
                    />
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

export default ManageUsersPage;
