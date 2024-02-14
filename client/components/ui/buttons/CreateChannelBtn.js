"use client";

import { PlusCircleIcon } from "@heroicons/react/24/outline";

import SideNavItem from "@/components/sidebar/SideNavItem";
import { useDispatch } from "react-redux";
import { togglenewChannelModal } from "@/redux/slice/modalSlice";

const CreateChannelBtn = () => {
  const dispatch = useDispatch();

  const handleCreateChannelClick = async () => {
    dispatch(togglenewChannelModal());
  };

  return (
    <SideNavItem
      label="Create Channel"
      href="#"
      icon={<PlusCircleIcon />}
      active={false}
      onClick={handleCreateChannelClick}
    />
  );
};

export default CreateChannelBtn;
