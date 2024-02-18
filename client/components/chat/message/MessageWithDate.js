"use client";

import React from "react";
import { useSelector } from "react-redux";

const MessageWithDate = ({ message, nextMessage, index }) => {
  const currentUser = useSelector((state) => state.user.user);

  const messageDate = new Date(message.createdAt).toLocaleDateString();
  const messageTime = new Date(message.createdAt).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  const nextMessageDate = nextMessage
    ? new Date(nextMessage.createdAt).toLocaleDateString()
    : null;

  return (
    <div>
      {index === 0 && (
        <div className="flex justify-center text-xs text-black/60 font-bold my-2">
          <div className="bg-white w-fit p-2 rounded-2xl">{messageDate}</div>
        </div>
      )}

      <div
        className={`flex ${
          currentUser.pubKey === message.sender
            ? "justify-end"
            : "justify-start"
        }`}
      >
        <div
          className={`text-sm text-primary-black px-3 py-1 rounded-2xl font-medium w-fit flex gap-1 ${
            currentUser.pubKey === message.sender
              ? "bg-gray-900 rounded-tr-none text-white border-black"
              : "bg-white rounded-tl-none text-black border-white"
          }`}
        >
          <div
            className={`rounded-lg ${
              currentUser.pubKey === message.sender
                ? "rounded-tr-none"
                : "rounded-tl-none"
            } overflow-hidden`}
          >
            <p className="max-w-[260px] break-all">{message.content}</p>

            <div
              className={`text-xs text-gray-500 prevent-select ${
                currentUser.pubKey === message.sender
                  ? "text-right"
                  : "text-left"
              }`}
            >
              {messageTime}
            </div>
          </div>
        </div>
      </div>

      {nextMessageDate && messageDate !== nextMessageDate && (
        <div className="flex justify-center text-xs text-black/60 font-bold my-2">
          <div className="bg-white w-fit p-2 rounded-2xl">
            {nextMessageDate}
          </div>
        </div>
      )}
    </div>
  );
};

export default MessageWithDate;
