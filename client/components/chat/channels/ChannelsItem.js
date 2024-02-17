"use client";

import { ChevronRightIcon } from "@heroicons/react/24/outline";

import { toast } from "sonner";
import { useEffect, useState } from "react";
import Avatar, { genConfig } from "react-nice-avatar";
import { useDispatch, useSelector } from "react-redux";

const ChannelsItem = ({ channel }) => {
  const dispatch = useDispatch();

  const [user, setUser] = useState(null);
  const [status, setStatus] = useState(null);

  const currentUser = useSelector((state) => state.user.user);

  const handleContactClick = () => {};

  return (
    <li
      className="flex justify-between items-center px-2 py-1 hover:bg-gray-100 cursor-pointer rounded-lg"
      onClick={handleContactClick}
    >
      <div className="flex items-center my-2">
        <div className="w-10 h-10 mr-3 relative">
          <Avatar
            style={{ width: "40px", height: "40px" }}
            {...genConfig(channel ? channel.name : "user")}
          />
        </div>

        <div>
          <h3 className="text-base font-bold text-black">{channel.name}</h3>

          <div className="text-xs font-medium w-full hide-scroll overflow-hidden whitespace-nowrap scroll-on-hover">
            Number of Members: {channel.users.length}
          </div>
        </div>
      </div>

      <ChevronRightIcon className="h-5 w-5 text-black" />
    </li>
  );
};

export default ChannelsItem;
