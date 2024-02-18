"use client";

import { TbDots } from "react-icons/tb";

import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Button,
} from "@material-tailwind/react";

const ChatHeaderMenu = () => {
  return (
    <Menu placement="bottom-end">
      <MenuHandler>
        <Button
          variant="text"
          className="p-2 rounded-full hover:bg-gray-100 transition-colors"
        >
          <TbDots size={20} />
        </Button>
      </MenuHandler>

      <MenuList className="p-1">
        <MenuItem>Add to Channel</MenuItem>
        <MenuItem>Clear Messages</MenuItem>
        <MenuItem>Delete Contact</MenuItem>
      </MenuList>
    </Menu>
  );
};

export default ChatHeaderMenu;
