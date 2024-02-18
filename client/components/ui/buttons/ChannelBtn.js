"use client";

import { CloudIcon } from "@heroicons/react/24/outline";

import { useEffect, useState } from "react";

import useChannel from "@/hooks/useChannel";

import SideNavItem from "@/components/sidebar/SideNavItem";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { setCurrentChannel } from "@/redux/slice/channelSlice";

const ChannelBtn = ({ activeItem, handleItemClick }) => {
  const dispatch = useDispatch();

  const { getChannels, getJoinedChannels } = useChannel();

  const [loading, setLoading] = useState(true);

  const channels = useSelector((state) => state.channel.channels);

  useEffect(() => {
    getChannels().then(() => {
      setLoading(false);
    });
  }, []);

  const handleChannelClick = (channel) => {
    handleItemClick(channel._id);
    dispatch(setCurrentChannel(channel));
  };

  return (
    <>
      <p className="text-sm text-gray-500">Channels</p>

      {loading ? (
        <AiOutlineLoading3Quarters className="mx-auto animate-spin" />
      ) : channels.length === 0 ? (
        <p className="text-gray-700 cursor-default w-full bg-gray-100 rounded text-center py-2 prevent-select">
          No Channel{" "}
        </p>
      ) : (
        channels.map((channel) => (
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

export default ChannelBtn;
