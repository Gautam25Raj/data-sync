"use client";

import { useDispatch } from "react-redux";
import { Button } from "@material-tailwind/react";

import { toggleGroup } from "@/redux/slice/contactSlice";

const ContactsBtn = () => {
  const dispatch = useDispatch();

  const handleContactGroup = () => {
    dispatch(toggleGroup());
  };

  return <Button onClick={handleContactGroup}>Contacts</Button>;
};

export default ContactsBtn;
