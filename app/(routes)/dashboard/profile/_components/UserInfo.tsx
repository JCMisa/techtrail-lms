/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from "next/image";
import React from "react";

const UserInfo = ({ user }: { user: any }) => {
  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-center w-full">
        <Image
          src={user?.imageUrl as string}
          alt="image-profile"
          width={1000}
          height={1000}
          className="w-52 h-52 rounded-full"
          loading="lazy"
          placeholder="blur"
          blurDataURL="/blur.jpg"
        />
      </div>
      <div className="flex flex-col items-center mt-5">
        <p className="text-xl">{user?.fullName}</p>
        <span className="text-sm text-gray-400">
          {user?.primaryEmailAddress?.emailAddress}
        </span>
      </div>
    </div>
  );
};

export default UserInfo;
