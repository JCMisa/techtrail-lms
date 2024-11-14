/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { db } from "@/utils/db";
import { course } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import { findUserByEmail } from "@/services/UserService";
import Unauthorized from "../../_components/Unauthorized";
import { useRouter } from "next/navigation";
import uuid4 from "uuid4";
import moment from "moment";
import Spinner from "@/components/custom/Spinner";

const CreateCoursePage = () => {
  const { user } = useUser();
  const router = useRouter();

  const [loggedInUser, setLoggedInUser] = useState<{
    id: number;
    email: string;
    firstname: string;
    lastname: string;
    imageUrl: string;
    createdAt: string;
    role: string;
  }>();
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);

  const getUserByEmail = async () => {
    setLoading(true);
    try {
      const result = await findUserByEmail(
        user?.primaryEmailAddress?.emailAddress as string
      );
      if (result) {
        setLoggedInUser(result?.data);
      }
    } catch {
      toast(
        <p className="text-sm font-bold text-red-500">
          Internal error occured while fetching the user
        </p>
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    user && getUserByEmail();
  }, [user]);

  const onSubmit = async () => {
    setLoading(true);
    try {
      const courseId = uuid4();
      const data = await db.insert(course).values({
        courseId: courseId,
        userId: user?.id,
        userEmail: user?.primaryEmailAddress?.emailAddress,
        title: title,
        createdAt: moment().format("MM-DD-YYYY"),
        updatedBy: user?.primaryEmailAddress?.emailAddress,
      });

      if (data) {
        toast(
          <p className="font-bold text-sm text-green-500">
            Course title saved successfully!
          </p>
        );
        router.push(`/dashboard/courses/layout/${courseId}`);
      }
    } catch {
      toast(
        <p className="font-bold text-sm text-red-500">
          Internal error occured while saving the course title
        </p>
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loggedInUser?.role === "admin" || loggedInUser?.role === "teacher" ? (
        <div className="max-w-5xl mx-auto flex md:items-center md:justify-center h-full p-6">
          <div>
            <h1 className="text-2xl">Name your course</h1>
            <p className="text-sm text-gray-500">
              What would you like to name your course? Don&apos;t worry, you can
              change this later.
            </p>
            {/* form */}
            <div className="space-y-8 mt-8 flex flex-col">
              <div className="flex flex-col gap-1">
                <p className="text-sm text-gray-400">Course title</p>
                <Input
                  placeholder="e.g. 'Python Introduction'"
                  required
                  onChange={(e) => setTitle(e.target.value)}
                />
                <p className="text-xs text-gray-500">
                  What will you teach in this course?
                </p>
              </div>
            </div>

            <div className="flex items-center gap-x-2 mt-3">
              <Button variant={"ghost"} onClick={() => setTitle("")}>
                Cancel
              </Button>
              <Button disabled={title == ""} onClick={() => onSubmit()}>
                {loading ? <Spinner /> : "Continue"}
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <Unauthorized />
      )}
    </>
  );
};

export default CreateCoursePage;
