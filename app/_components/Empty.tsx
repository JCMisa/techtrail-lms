import Image from "next/image";
import React from "react";

const Empty = ({
  header,
  subheader,
}: {
  header: string;
  subheader: string;
}) => {
  return (
    <div className="flex flex-col items-center justify-center">
      <Image
        src={"/empty.png"}
        alt="empty"
        width={1000}
        height={1000}
        className="w-52 h-52"
      />
      <p className="text-lg -mt-10">{header}</p>
      <p className="text-sm text-gray-400">{subheader}</p>
    </div>
  );
};

export default Empty;
