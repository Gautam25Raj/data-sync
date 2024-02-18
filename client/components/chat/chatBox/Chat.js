"use client";

import { AiOutlineLoading3Quarters } from "react-icons/ai";

import { toast } from "sonner";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";

import useMessage from "@/hooks/useMessage";

import MessageWithDate from "../message/MessageWithDate";

// import { addMessage, setMessages } from "@/redux/slice/contactsSlice";

const Chat = () => {
  const { fetchChatMessages, fetchChannelMessages } = useMessage();

  const [loading, setLoading] = useState(false);

  const isGroup = useSelector((state) => state.contact.isGroup);
  const messages = useSelector((state) => state.message.messages);
  const currentContact = useSelector((state) => state.contact.currentContact);
  const currentChannel = useSelector((state) => state.channel.currentChannel);

  const initializeChat = async () => {
    try {
      setLoading(true);

      if (isGroup) {
        await fetchChannelMessages(currentChannel._id);
      } else {
        await fetchChatMessages(currentContact.chatId);
      }

      setLoading(false);
    } catch (err) {
      toast.error("Error fetching chat history");
    }
  };

  useEffect(() => {
    if (!currentContact && !currentChannel) return;

    initializeChat();
  }, [currentContact, currentChannel]);

  // useEffect(() => {
  //   const authCallback = (tokenParams, callback) => {
  //     fetch(
  //       `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/ably/auth/${currentUser.pubKey}`
  //     )
  //       .then((response) => response.json())
  //       .then((tokenDetails) => {
  //         dispatch(setAbly(tokenDetails));
  //         callback(null, tokenDetails);
  //       })
  //       .catch((err) => {
  //         callback(err, null);
  //       });
  //   };

  //   const realtime = new Ably.Realtime({ authCallback });
  //   dispatch(setAblyAuth(realtime));

  //   const setAblyClient = async () => {
  //     const response = await axios.get(
  //       `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/ably/auth/${currentUser.pubKey}`
  //     );

  //     dispatch(setAbly(response.data));
  //   };

  //   setAblyClient();

  //   const channel = realtime.channels.get(`chatId-${currentUser.pubKey}`);
  //   channel.presence.enter();

  //   return () => {
  //     channel.presence.leave();
  //     axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/ably/disconnect`);
  //     dispatch(setAbly(null));
  //   };
  // }, []);

  // useEffect(() => {
  //   if (!currentContact) return;

  //   setLoading(true);

  //   const channel = ablyAuth.channels.get(`chatId-${currentContact._id}`);

  //   channel.subscribe((message) => {
  //     dispatch(addMessage(message.data));
  //   });

  //   initializeChat();

  //   return () => {
  //     channel.unsubscribe();
  //   };
  // }, [currentContact]);

  return (
    <div
      className={`absolute flex-col-reverse flex w-full top-0 left-0 h-full overflow-y-auto hide-scroll px-3 py-4`}
    >
      {loading ? (
        <div className="text-primary-white/60 z-10 w-fit mx-auto h-full">
          <div className="bg-white text-black/60 p-2 mb-4 rounded-full">
            <AiOutlineLoading3Quarters className="animate-spin" size={24} />
          </div>
        </div>
      ) : messages?.length === 0 ? (
        <div className="flex text-white mt-2 items-start h-full">
          <p className="text-sm text-center flex mx-auto bg-gray-800 py-2 rounded-lg px-6 h-fit">
            Don't Share any personal information. This is a demo app. Messages
            are not encrypted.
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-1 z-10">
          {messages?.map((message, index, arr) => (
            <MessageWithDate
              key={index}
              index={index}
              message={message}
              nextMessage={arr[index + 1]}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Chat;
