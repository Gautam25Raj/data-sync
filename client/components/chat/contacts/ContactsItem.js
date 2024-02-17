"use client";

import { ChevronRightIcon } from "@heroicons/react/24/outline";

import { toast } from "sonner";
import { useEffect, useState } from "react";
import Avatar, { genConfig } from "react-nice-avatar";
import { useDispatch, useSelector } from "react-redux";

// import {
//   setSelectedContact,
//   setSelectedPresence,
// } from "@/redux/slice/contactsSlice";

const ContactsItem = ({ chat }) => {
  let flag = true;
  const dispatch = useDispatch();

  const [user, setUser] = useState(null);
  const [status, setStatus] = useState(null);
  const [message, setMessage] = useState(null);

  const currentUser = useSelector((state) => state.user.user);

  useEffect(() => {
    if (chat.users[0]._id === currentUser.id) {
      setUser(chat.users[1]);
    } else {
      setUser(chat.users[0]);
    }
  }, [chat]);

  // useEffect(() => {
  //   const channel = ablyAuth.channels.get(`chatId-${user}`);

  //   const enterCallback = (presence) => {
  //     console.log(presence);
  //     if (presence.clientId === user) {
  //       setStatus("enter");
  //       dispatch(
  //         setSelectedPresence({
  //           status: "enter",
  //           clientId: user,
  //         })
  //       );
  //     }
  //   };

  //   const leaveCallback = (presence) => {
  //     if (presence.clientId === user) {
  //       setStatus("leave");
  //       dispatch(
  //         setSelectedPresence({
  //           status: "leave",
  //           clientId: user,
  //         })
  //       );
  //     }
  //   };

  //   channel.presence.subscribe("enter", enterCallback);
  //   channel.presence.subscribe("leave", leaveCallback);

  //   channel.presence.get((err, presences) => {
  //     if (err) {
  //       console.error("Error getting presence set:", err);
  //       return;
  //     }

  //     const isUserOnline = presences.some(
  //       (presence) => presence.clientId === user
  //     );
  //     if (isUserOnline) {
  //       setStatus("enter");
  //       dispatch(
  //         setSelectedPresence({
  //           status: "enter",
  //           clientId: user,
  //         })
  //       );
  //     }
  //   });

  //   return () => {
  //     channel.presence.unsubscribe("enter", enterCallback);
  //     channel.presence.unsubscribe("leave", leaveCallback);
  //     channel.presence.leave();
  //   };
  // }, [user]);

  const handleContactClick = () => {
    dispatch(setSelectedContact(chat));
  };

  return (
    <li
      className="flex justify-between items-center px-2 py-1 hover:bg-gray-100 cursor-pointer rounded-lg"
      onClick={handleContactClick}
    >
      <div className="flex items-center my-2">
        <div className="w-10 h-10 mr-3 relative">
          <Avatar
            style={{ width: "40px", height: "40px" }}
            {...genConfig(user ? user.username : "user")}
          />
        </div>

        <div>
          <h3 className="text-base font-bold text-black">{user?.username}</h3>

          <div className="text-xs font-medium w-28 hide-scroll overflow-hidden whitespace-nowrap scroll-on-hover">
            {chat?.latestMessage?.content}
          </div>
        </div>
      </div>

      <ChevronRightIcon className="h-5 w-5 text-black" />
    </li>
  );
};

export default ContactsItem;
