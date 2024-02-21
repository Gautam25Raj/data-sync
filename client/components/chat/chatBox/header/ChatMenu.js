"use client";

import {
  Menu,
  MenuHandler,
  Dialog,
  MenuList,
  MenuItem,
  DialogBody,
  Button,
  DialogFooter,
  DialogHeader,
} from "@material-tailwind/react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

import { toast } from "sonner";
import { useState } from "react";
import { TbDots } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";

import useChannel from "@/hooks/useChannel";

import { toggleConfirmModal } from "@/redux/slice/modalSlice";
import { removeCurrentChannel } from "@/redux/slice/channelSlice";

const ConfirmModal = ({ isLoading, action, type, handleConfirm }) => {
  const dispatch = useDispatch();

  const open = useSelector((state) => state.modal.confirmModal);

  const handleOpen = () => {
    dispatch(toggleConfirmModal());
  };

  return (
    <Dialog open={open} size="xs" handler={handleOpen}>
      <DialogHeader>{action + " " + type}</DialogHeader>

      <DialogBody className="-mt-7">
        Are you sure you want to {action} this {type}? This action cannot be
        undone.
      </DialogBody>

      <DialogFooter>
        <Button
          variant="outlined"
          color="red"
          onClick={handleOpen}
          className="mr-1"
        >
          <span>Cancel</span>
        </Button>

        <Button variant="gradient" color="green" onClick={handleConfirm}>
          <span>
            {isLoading ? (
              <AiOutlineLoading3Quarters className="w-4" />
            ) : (
              "Confirm"
            )}
          </span>
        </Button>
      </DialogFooter>
    </Dialog>
  );
};

const ChatMenu = () => {
  const dispatch = useDispatch();

  const { leaveChannel } = useChannel();

  const [modalType, setModalType] = useState("");
  const [modalAction, setModalAction] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const currentChannel = useSelector((state) => state.channel.currentChannel);

  const handleLeaveChannel = () => {
    setModalType("Channel");
    setModalAction("Leave");
    dispatch(toggleConfirmModal());
  };

  const handleConfirm = async () => {
    try {
      setIsLoading(true);

      await leaveChannel(currentChannel._id);

      dispatch(removeCurrentChannel());
      setIsLoading(false);
      dispatch(toggleConfirmModal());
    } catch (err) {
      toast.error("Something went wrong!");
      setIsLoading(false);
    }
  };

  return (
    <>
      <Menu placement="bottom-end">
        <MenuHandler>
          <Button
            variant="text"
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            <TbDots size={20} />
          </Button>
        </MenuHandler>

        <MenuList className="p-1">
          <MenuItem onClick={handleLeaveChannel}>Leave Channel</MenuItem>
        </MenuList>
      </Menu>

      <ConfirmModal
        type={modalType}
        action={modalAction}
        isLoading={isLoading}
        handleConfirm={handleConfirm}
      />
    </>
  );
};

export default ChatMenu;
