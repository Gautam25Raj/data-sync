"use client";

import {
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
} from "@material-tailwind/react";
import { BsThreeDotsVertical } from "react-icons/bs";

import { toast } from "sonner";
import { useDispatch } from "react-redux";

import useSite from "@/hooks/useSite";

import { toggleEditSiteModal } from "@/redux/slice/modalSlice";
import { setCurrentActionSite } from "@/redux/slice/siteSlice";

const SiteMenuBtn = ({ site }) => {
  const dispatch = useDispatch();

  const { deleteSite } = useSite();

  const handleEditSite = () => {
    dispatch(setCurrentActionSite(site));
    dispatch(toggleEditSiteModal());
  };

  const handleDeleteSite = async () => {
    try {
      await deleteSite(site._id);
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
          className="z-[5] p-1.5 bg-gray-200 rounded-full hover:bg-gray-800 hover:text-white transition-colors mr-2"
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
