"use client";

import { Button, Tooltip } from "@material-tailwind/react";
import { UserPlusIcon } from "@heroicons/react/24/outline";

import { useDispatch } from "react-redux";

import { toggleNewContactModal } from "@/redux/slice/modalSlice";

const AddContactsBtn = () => {
  const dispatch = useDispatch();

  return (
    <Tooltip content="Add Contacts">
      <Button
        className="p-2.5 shadow-none hover:shadow-sm hover:scale-105 transition-all duration-200 ease-in-out"
        onClick={() => dispatch(toggleNewContactModal())}
      >
        <UserPlusIcon className="h-4 w-4 text-white" />
      </Button>
    </Tooltip>
  );
};

export default AddContactsBtn;
