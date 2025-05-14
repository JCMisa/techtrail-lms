/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import Empty from "@/app/_components/Empty";
import { getUpcommingAnnouncements } from "@/services/AnnouncementService";
import { format } from "date-fns";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

const UpcommingAnnouncements = () => {
  const [upcommingAnnouncements, setUpcommingAnnouncements] = useState<
    [] | any
  >([]);
  const [loading, setLoading] = useState<boolean>(false);

  const getAllUpcommingAnnouncementsList = async () => {
    setLoading(true);
    try {
      const result = await getUpcommingAnnouncements(
        format(new Date(), "MM-dd-yyyy")
      );
      if (result) {
        setUpcommingAnnouncements(result?.data);
      }
    } catch (error) {
      toast(
        <p className="font-bold text-sm text-red-500">
          Internal error ocured while fetching upcomming announcements
        </p>
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllUpcommingAnnouncementsList();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center">
      <h2 className="font-semibold text-2xl">Upcomming Announcements</h2>
      {/* upcomming announcements list */}
      <div className="my-10">
        {upcommingAnnouncements?.length > 0 ? (
          <div className="w-full flex flex-wrap gap-5 justify-center">
            {upcommingAnnouncements?.length > 0 &&
              upcommingAnnouncements?.map(
                (announcement: any, index: number) => (
                  <div
                    key={announcement?.id}
                    className="bg-dark min-w-60 max-w-60 min-h-28 max-h-28 p-5 rounded-md border-2 border-dark-100 border-t-4 odd:border-t-primary even:border-t-secondary shadow-lg overflow-auto event-card-scroll"
                  >
                    <div className="flex flex-col">
                      <h1 className="font-semibold text-light">
                        {announcement?.title}
                      </h1>
                      <span className="text-gray-300 text-xs">
                        {announcement?.date}
                      </span>
                    </div>
                    <p className="mt-2 text-gray-400 text-sm">
                      {announcement?.description}
                    </p>
                  </div>
                )
              )}
          </div>
        ) : (
          <div className="w-full flex flex-wrap gap-5 justify-center">
            <Empty
              header="No Upcomming Announcements"
              subheader="Please wait while we fetch data from out database"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default UpcommingAnnouncements;
