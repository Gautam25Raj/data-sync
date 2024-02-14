"use client";

import { toast } from "sonner";
import { useDispatch } from "react-redux";

import {
  addChannel,
  setChannels,
  updateChannels,
  deleteChannels,
} from "@/redux/slice/channelSlice";

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

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error);
      }

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
        const data = await response.json();
        throw new Error(data.error);
      }

      const newChannel = await response.json();
      dispatch(addChannel(newChannel));
    } catch (err) {
      toast.error(err.message);
    }
  };

  const updateChannel = async (id, name, users) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/channel/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({ name, users }),
        }
      );

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error);
      }

      const updatedChannel = await response.json();
      dispatch(updateChannels(updatedChannel));
    } catch (err) {
      toast.error(err.message);
    }
  };

  const deleteChannel = async (id) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/channel/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.error);
    }

    const deleteChannel = await response.json();
    dispatch(deleteChannels(deleteChannel));
  };

  return { getChannels, createChannel, updateChannel, deleteChannel };
};

export default useChannel;
