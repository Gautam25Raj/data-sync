"use client";

import { CloudIcon } from "@heroicons/react/24/outline";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

import useChannel from "@/hooks/useChannel";

import { setCurrentChannel, setIsadmin } from "@/redux/slice/channelSlice";
import { removeSelectedContact, setGroup } from "@/redux/slice/contactSlice";

import SideNavItem from "@/components/sidebar/SideNavItem";

const ChannelJoinedBtn = ({ activeItem, handleItemClick }) => {
  const dispatch = useDispatch();

  const { getJoinedChannels } = useChannel();

  const [loading, setLoading] = useState(true);

  const joinedChannels = useSelector((state) => state.channel.joinedChannels);

  useEffect(() => {
    getJoinedChannels().then(() => {
      setLoading(false);
    });
  }, []);

  const handleChannelClick = (channel) => {
    handleItemClick(channel._id);
    dispatch(setGroup(true));
    dispatch(setIsadmin(false));
    dispatch(removeSelectedContact());
    dispatch(setCurrentChannel(channel));
  };

  return (
    <>
      <p className="text-sm text-gray-500">Joined Channels</p>

      {loading ? (
        <AiOutlineLoading3Quarters className="mx-auto animate-spin" />
      ) : joinedChannels.length === 0 ? (
        <p className="text-gray-700 cursor-default w-full bg-gray-100 rounded text-center py-2 prevent-select">
          No joined channels{" "}
        </p>
      ) : (
        joinedChannels.map((channel) => (
          <SideNavItem
            key={channel._id}
            label={channel.name}
            href={`/channel/${channel._id}`}
            icon={<CloudIcon className="text-black bg-black" />}
            active={activeItem === channel._id}
            onClick={() => handleChannelClick(channel)}
          />
        ))
      )}
    </>
  );
};

export default ChannelJoinedBtn;
