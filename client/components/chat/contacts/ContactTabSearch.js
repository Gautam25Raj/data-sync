"use client";

import { IoCheckmark } from "react-icons/io5";
import { DocumentDuplicateIcon, PlusIcon } from "@heroicons/react/24/solid";

import { toast } from "sonner";
import { useState } from "react";
import { useSelector } from "react-redux";
import Avatar, { genConfig } from "react-nice-avatar";

import useContact from "@/hooks/useContact";

export default function ContactTabSearch({ username, email, id }) {
  const { createChats } = useContact();
  const currentUser = useSelector((state) => state.user.user);

  if (currentUser.email === email) return <p>No user found</p>;

  const [chatCreated, setChatCreated] = useState(false);

  const handleAddContact = async () => {
    try {
      await createChats(id, "");
      setChatCreated(true);
      setTimeout(() => setChatCreated(false), 1000);
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="flex w-full rounded-lg px-4 py-3 bg-gray-50">
      <div className="flex justify-between items-center w-full">
        <div className="flex gap-3 items-center relative justify-between w-full">
          <div className="flex gap-3 items-center">
            <Avatar
              style={{ width: "2rem", height: "2rem" }}
              {...genConfig(id)}
              className=""
            />

            <div className="flex flex-col justify-center">
              <p className="text-sm text-black font-medium">{username}</p>

              <button
                className="text-black flex flex-start items-center text-[12px] hover:cursor-pointer"
                onClick={() => {
                  navigator.clipboard.writeText(email);
                  toast.success("Email copied to clipboard");
                }}
              >
                {email}
                <DocumentDuplicateIcon className="w-3 h-3 ml-1" />
              </button>
            </div>
          </div>

          <button
            className="flex justify-center items-center p-2 rounded-full w-8"
            style={{
              backgroundColor: chatCreated ? "#1a1a1a" : "#000",
            }}
            // style={{
            //   background: "linear-gradient(90deg, #4AFF93 0%, #26FFFF 100%)",
            // }}
            onClick={handleAddContact}
          >
            {chatCreated ? (
              <IoCheckmark className="h-4 w-4 text-green-300" />
            ) : (
              <PlusIcon className="h-4 w-4 text-white" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
