"use client";

import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { setSearchedJoinedChannels } from "@/redux/slice/channelSlice";

const ChannelsSearch = () => {
  const dispatch = useDispatch();

  const joinedChannels = useSelector((state) => state.channel.joinedChannels);

  const [input, setInput] = useState("");

  const handleSearch = (e) => {
    const searchValue = e.target.value;
    setInput(searchValue);

    if (searchValue.length <= 0) {
      dispatch(setSearchedJoinedChannels(joinedChannels));
    } else {
      const filteredChannel = joinedChannels.filter((channel) =>
        channel.name
          .toString()
          .toLowerCase()
          .includes(searchValue.toLowerCase())
      );

      dispatch(setSearchedJoinedChannels(filteredChannel));
    }
  };

  return (
    <div className="flex items-center rounded-lg bg-gray-100 border border-gray-300 mb-3">
      <div className="flex justify-center items-center px-3 py-2">
        <MagnifyingGlassIcon className="h-5 w-5 text-primary-white" />

        <input
          type="text"
          value={input}
          placeholder="Search"
          onChange={handleSearch}
          className="bg-transparent outline-none text-base ml-3 w-full text-primary-white"
        />
      </div>
    </div>
  );
};

export default ChannelsSearch;
