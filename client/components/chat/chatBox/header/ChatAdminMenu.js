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
import { MdKeyboardArrowUp } from "react-icons/md";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

import { toast } from "sonner";
import { useState } from "react";
import { TbDots } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";

import useMessage from "@/hooks/useMessage";
import useContact from "@/hooks/useContact";
import useChannel from "@/hooks/useChannel";

import {
  deleteContact,
  removeSelectedContact,
} from "@/redux/slice/contactSlice";
import {
  deleteChannel as deleteCurrentChannel,
  removeCurrentChannel,
} from "@/redux/slice/channelSlice";
import { clearMessages } from "@/redux/slice/messageSlice";
import { toggleConfirmModal } from "@/redux/slice/modalSlice";

import ChatAdminChannelMenu from "./ChatAdminChannelMenu";

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

const ChatAdminMenu = () => {
  const dispatch = useDispatch();

  const { deleteChat } = useContact();
  const { deleteChannel } = useChannel();
  const { deleteChatMessages, deleteChannelMessages } = useMessage();

  const [modalType, setModalType] = useState("");
  const [modalAction, setModalAction] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const isGroup = useSelector((state) => state.contact.isGroup);

  const messages = useSelector((state) => state.message.messages);

  const currentContact = useSelector((state) => state.contact.currentContact);
  const currentChannel = useSelector((state) => state.channel.currentChannel);

  const chat = isGroup ? "Channel" : "Contact";

  const handleClearMessage = () => {
    if (messages.length === 0) {
      toast.error("No messages to delete");
      return;
    }

    setModalAction("Delete all");
    setModalType("Message");
    dispatch(toggleConfirmModal());
  };

  const handleDeleteContact = () => {
    setModalType("Contact");
    setModalAction("Delete");
    dispatch(toggleConfirmModal());
  };

  const handleDeleteChannel = () => {
    setModalType("Channel");
    setModalAction("Delete");
    dispatch(toggleConfirmModal());
  };

  const handleConfirm = async () => {
    try {
      setIsLoading(true);

      if (modalAction === "Delete all" && modalType === "Message") {
        if (isGroup) {
          await deleteChannelMessages(currentChannel._id);
        } else {
          await deleteChatMessages(currentContact.chatId);
        }

        dispatch(clearMessages());
      } else if (modalAction === "Delete" && modalType === "Contact") {
        await deleteChat(currentContact.chatId);
        dispatch(removeSelectedContact());
        dispatch(deleteContact(currentContact.chatId));
      } else if (modalAction === "Delete" && modalType === "Channel") {
        await deleteChannel(currentChannel._id);
        dispatch(removeCurrentChannel());
        dispatch(deleteCurrentChannel(currentChannel._id));
      }

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
          {!isGroup && <ChatAdminChannelMenu />}

          <MenuItem onClick={handleClearMessage}>Clear Messages</MenuItem>

          <MenuItem
            onClick={
              chat === "Channel" ? handleDeleteChannel : handleDeleteContact
            }
          >
            Delete {chat}
          </MenuItem>
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

export default ChatAdminMenu;
