"use client";

import { Card } from "@material-tailwind/react";

import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

import useChannel from "@/hooks/useChannel";
import useContact from "@/hooks/useContact";

import ChatBox from "./chatBox/ChatBox";

import Contacts from "./contacts/Contacts";
import Channels from "./channels/Channels";
import AddContactsBtn from "./contacts/AddContactsBtn";
import ContactsSearch from "./contacts/ContactsSearch";
import ChannelsSearch from "./channels/ChannelsSearch";

import ContactsBtn from "../ui/buttons/ContactsBtn";
import ChannelGroupBtn from "../ui/buttons/ChannelGroupBtn";

const ChatContainer = () => {
  const { fetchChats } = useContact();
  const { getJoinedChannels } = useChannel();

  const [isChannelLoading, setIsChannelLoading] = useState(true);
  const [isContactLoading, setIsContactLoading] = useState(true);

  const isGroup = useSelector((state) => state.contact.isGroup);
  const currentContact = useSelector((state) => state.contact.currentContact);
  const currentChannel = useSelector((state) => state.channel.currentChannel);

  useEffect(() => {
    const initializeChats = async () => {
      try {
        setIsContactLoading(true);

        await fetchChats();

        setIsContactLoading(false);
      } catch (error) {
        toast.error("Error loading contacts");
      }
    };

    initializeChats();
  }, []);

  useEffect(() => {
    const initializeChannels = async () => {
      try {
        setIsChannelLoading(true);

        await getJoinedChannels();

        setIsChannelLoading(false);
      } catch (error) {
        toast.error("Error loading channels");
      }
    };

    initializeChannels();
  }, []);

  return (
    <div className="sticky h-screen top-0 py-2 ml-2 w-full min-w-fit max-w-72 z-20">
      {currentContact || currentChannel ? (
        <Card className="h-full space-y-3 overflow-y-auto rounded-xl hide-scrollbar bg-white w-80">
          <ChatBox />
        </Card>
      ) : (
        <Card className="h-full space-y-3 overflow-y-auto rounded-xl px-5 py-4 hide-scrollbar bg-white">
          <div className="flex items-center justify-between w-full mb-3">
            <h2 className="text-2xl font-bold text-black">
              {isGroup ? "Channel Groups" : "Contacts"}
            </h2>

            {!isGroup && <AddContactsBtn />}
          </div>

          {!isGroup ? <ContactsSearch /> : <ChannelsSearch />}

          {isGroup ? <ContactsBtn /> : <ChannelGroupBtn />}

          <div className="flex flex-col overflow-hidden relative flex-grow">
            <div className="overflow-y-auto hide-scroll flex flex-grow">
              {isGroup ? (
                <Channels isLoading={isChannelLoading} />
              ) : (
                <Contacts isLoading={isContactLoading} />
              )}
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};

export default ChatContainer;
