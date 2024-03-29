"use client";

import { AiOutlineLoading3Quarters } from "react-icons/ai";

import { useSelector } from "react-redux";

import ChannelsItem from "./ChannelsItem";

const Channels = ({ isLoading }) => {
  const channels = useSelector((state) => state.channel.channels);
  const joinedChannels = useSelector((state) => state.channel.joinedChannels);

  return (
    <div className="relative flex flex-col flex-1 flex-grow space-y-2">
      <div className="space-y-1">
        <p className="text-sm text-gray-500">Your Channel Groups</p>

        {isLoading && channels ? (
          <p className="text-primary-white/60 z-10 absolute left-1/2 animate-spin mt-2">
            <AiOutlineLoading3Quarters size={24} />
          </p>
        ) : channels.length === 0 ? (
          <p className="text-primary-white/60 py-2 text-center flex-1 h-fit bg-gray-100 rounded-lg mt-2">
            No channels to show.
          </p>
        ) : (
          <div className="flex flex-col gap-1 flex-1 flex-grow">
            {channels.map((channel, index) => (
              <ChannelsItem key={index} channel={channel} admin={true} />
            ))}
          </div>
        )}
      </div>

      <div className="space-y-1 flex flex-col flex-1 flex-grow overflow-hidden">
        <p className="text-sm text-gray-500">Joined Channel Groups</p>

        {isLoading ? (
          <p className="text-primary-white/60 z-10 absolute left-1/2 animate-spin mt-2">
            <AiOutlineLoading3Quarters size={24} />
          </p>
        ) : joinedChannels?.length === 0 ? (
          <p className="text-primary-white/60 p-2 text-center h-fit bg-gray-100 rounded-lg mt-2">
            No joined channels.
          </p>
        ) : (
          <ul className="flex flex-col gap-1 flex-1 flex-grow overflow-y-auto hide-scroll">
            {joinedChannels?.map((channel, index) => (
              <ChannelsItem key={index} channel={channel} admin={false} />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Channels;
