"use client";

import Link from "next/link";
import { Card } from "@material-tailwind/react";
import Contacts from "./contacts/Contacts";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import AddContactsBtn from "./contacts/AddContactsBtn";
import ContactsSearch from "./contacts/ContactsSearch";

const Chat = () => {
  return (
    <div className="sticky h-screen top-0 py-2 ml-2 w-full min-w-fit max-w-72">
      <Card className="h-full space-y-3 overflow-y-auto rounded-xl px-5 py-4 hide-scrollbar bg-white">
        <div className="flex items-center justify-between w-full mb-3">
          <div className="flex gap-1 items-center">
            <Link
              href="/dashboard"
              className="p-1 border rounded hover:bg-gray-200 transition-colors"
            >
              <ArrowLeftIcon className="w-4 h-4 text-black" />
            </Link>

            <h2 className="text-2xl font-bold text-black">Contacts</h2>
          </div>

          <AddContactsBtn />
        </div>

        <ContactsSearch />

        <div className="h-[calc(100vh-136px)] flex flex-col overflow-hidden relative">
          <div className="overflow-y-auto hide-scroll h-full">
            <Contacts />
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Chat;
