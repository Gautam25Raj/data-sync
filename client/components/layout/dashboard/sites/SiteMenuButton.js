"use client";

import {
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
} from "@material-tailwind/react";
import { BsThreeDotsVertical } from "react-icons/bs";

import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import useSite from "@/hooks/useSite";

const SiteMenuBtn = ({ siteId }) => {
  const dispatch = useDispatch();

  const { deleteSite, updateSite } = useSite();

  const handleEditSite = () => {
    console.log("edit site");
  };

  const handleDeleteSite = async () => {
    try {
      await deleteSite(siteId);
    } catch (error) {
      toast.error("Failed to delete site");
    }
  };

  return (
    <Menu placement="bottom">
      <MenuHandler>
        <button
          color="gray"
          size="sm"
          className="absolute right-2 top-1/2 transform -translate-y-1/2 z-[5] p-1.5 bg-gray-200 rounded-full hover:bg-gray-800 hover:text-white transition-colors"
        >
          <BsThreeDotsVertical size={16} />
        </button>
      </MenuHandler>

      <MenuList className="p-1">
        <MenuItem onClick={handleEditSite}>Edit Site</MenuItem>

        <MenuItem onClick={handleDeleteSite}>Delete Site</MenuItem>
      </MenuList>
    </Menu>
  );
};

export default SiteMenuBtn;
