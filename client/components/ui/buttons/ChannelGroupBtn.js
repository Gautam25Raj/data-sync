"use client";

import { useDispatch } from "react-redux";
import { Button } from "@material-tailwind/react";

import { toggleGroup } from "@/redux/slice/contactSlice";

const ChannelGroupBtn = () => {
  const dispatch = useDispatch();

  const handleChannelGroup = () => {
    dispatch(toggleGroup());
  };

  return <Button onClick={handleChannelGroup}>Channel Groups</Button>;
};

export default ChannelGroupBtn;
