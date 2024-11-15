/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useConfettiStore } from "@/hooks/use-confetti-store";
import Link from "next/link";
import React, { useEffect } from "react";

const SubscribeSuccessPage = () => {
  const confetti = useConfettiStore();

  useEffect(() => {
    confetti.onOpen();
  }, []);

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="card-pay">
        <button type="button" className="dismiss-pay">
          x
        </button>
        <div className="header-pay">
          <div className="image-pay">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <g strokeWidth="0" id="SVGRepo_bgCarrier"></g>
              <g
                strokeLinejoin="round"
                strokeLinecap="round"
                id="SVGRepo_tracerCarrier"
              ></g>
              <g id="SVGRepo_iconCarrier">
                {" "}
                <path
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="1.5"
                  stroke="#000000"
                  d="M20 7L9.00004 18L3.99994 13"
                ></path>{" "}
              </g>
            </svg>
          </div>
          <div className="content-pay">
            <span className="title-pay">Order Completed</span>
            <p className="message-pay">
              Thank you for your purchase. Enjoy your PRO plan and learn
              limitless
            </p>
          </div>
          <div className="actions-pay">
            <Link
              href={"/dashboard/upgrade"}
              type="button"
              className="track-pay"
            >
              Go Back
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubscribeSuccessPage;
