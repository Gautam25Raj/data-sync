"use client";

import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { setContacts } from "@/redux/slice/contactSlice";

const ContactsSearch = () => {
  const dispatch = useDispatch();

  const originalContacts = useSelector(
    (state) => state.contact.originalContacts
  );
  const currentUser = useSelector((state) => state.user.user);

  const [input, setInput] = useState("");

  const handleSearch = (e) => {
    const searchValue = e.target.value;
    setInput(searchValue);

    if (searchValue.length <= 0) {
      dispatch(setContacts(originalContacts));
    } else {
      const filteredContacts = originalContacts.filter((contact) => {
        const user =
          contact.users[0]._id === currentUser.id
            ? contact.users[1].username
            : contact.users[0].username;

        return user
          .toString()
          .toLowerCase()
          .includes(searchValue.toLowerCase());
      });

      dispatch(setContacts(filteredContacts));
    }
  };

  return (
    <div className="flex items-center rounded-lg bg-gray-100 border border-gray-300 mb-3">
      <div className="flex justify-center items-center px-3 py-2">
        <MagnifyingGlassIcon className="h-5 w-5 text-primary-white" />

        <input
          type="text"
          value={input}
          placeholder="Search"
          onChange={handleSearch}
          className="bg-transparent outline-none text-base ml-3 w-full text-primary-white"
        />
      </div>
    </div>
  );
};

export default ContactsSearch;
