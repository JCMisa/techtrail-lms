/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { findUserByEmail } from "@/services/UserService";
import { useUser } from "@clerk/nextjs";
import {
  BookOpenText,
  Brain,
  Calendar,
  Coins,
  LayoutGrid,
  Megaphone,
  Plus,
  Settings,
  Telescope,
  UserRound,
  UserRoundPen,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import UsageTrack from "./UsageTrack";

const Menu = () => {
  const { user } = useUser();
  const path = usePathname();

  const [loggedInUser, setLoggedInUser] = useState<{
    id: number;
    email: string;
    firstname: string;
    lastname: string;
    imageUrl: string;
    createdAt: string;
    role: string;
  }>();

  const getLoggedInUserByEmail = async () => {
    try {
      const result = await findUserByEmail(
        user?.primaryEmailAddress?.emailAddress as string
      );
      if (result) {
        setLoggedInUser(result?.data);
      }
    } catch (error) {
      toast(
        <p className="font-bold text-sm text-red-500">
          Internal error occured while fetching the user
        </p>
      );
    }
  };

  useEffect(() => {
    user && getLoggedInUserByEmail();
  }, [user]);

  const menuItems = [
    {
      title: "MENU",
      items: [
        {
          icon: <LayoutGrid />,
          label: "Dashboard",
          href: `/dashboard/${loggedInUser?.role}`,
          visible: ["admin", "teacher", "user"],
        },
        {
          icon: <Telescope />,
          label: "Browse",
          href: `/dashboard/browse`,
          visible: ["admin", "teacher", "user"],
        },
        {
          icon: <Plus />,
          label: "Create",
          href: "/dashboard/courses/create",
          visible: ["admin", "teacher"],
        },
        {
          icon: <BookOpenText />,
          label: "Courses",
          href: "/dashboard/courses",
          visible: ["teacher"],
        },
        {
          icon: <BookOpenText />,
          label: "Courses",
          href: "/dashboard/courses/all",
          visible: ["admin"],
        },
        {
          icon: <Brain />,
          label: "Review",
          href: "/dashboard/course/review",
          visible: ["admin", "teacher", "user"],
        },
        {
          icon: <UserRound />,
          label: "Manage Users",
          href: "/dashboard/manage/users",
          visible: ["admin"],
        },
        {
          icon: <Coins />,
          label: "Upgrade",
          href: "/dashboard/upgrade",
          visible: ["teacher", "user"],
        },
        {
          icon: <Calendar />,
          label: "Events",
          href: "/dashboard/events",
          visible: ["admin", "teacher", "user"],
        },
        {
          icon: <Megaphone />,
          label: "Announcements",
          href: "/dashboard/announcements",
          visible: ["admin", "teacher", "user"],
        },
      ],
    },
    {
      title: "OTHER",
      items: [
        {
          icon: <UserRoundPen />,
          label: "Profile",
          href: "/dashboard/profile",
          visible: ["admin", "teacher", "user"],
        },
        {
          icon: <Settings />,
          label: "Settings",
          href: "/dashboard/settings",
          visible: ["admin", "teacher", "user"],
        },
      ],
    },
  ];

  return (
    <div className="mt-4 text-sm">
      {menuItems.map((item, index) => (
        <div key={item.title || index} className="flex flex-col gap-2">
          <p className="hidden lg:block text-light-100 font-light my-4">
            {item.title}
          </p>
          {item.items.map(
            (item, index) =>
              item.visible.includes(loggedInUser?.role as string) && (
                <Link
                  href={item.href}
                  key={index}
                  className={`flex items-center justify-center lg:justify-start gap-4 text-gray-400 py-2 rounded-md hover:bg-primary hover:text-light-100 transition-all ease-in-out md:px-2 ${
                    path == item.href && "bg-primary text-light-100"
                  }`}
                >
                  <span>{item.icon}</span>
                  <span className="hidden lg:block">{item.label}</span>
                </Link>
              )
          )}
        </div>
      ))}
      <div className="lg:flex items-center justify-center hidden">
        <UsageTrack />
      </div>
    </div>
  );
};

export default Menu;
