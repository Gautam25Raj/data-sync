"use client";

import useChannel from "@/hooks/useChannel";
import {
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
} from "@material-tailwind/react";
import { useState } from "react";
import { MdKeyboardArrowUp } from "react-icons/md";
import { useSelector } from "react-redux";
import { toast } from "sonner";

const ChatAdminChannelMenu = () => {
  const { addContactToChannel } = useChannel();

  const [openMenu, setOpenMenu] = useState(false);

  const channels = useSelector((state) => state.channel.channels);
  const currentContact = useSelector((state) => state.contact.currentContact);

  const handleChannelClick = async (channelId, contactId) => {
    try {
      await addContactToChannel(channelId, contactId);
    } catch (err) {
      toast.error("Cannot add to channel!");
    }
  };

  return (
    <Menu
      placement="left-start"
      open={openMenu}
      handler={setOpenMenu}
      allowHover
      offset={15}
      className="bg-gray-50"
    >
      <MenuHandler className="flex items-center justify-between">
        <MenuItem>
          Add to channel
          <MdKeyboardArrowUp
            size={16}
            className={`transition-transform ${openMenu ? "-rotate-90" : ""}`}
          />
        </MenuItem>
      </MenuHandler>

      <MenuList>
        {channels.map((channel) => (
          <MenuItem
            key={channel._id}
            onClick={() => {
              handleChannelClick(channel._id, currentContact._id);
            }}
          >
            {channel.name}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
};

export default ChatAdminChannelMenu;
