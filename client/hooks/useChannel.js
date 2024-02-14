"use client";

import { toast } from "sonner";
import { useState } from "react";
import { useDispatch } from "react-redux";

import { addChannel, setChannels } from "@/redux/slice/channelSlice";

const useChannel = () => {
  const dispatch = useDispatch();

  const getChannels = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/channel`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      const channelsData = await response.json();
      dispatch(setChannels(channelsData));
    } catch (err) {
      toast.error(err.message);
    }
  };

  const createChannel = async (name, users) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/channel`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({ name, users }),
        }
      );

      if (!response.ok) {
        toast.error("Error creating channel");
      }

      const newChannel = await response.json();
      dispatch(addChannel(newChannel));
    } catch (err) {
      toast.error(err.message);
    }
  };

  return { getChannels, createChannel };
};

export default useChannel;
