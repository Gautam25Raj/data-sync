"use client";

import React from "react";
import { useSelector } from "react-redux";

const MessageWithDate = ({ message, nextMessage, index }) => {
  const currentUser = useSelector((state) => state.user.user);
  const isGroup = useSelector((state) => state.contact.isGroup);

  const messageDate = new Date(message.createdAt).toLocaleDateString();
  const messageTime = new Date(message.createdAt).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  const nextMessageDate = nextMessage
    ? new Date(nextMessage.createdAt).toLocaleDateString()
    : null;

  const currentUserIsSender =
    currentUser._id === (isGroup ? message.sender._id : message.sender);

  return (
    <div>
      {index === 0 && (
        <div className="flex justify-center text-xs text-black/60 font-bold my-2">
          <div className="bg-gray-50 w-fit px-4 py-2 rounded-2xl">
            {messageDate}
          </div>
        </div>
      )}

      <div
        className={`flex ${
          currentUserIsSender ? "justify-end" : "justify-start"
        }`}
      >
        <div
          className={`text-sm text-primary-black px-2 py-1 rounded-2xl font-medium w-fit flex gap-1 ${
            currentUserIsSender
              ? "bg-gray-900 rounded-tr-none text-white border-black"
              : "bg-gray-200 rounded-tl-none text-black border-white"
          }`}
        >
          <div
            className={`rounded-lg px-1 ${
              currentUserIsSender ? "rounded-tr-none" : "rounded-tl-none"
            } overflow-hidden`}
          >
            {currentUser._id !== message.sender._id && isGroup && (
              <div className="text-[10px] leading-normal mb-0.5 text-gray-500 prevent-select text-left">
                {message.sender.username}
              </div>
            )}

            <div className="flex gap-4 items-end">
              <p className="max-w-[240px] break-all">{message.content}</p>

              <div
                className={`text-[10px] leading-none text-gray-500 prevent-select ${
                  currentUserIsSender ? "text-right" : "text-left"
                }`}
              >
                {messageTime}
              </div>
            </div>
          </div>
        </div>
      </div>

      {nextMessageDate && messageDate !== nextMessageDate && (
        <div className="flex justify-center text-xs text-black/60 font-bold my-2">
          <div className="bg-gray-200 w-fit p-2 rounded-2xl">
            {nextMessageDate}
          </div>
        </div>
      )}
    </div>
  );
};

export default MessageWithDate;
