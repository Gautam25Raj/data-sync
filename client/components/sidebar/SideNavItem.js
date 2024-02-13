"use client";

import { ListItem, ListItemPrefix } from "@material-tailwind/react";

import Link from "next/link";
import { useState } from "react";

import GradientIcon from "../ui/GradientIcon";

const SideNavItem = ({ label, icon, fill, href, active, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link href={href} onClick={onClick}>
      <ListItem
        className={`sideNavItem hover:bg-gradient-push-light focus:bg-gradient-push-light active:bg-gradient-push-light transition-colors space-x-2 ${
          active ? "bg-gradient-push-light" : ""
        }`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <ListItemPrefix>
          <GradientIcon
            icon={icon}
            isHovered={isHovered || active}
            fill={fill}
          />
        </ListItemPrefix>

        <p
          className={`prevent-select font-grotesque text-xl text-gray-900 ${
            isHovered || active
              ? "font-semibold gradient-text bg-gradient-push"
              : ""
          }`}
        >
          {label}
        </p>
      </ListItem>
    </Link>
  );
};

export default SideNavItem;
