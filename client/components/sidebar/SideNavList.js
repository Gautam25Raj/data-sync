"use client";

import {
  CloudIcon,
  PlusCircleIcon,
  RectangleGroupIcon,
} from "@heroicons/react/24/outline";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import SideNavItem from "./SideNavItem";

const SideNavList = () => {
  const pathname = usePathname();

  const [activeItem, setActiveItem] = useState("");

  const handleItemClick = (item) => {
    setActiveItem(item);
  };

  useEffect(() => {
    const pathParts = pathname.split("/");

    setActiveItem(pathParts[1]);
  }, [pathname]);

  return (
    <>
      <SideNavItem
        label="Dashboard"
        href="/dashboard"
        icon={<RectangleGroupIcon className="text-black bg-black" />}
        active={activeItem === "dashboard"}
        onClick={() => {
          handleItemClick("dashboard");
        }}
      />

      <SideNavItem
        label="Create Channel"
        href="/createChannel"
        icon={<PlusCircleIcon />}
        active={activeItem === "createChannel"}
        onClick={() => {
          handleItemClick("createChannel");
        }}
      />

      <hr className="my-2 border-gray-500" />

      <p className="text-sm text-gray-500">Channels</p>

      <SideNavItem
        label="Channel 1"
        href="/channel1"
        icon={<CloudIcon />}
        active={activeItem === "channel1"}
        onClick={() => {
          handleItemClick("channel1");
        }}
      />

      <SideNavItem
        label="Channel 2"
        href="/channel2"
        icon={<CloudIcon />}
        active={activeItem === "channel2"}
        onClick={() => {
          handleItemClick("channel2");
        }}
      />
    </>
  );
};

export default SideNavList;
