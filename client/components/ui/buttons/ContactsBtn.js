"use client";

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

  return <Button onClick={handleContactGroup}>Contacts</Button>;
};

export default ContactsBtn;
