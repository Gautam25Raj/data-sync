"use client";

import { IoMdSend } from "react-icons/io";
import { Button } from "@material-tailwind/react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

import { toast } from "sonner";
import { useChannel } from "ably/react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";

import useMessage from "@/hooks/useMessage";

import { addMessage } from "@/redux/slice/messageSlice";

const MessageInput = () => {
  const dispatch = useDispatch();

  const { createChatMessage, createChannelMessage } = useMessage();

  const textareaRef = useRef(null);

  const [message, setMessage] = useState("");
  const [disabled, setDisabled] = useState(false);

  const user = useSelector((state) => state.user.user);

  const isGroup = useSelector((state) => state.contact.isGroup);
  const currentContact = useSelector((state) => state.contact.currentContact);
  const currentChannel = useSelector((state) => state.channel.currentChannel);

  const { channel } = useChannel(
    `chatId-${isGroup ? currentChannel._id : currentContact.chatId}`,
    (message) =>
      dispatch(
        addMessage({
          sender: isGroup
            ? { _id: message.clientId, username: message.data.sender }
            : message.clientId,
          content: message.data.content,
          chatId: isGroup ? currentChannel._id : currentContact.chatId,
          createdAt: new Date(message.timestamp).toISOString(),
        })
      )
  );

  useEffect(() => {
    if (textareaRef.current.scrollHeight < 224) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [message]);

  const sendMessage = async (e) => {
    e.preventDefault();

    try {
      if (!currentContact && !currentChannel) {
        toast.error("Please select a contact first.");
        return;
      }

      if (!message) {
        toast.error("Message cannot be empty.");
        return;
      }

      setDisabled(true);

      if (isGroup) {
        channel.publish({
          data: {
            content: message,
            sender: user.username,
          },
        });
        createChannelMessage(currentChannel._id, message);
      } else {
        channel.publish({ data: { content: message } });
        createChatMessage(currentContact.chatId, message);
      }

      setMessage("");
      setDisabled(false);
    } catch (error) {
      toast.error("Error sending message.");
    }
  };

  return (
    <form className="w-full flex justify-between items-center pr-2 gap-2 bg-white">
      <textarea
        ref={textareaRef}
        placeholder="Type your message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        disabled={disabled}
        rows={1}
        className="bg-transparent flex-1 text-black focus:outline-none text-primary-white placeholder:text-gray-700 disabled:cursor-not-allowed disabled:opacity-50"
        style={{ resize: "none", overflow: "hidden" }}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            sendMessage(e);
          }
        }}
      />

      <Button
        type="submit"
        className={`bg-black h-fit rounded-full p-2`}
        onClick={(e) => sendMessage(e)}
        disabled={disabled || message === ""}
      >
        {disabled ? (
          <AiOutlineLoading3Quarters
            size={16}
            color="white"
            className="animate-spin"
          />
        ) : (
          <IoMdSend className="h-4 w-4 text-white pl-0.5" />
        )}
      </Button>
    </form>
  );
};

export default MessageInput;
