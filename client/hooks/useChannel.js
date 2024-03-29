"use client";

import { toast } from "sonner";
import { useDispatch } from "react-redux";

import {
  addChannel,
  setChannels,
  updateChannel as updateChannelRedux,
  deleteChannel as deleteChannelRedux,
  setJoinedChannels,
  leaveJoinedChannel,
  setSearchedJoinedChannels,
} from "@/redux/slice/channelSlice";

const useChannel = () => {
  const dispatch = useDispatch();

  const getChannel = async (id) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/channel/${id}`,
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

      const channelData = await response.json();
      return channelData;
    } catch (err) {
      toast.error(err.message);
    }
  };

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

  const getJoinedChannels = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/channel/joined`,
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
      dispatch(setJoinedChannels(channelsData));
      dispatch(setSearchedJoinedChannels(channelsData));
    } catch (err) {
      toast.error(err.message);
    }
  };

  const createChannel = async (name, users, tableau) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/channel`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({ name, users, tableau }),
        }
      );

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error);
      }

      const newChannel = await response.json();

      toast.success("Channel created successfully.");
      dispatch(addChannel(newChannel));

      return newChannel;
    } catch (err) {
      toast.error(err.message);
    }
  };

  const updateChannel = async (id, name, users, tableau) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/channel/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({ name, tableau, users }),
        }
      );

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error);
      }

      const updatedChannel = await response.json();

      toast.success("Channel updated successfully.");
      dispatch(updateChannelRedux(updatedChannel));

      return updatedChannel;
    } catch (err) {
      toast.error(err.message);
    }
  };

  const addContactToChannel = async (channelId, contactId) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/channel/${channelId}/add`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({ contactId }),
        }
      );

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error);
      }

      const data = await response.json();

      dispatch(updateChannelRedux(data));
      toast.success("Contact added to channel successfully.");
    } catch (err) {
      toast.error(err.message);
    }
  };

  const deleteChannel = async (id) => {
    try {
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
      dispatch(deleteChannelRedux(deleteChannel));
    } catch (err) {
      toast.error(err.message);
    }
  };

  const leaveChannel = async (id) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/channel/${id}`,
        {
          method: "POST",
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

      await response.json();

      dispatch(leaveJoinedChannel(id));
      toast.success("Channel left successfully.");
    } catch (err) {
      toast.error(err.message);
    }
  };

  return {
    getChannel,
    getChannels,
    getJoinedChannels,
    createChannel,
    updateChannel,
    addContactToChannel,
    deleteChannel,
    leaveChannel,
  };
};

export default useChannel;
