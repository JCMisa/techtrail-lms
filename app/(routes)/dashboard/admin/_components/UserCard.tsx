import { getUsersByRole } from "@/services/UserService";
import { LoaderCircle, MoreHorizontal } from "lucide-react";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

const UserCard = ({ type }: { type: string }) => {
  const [loading, setLoading] = useState(false);
  const [userCount, setUserCount] = useState(0);

  const getUserCountByRole = async () => {
    setLoading(true);
    try {
      const result = await getUsersByRole(type);
      if (result) {
        setUserCount(result?.data?.length);
        console.log(result?.data);
      }
    } catch (error) {
      toast(<p>Internal Error occured while fetching user count</p>);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUserCountByRole();
  }, [type]);

  return (
    <div className="rounded-2xl odd:bg-primary-100 even:bg-primary p-4 flex-1 min-w-[130px]">
      <div className="flex justify-between items-center">
        <span className="text-[10px] bg-dark-100 px-2 py-1 rounded-full text-primary-100">
          2024/2025
        </span>
        <MoreHorizontal width={20} height={20} />
      </div>
      <h1 className="text-2xl font-semibold my-4">
        {loading ? <LoaderCircle className="animate-spin" /> : userCount}
      </h1>
      <h2 className="capitalize text-sm font-medium text-gray-200">
        {type === "user" ? "student" : type === "admin" ? "staff" : "teacher"}
      </h2>
    </div>
  );
};

export default UserCard;
