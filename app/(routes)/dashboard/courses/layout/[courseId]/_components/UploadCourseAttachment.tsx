/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { db } from "@/utils/db";
import { storage } from "@/utils/FirebaseConfig";
import { attachment, course } from "@/utils/schema";
import { eq } from "drizzle-orm";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

const UploadCourseAttachment = ({
  courseId,
  refreshData,
  user,
  setIsEditing,
}: {
  courseId?: string;
  refreshData: () => void;
  user: any;
  setIsEditing: (value: boolean) => void;
}) => {
  const [selectedFile, setSelectedFile] = useState<any>();
  const [courseRecord, setCourseRecord] = useState<any>();

  const getCourseByCourseId = async () => {
    const result = await db
      .select()
      .from(course)
      .where(eq(course.courseId, courseId as string));
    if (result) {
      setCourseRecord(result[0]);
    }
  };

  useEffect(() => {
    courseId && getCourseByCourseId();
  }, [courseId]);

  // select image from files and upload to to firebase storage
  const onFileSelected = async (e: any) => {
    const file = e.target.files[0]; // get the selected image file
    setSelectedFile(URL.createObjectURL(file)); // create a blob of the image file

    const fileName = Date.now() + ".txt"; // generate the name of the file
    const storageRef = ref(storage, "tech-trail/" + fileName); // pass the filename to the specific path in the storage
    await uploadBytes(storageRef, file)
      .then((snapshot) => {
        console.log("upload file complete"); // this will store the image bytes to the firebase storage specified location
      })
      .then((resp) => {
        getDownloadURL(storageRef).then(async (downloadUrl) => {
          // this will get the viewable url of the img
          try {
            const result = await db.insert(attachment).values({
              name: downloadUrl && downloadUrl?.split("/").pop(),
              url: downloadUrl,
              courseId: courseId,
              createdAt: moment().format("MM-DD-YYYY"),
              updatedBy: user?.primaryEmailAddress?.emailAddress,
            });
            if (result) {
              toast(
                <p className="text-sm font-bold text-green-500">
                  Course attachment added successfully
                </p>
              );

              refreshData();
              setIsEditing(false);
            }
          } catch (error) {
            toast(
              <p className="text-sm font-bold text-red-500">
                Internal error occured while adding the course attachment
              </p>
            );
          }
        });
      });
  };

  return (
    <input
      className="w-full"
      name="file"
      type="file"
      id="upload-image"
      accept=".txt, .pdf"
      onChange={onFileSelected}
    />
  );
};

export default UploadCourseAttachment;
