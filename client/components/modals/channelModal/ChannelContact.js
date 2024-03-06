"use client";

import { PlusIcon } from "@heroicons/react/24/solid";

import { toast } from "sonner";
import Avatar, { genConfig } from "react-nice-avatar";

const ChannelContact = ({ username, id, setChannelUsers, channelUsers }) => {
  const handleAddContact = async () => {
    try {
      if (channelUsers === "") return setChannelUsers(username);

      setChannelUsers((prev) => `${prev}, ${username}`);
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="flex w-full rounded-lg px-4 py-3 bg-gray-50">
      <div className="flex justify-between items-center w-full">
        <div className="flex gap-3 items-center relative justify-between w-full">
          <div className="flex gap-3 items-center">
            <Avatar
              style={{ width: "2rem", height: "2rem" }}
              {...genConfig(id)}
              className=""
            />

            <p className="text-sm text-black font-medium">{username}</p>
          </div>

          <button
            className="flex justify-center items-center p-2 rounded-full w-8 bg-black"
            onClick={handleAddContact}
          >
            <PlusIcon className="h-4 w-4 text-white" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChannelContact;
