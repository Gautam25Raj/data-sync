"use client";

import { RectangleGroupIcon } from "@heroicons/react/24/outline";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

import SideNavItem from "./SideNavItem";
import ChannelBtn from "../ui/buttons/ChannelBtn";
import CreateChannelBtn from "../ui/buttons/CreateChannelBtn";

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

      <CreateChannelBtn />

      <hr className="my-2 border-gray-500" />

      <ChannelBtn activeItem={activeItem} handleItemClick={handleItemClick} />
    </>
  );
};

export default SideNavList;
