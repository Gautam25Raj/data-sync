"use client";

import { Card } from "@material-tailwind/react";

import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

import useChannel from "@/hooks/useChannel";
import useContact from "@/hooks/useContact";

import Contacts from "./contacts/Contacts";
import Channels from "./channels/Channels";
import AddContactsBtn from "./contacts/AddContactsBtn";
import ContactsSearch from "./contacts/ContactsSearch";

import ContactsBtn from "../ui/buttons/ContactsBtn";
import ChannelGroupBtn from "../ui/buttons/ChannelGroupBtn";
import SendMessageContainer from "./message/SendMessageContainer";

const ChatContainer = () => {
  const { fetchChats } = useContact();
  const { getJoinedChannels } = useChannel();

  const [isChannelLoading, setIsChannelLoading] = useState(true);
  const [isContactLoading, setIsContactLoading] = useState(true);

  const isGroup = useSelector((state) => state.contact.isGroup);

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
    <div className="sticky h-screen top-0 py-2 ml-2 w-full min-w-fit max-w-72">
      <Card className="h-full space-y-3 overflow-y-auto rounded-xl px-5 py-4 hide-scrollbar bg-white">
        <div className="flex items-center justify-between w-full mb-3">
          <h2 className="text-2xl font-bold text-black">
            {isGroup ? "Channel Groups" : "Contacts"}
          </h2>

          {!isGroup && <AddContactsBtn />}
        </div>

        {!isGroup ? <ContactsSearch /> : <ContactsSearch />}

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

        <SendMessageContainer />
      </Card>
    </div>
  );
};

export default ChatContainer;
