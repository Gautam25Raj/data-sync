"use client";

import { useSelector } from "react-redux";
import { DialogBody, Typography } from "@material-tailwind/react";

import ChannelContact from "./ChannelContact";

const RightChannelModal = ({ channelUsers, setChannelUsers }) => {
  const currentUser = useSelector((state) => state.user.user);
  const contacts = useSelector((state) => state.contact.contacts);

  const channelUsersArray = channelUsers.split(",").map((user) => user.trim());

  const availableContacts = contacts.filter((contact) => {
    const contactName =
      contact.users[0]._id === currentUser._id
        ? contact.users[1].username
        : contact.users[0].username;

    return !channelUsersArray.includes(contactName);
  });

  return (
    <div className="flex-1">
      <DialogBody>
        <Typography
          className="mb-10 -mt-10 text-lg text-md"
          color="gray"
          variant="lead"
        >
          Add contacts to your channel
        </Typography>

        <div className="overflow-y-auto max-h-72 hide-scroll space-y-2">
          {availableContacts.map((contact) => (
            <ChannelContact
              key={contact._id}
              username={
                contact.users[0]._id === currentUser._id
                  ? contact.users[1].username
                  : contact.users[0].username
              }
              id={contact._id}
              channelUsers={channelUsers}
              setChannelUsers={setChannelUsers}
            />
          ))}
        </div>
      </DialogBody>
    </div>
  );
};

export default RightChannelModal;
