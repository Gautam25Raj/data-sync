"use client";

import {
  Button,
  Dialog,
  DialogFooter,
  DialogHeader,
  Typography,
} from "@material-tailwind/react";

import { toast } from "sonner";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import useChannel from "@/hooks/useChannel";

import { togglenewChannelModal } from "@/redux/slice/modalSlice";

import LeftChannelModal from "./channelModal/LeftChannelModal";
import RightChannelModal from "./channelModal/RightChannelModal";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { IoClose } from "react-icons/io5";

const NewChannelModal = () => {
  const dispatch = useDispatch();
  const { createChannel } = useChannel();

  const [channelName, setChannelName] = useState("");
  const [channelUsers, setChannelUsers] = useState("");
  const [channelTableau, setChannelTableau] = useState([]);

  const [isLoaded, setIsLoaded] = useState(false);

  const open = useSelector((state) => state.modal.newChannelModal);

  const handleOpen = () => {
    dispatch(togglenewChannelModal());
  };

  const handleCreateChannel = async () => {
    setIsLoaded(true);

    try {
      if (!channelName) {
        throw new Error("Channel name is required.");
      }

      if (!channelTableau) {
        throw new Error("Tableau Public is required.");
      }

      if (channelUsers.length < 1 || !channelUsers) {
        throw new Error("Cannot create channel without users.");
      }

      const usersArray = channelUsers.split(",").map((user) => user.trim());

      const response = await createChannel(
        channelName,
        usersArray,
        channelTableau
      );

      if (response) {
        handleOpen();
        setChannelName("");
        setChannelUsers([]);
      }

      setIsLoaded(false);
    } catch (err) {
      toast.error(err.message);
      setIsLoaded(false);
    }
  };

  return (
    <Dialog open={open} size="lg" handler={handleOpen}>
      <div className="flex items-center justify-between p-2">
        <DialogHeader className="flex flex-col items-start">
          {" "}
          <Typography className="mb-1" variant="h4">
            Create New Channel
          </Typography>
        </DialogHeader>

        <Button
          onClick={handleOpen}
          className="bg-transparent p-1 shadow-none hover:shadow-none hover:bg-gray-200"
        >
          <IoClose className="h-6 w-6 text-black" />
        </Button>
      </div>

      <div className="flex">
        <LeftChannelModal
          channelName={channelName}
          setChannelName={setChannelName}
          channelUsers={channelUsers}
          setChannelUsers={setChannelUsers}
          channelTableau={channelTableau}
          setChannelTableau={setChannelTableau}
          handleCreateChannel={handleCreateChannel}
          handleOpen={handleOpen}
          isLoaded={isLoaded}
        />

        <RightChannelModal
          channelUsers={channelUsers}
          setChannelUsers={setChannelUsers}
        />
      </div>

      <DialogFooter className="space-x-2">
        <Button variant="outlined" color="red" onClick={handleOpen}>
          cancel
        </Button>

        <Button variant="gradient" color="gray" onClick={handleCreateChannel}>
          {isLoaded ? (
            <AiOutlineLoading3Quarters className="mx-auto animate-spin" />
          ) : (
            "Create Channel"
          )}
        </Button>
      </DialogFooter>
    </Dialog>
  );
};

export default NewChannelModal;
