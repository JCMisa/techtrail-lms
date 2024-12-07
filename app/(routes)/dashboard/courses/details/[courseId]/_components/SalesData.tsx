/* eslint-disable react-hooks/exhaustive-deps */
import Spinner from "@/components/custom/Spinner";
import { formatCurrency } from "@/lib/formatCurrency";
import { db } from "@/utils/db";
import { purchase } from "@/utils/schema";
import { eq } from "drizzle-orm";
import { MoreHorizontal } from "lucide-react";
import React, { useEffect, useState } from "react";

const SalesData = ({ courseId }: { courseId: string }) => {
  const [loading, setLoading] = useState(false);
  const [sales, setSales] = useState(0);
  const [totalPurchase, setTotalPurchase] = useState(0);

  const getCourseSales = async () => {
    try {
      setLoading(true);
      const result = await db
        .select()
        .from(purchase)
        .where(eq(purchase.courseId, courseId as string));

      if (result?.length > 0) {
        let total: number = 0;
        result.forEach((item) => {
          total = total + Number(item?.price);
        });
        setSales(total as number);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const getTotalPurchase = async () => {
    try {
      setLoading(true);
      const result = await db
        .select()
        .from(purchase)
        .where(eq(purchase.courseId, courseId as string));

      if (result?.length > 0) {
        setTotalPurchase(result?.length);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCourseSales();
    getTotalPurchase();
  }, [courseId]);

  return (
    <div className="flex flex-row gap-5 items-center md:flex-col w-full">
      <div className="rounded-2xl bg-primary-100 p-4 flex-1 min-w-[130px] shadow-lg w-full">
        <div className="flex justify-between items-center">
          <span className="text-[10px] bg-dark-100 px-2 py-1 rounded-full text-primary-100">
            2024/2025
          </span>
          <MoreHorizontal width={20} height={20} />
        </div>
        <h1 className="text-2xl font-semibold my-4">
          {loading ? <Spinner /> : formatCurrency(sales)}
        </h1>
        <h2 className="capitalize text-sm font-medium text-gray-200">
          Total Sales
        </h2>
      </div>

      <div className="rounded-2xl bg-primary p-4 flex-1 min-w-[130px] shadow-lg w-full">
        <div className="flex justify-between items-center">
          <span className="text-[10px] bg-dark-100 px-2 py-1 rounded-full text-primary-100">
            2024/2025
          </span>
          <MoreHorizontal width={20} height={20} />
        </div>
        <h1 className="text-2xl font-semibold my-4">
          {loading ? <Spinner /> : totalPurchase}
        </h1>
        <h2 className="capitalize text-sm font-medium text-gray-200">
          Total Purchases
        </h2>
      </div>
    </div>
  );
};

export default SalesData;
