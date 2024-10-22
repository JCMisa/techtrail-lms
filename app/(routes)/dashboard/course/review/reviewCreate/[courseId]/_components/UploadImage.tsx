/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { updateReviewerBanner } from "@/services/AiOutputService";
import { storage } from "@/utils/FirebaseConfig";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { toast } from "sonner";

const UploadImage = ({
  course,
  edit = true,
}: {
  course: any;
  edit?: boolean;
}) => {
  const [selectedFile, setSelectedFile] = useState<any>();

  useEffect(() => {
    if (course) {
      setSelectedFile(course?.courseBanner);
    }
  }, [course]);

  // select image from files and upload to to firebase storage
  const onFileSelected = async (e: any) => {
    const file = e.target.files[0]; // get the selected image file
    setSelectedFile(URL.createObjectURL(file)); // create a blob of the image file

    const fileName = Date.now() + ".jpg"; // generate the name of the file
    const storageRef = ref(storage, "tech-trail/" + fileName); // pass the filename to the specific path in the storage
    await uploadBytes(storageRef, file)
      .then((snapshot) => {
        console.log("upload file complete"); // this will store the image bytes to the firebase storage specified location
      })
      .then((resp) => {
        getDownloadURL(storageRef).then(async (downloadUrl) => {
          console.log("img url: ", downloadUrl); // this will get the viewable url of the img
          try {
            const result = await updateReviewerBanner(course?.id, downloadUrl);
            if (result) {
              toast(
                <p className="text-sm font-bold text-green-500">
                  Reviewer banner updated successfully
                </p>
              );
            }
          } catch (error) {
            toast(
              <p className="text-sm font-bold text-red-500">
                Internal error occured while updating the course banner
              </p>
            );
          }
        });
      });
  };

  return (
    <div>
      <div>
        <label htmlFor="upload-image">
          <Image
            src={selectedFile ? selectedFile : course?.courseBanner}
            width={700}
            height={700}
            alt={"banner"}
            className="rounded-xl object-cover cursor-pointer"
          />
        </label>
        {edit && (
          <input
            className="w-10 opacity-0"
            name="file"
            type="file"
            id="upload-image"
            accept="image/png, image/jpeg"
            onChange={onFileSelected}
          />
        )}
      </div>
    </div>
  );
};

export default UploadImage;
