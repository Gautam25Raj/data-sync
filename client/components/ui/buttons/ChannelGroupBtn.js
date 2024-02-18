"use client";

import { useDispatch } from "react-redux";
import { Button } from "@material-tailwind/react";

import { removeSelectedContact, toggleGroup } from "@/redux/slice/contactSlice";

const ChannelGroupBtn = () => {
  const dispatch = useDispatch();

  const handleChannelGroup = () => {
    dispatch(toggleGroup());
    dispatch(removeSelectedContact(null));
  };

  return <Button onClick={handleChannelGroup}>Channel Groups</Button>;
};

export default ChannelGroupBtn;
