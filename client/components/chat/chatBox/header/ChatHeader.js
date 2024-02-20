"use client";

import { IoMdArrowBack } from "react-icons/io";

import { Button } from "@material-tailwind/react";
import Avatar, { genConfig } from "react-nice-avatar";
import { useDispatch, useSelector } from "react-redux";

import { removeCurrentChannel, setIsadmin } from "@/redux/slice/channelSlice";
import {
  removeSelectedContact,
  updateLatestMessage,
} from "@/redux/slice/contactSlice";

import ChatAdminMenu from "./ChatAdminMenu";
import { clearMessages } from "@/redux/slice/messageSlice";
import ChatMenu from "./ChatMenu";

const HeaderLoader = () => {
  return (
    <>
      <div className="w-11 h-11 rounded-full bg-black/40 skeleton"></div>

      <div className="flex flex-col justify-center">
        <h3 className="h-5 w-24 bg-black/40 skeleton mb-1"></h3>

        <p className="flex items-center gap-2 text-primary-white/60">
          Public Key:
          <p className="bg-black/40 h-4 w-48 skeleton"></p>
        </p>
      </div>
    </>
  );
};

const ChatHeader = () => {
  const dispatch = useDispatch();

  const isGroup = useSelector((state) => state.contact.isGroup);

  const isAdmin = useSelector((state) => state.channel.isAdmin);

  const messages = useSelector((state) => state.message.messages);

  const currentContact = useSelector((state) => state.contact.currentContact);
  const currentChannel = useSelector((state) => state.channel.currentChannel);

  const handleBackClick = () => {
    dispatch(
      updateLatestMessage({
        message: messages[messages.length - 1],
        chatId: isGroup ? currentChannel?._id : currentContact?.chatId,
      })
    );
    dispatch(setIsadmin(true));
    dispatch(removeSelectedContact());
    dispatch(removeCurrentChannel());
    dispatch(clearMessages());
  };

  return (
    <div className="flex justify-between items-center w-full py-2 px-1 relative z-10 bg-white border-b rounded-xl shadow-xl border-gray-200">
      <div className="flex gap-3 px-2">
        <div className="relative flex items-center gap-2">
          <Button
            color="gray"
            variant="outlined"
            className="p-1 rounded border-gray-200 hover:bg-gray-100 hover:border-gray-300 transition-colors"
            onClick={handleBackClick}
          >
            <IoMdArrowBack size={16} color="black" />
          </Button>

          <Avatar
            style={{ width: "40px", height: "40px" }}
            {...genConfig(isGroup ? currentChannel?.name : currentContact?._id)}
          />

          {/* <div
              className={`absolute top-0.5 right-0 border rounded-full w-3 h-3 ${
                presence.clientId === user && presence.status === "enter"
                  ? "bg-green-300 border-green-700"
                  : "bg-red-400 border-red-800"
              }`}
            ></div> */}
        </div>

        <div className="flex flex-col justify-center">
          <h3 className="text-xl font-bold text-black">
            {isGroup ? currentChannel?.name : currentContact?.username}
          </h3>
        </div>
      </div>

      {isAdmin ? <ChatAdminMenu /> : <ChatMenu />}
    </div>
  );
};

export default ChatHeader;
