"use client";

import { useEffect, useState } from "react";

import { toast } from "sonner";
import { useSelector } from "react-redux";

import useContact from "@/hooks/useContact";

import ContactsItem from "./ContactsItem";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const Contacts = () => {
  const { fetchChats } = useContact();

  const [isLoading, setIsLoading] = useState(false);

  const contacts = useSelector((state) => state.contact.contacts);

  useEffect(() => {
    const initializeChats = async () => {
      try {
        setIsLoading(true);

        await fetchChats();

        setIsLoading(false);
      } catch (error) {
        toast.error("Error loading contacts");
      }
    };

    initializeChats();
  }, []);

  return (
    <div className="relative flex flex-grow">
      {isLoading ? (
        <p className="text-primary-white/60 z-10 absolute left-1/2 animate-spin mt-2">
          <AiOutlineLoading3Quarters size={24} />
        </p>
      ) : contacts.length === 0 ? (
        <p className="text-primary-white/60 py-2 text-center flex-1 h-fit bg-gray-100 rounded-lg mt-2">
          No contacts to show
        </p>
      ) : (
        <ul className="flex flex-col gap-1 flex-1 flex-grow">
          {contacts.map((chat, index) => (
            <ContactsItem key={index} chat={chat} />
          ))}
        </ul>
      )}
    </div>
  );
};

export default Contacts;
