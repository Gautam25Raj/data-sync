"use client";

import { MdOutlineFlipCameraAndroid } from "react-icons/md";

import { useDispatch } from "react-redux";
import { Button } from "@material-tailwind/react";

import { toggleGroup } from "@/redux/slice/contactSlice";
import { removeCurrentChannel } from "@/redux/slice/channelSlice";

const ContactsBtn = () => {
  const dispatch = useDispatch();

  const handleContactGroup = () => {
    dispatch(toggleGroup());
    dispatch(removeCurrentChannel(null));
  };

  return (
    <Button onClick={handleContactGroup} className="flex gap-2 justify-center">
      <MdOutlineFlipCameraAndroid size={16} />
      Contacts
    </Button>
  );
};

export default ContactsBtn;
