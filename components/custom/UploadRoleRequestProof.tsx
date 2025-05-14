/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { storage } from "@/utils/FirebaseConfig";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import Image from "next/image";
import React, { useState } from "react";
import { toast } from "sonner";

const UploadRoleRequestProof = ({
  setImageUrlProof,
}: {
  setImageUrlProof: (downloadUrl: string) => void;
}) => {
  const [selectedFile, setSelectedFile] = useState<any>();

  // select image from files and upload to to firebase storage
  const onFileSelected = async (e: any) => {
    const file = e.target.files[0]; // get the selected image file
    setSelectedFile(URL.createObjectURL(file)); // create a blob of the image file

    const fileName = Date.now() + ".jpg"; // generate the name of the file
    const storageRef = ref(storage, "tech-trail/" + fileName); // pass the filename to the specific path in the storage
    await uploadBytes(storageRef, file)
      .then(() => {
        console.log("upload file complete"); // this will store the image bytes to the firebase storage specified location
      })
      .then(() => {
        getDownloadURL(storageRef).then(async (downloadUrl) => {
          // this will get the viewable url of the img
          try {
            setImageUrlProof(downloadUrl);

            toast(
              <p className="text-sm font-bold text-green-500">
                Image uploaded successfully
              </p>
            );
          } catch {
            toast(
              <p className="text-sm font-bold text-red-500">
                Internal error occurred while uploading the image
              </p>
            );
          }
        });
      });
  };

  return (
    <div>
      <label htmlFor="upload-image">
        {selectedFile ? (
          <Image
            src={selectedFile}
            loading="lazy"
            placeholder="blur"
            blurDataURL="/blur.jpg"
            width={1000}
            height={1000}
            alt={"banner"}
            className="object-cover cursor-pointer h-52 rounded-lg bg-blue-500 w-full"
          />
        ) : (
          <Image
            src={"/empty-img.png"}
            loading="lazy"
            placeholder="blur"
            blurDataURL="/blur.jpg"
            width={1000}
            height={1000}
            alt={"banner"}
            className="object-cover cursor-pointer w-full h-52 rounded-lg"
          />
        )}
      </label>
      <input
        className="w-20 opacity-0"
        name="file"
        type="file"
        id="upload-image"
        accept="image/png, image/jpeg"
        onChange={onFileSelected}
      />
    </div>
  );
};

export default UploadRoleRequestProof;
