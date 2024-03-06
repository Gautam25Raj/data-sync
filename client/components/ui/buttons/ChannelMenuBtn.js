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

import useChannel from "@/hooks/useChannel";

import { setCurrentChannel } from "@/redux/slice/channelSlice";
import { toggleEditChannelModal } from "@/redux/slice/modalSlice";

const ChannelMenuBtn = ({ channelId, isAdmin }) => {
  const dispatch = useDispatch();

  const { deleteChannel, leaveChannel } = useChannel();

  const user = useSelector((state) => state.user.user);
  const currentChannel = useSelector((state) => state.channel.currentChannel);

  const handleInviteMember = () => {
    dispatch(toggleEditChannelModal());
  };

  const handleInviteLink = () => {
    const inviteLink = `${window.location.origin}/join/channel/${user._id}/${channelId}`;
    navigator.clipboard.writeText(inviteLink);
  };

  const handleDeleteChannel = async () => {
    try {
      await deleteChannel(channelId);

      if (currentChannel._id === channelId) {
        dispatch(setCurrentChannel(null));
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleLeaveChannel = async () => {
    try {
      await leaveChannel(channelId);

      if (currentChannel._id === channelId) {
        dispatch(setCurrentChannel(null));
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <Menu placement="top">
      <MenuHandler>
        <button
          color="gray"
          size="sm"
          className="absolute right-2 top-1/2 transform -translate-y-1/2 z-[5] p-2 bg-gray-200 rounded-full hover:bg-gray-800 hover:text-white transition-colors"
        >
          <BsThreeDotsVertical />
        </button>
      </MenuHandler>

      <MenuList className="p-1">
        <MenuItem onClick={handleInviteMember}>Edit Channel</MenuItem>

        <MenuItem onClick={handleInviteLink}>Copy Invite Link</MenuItem>

        {isAdmin ? (
          <MenuItem onClick={handleDeleteChannel}>Delete Channel</MenuItem>
        ) : (
          <MenuItem onClick={handleLeaveChannel}>Leave Channel</MenuItem>
        )}
      </MenuList>
    </Menu>
  );
};

export default ChannelMenuBtn;
