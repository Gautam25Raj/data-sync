"use client";

import {
  Button,
  Dialog,
  DialogFooter,
  DialogHeader,
  Typography,
} from "@material-tailwind/react";
import { IoClose } from "react-icons/io5";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

import { toast } from "sonner";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import useChannel from "@/hooks/useChannel";

import { toggleEditChannelModal } from "@/redux/slice/modalSlice";

import LeftChannelModal from "./channelModal/LeftChannelModal";
import RightChannelModal from "./channelModal/RightChannelModal";
import { removeCurrentActionChannel } from "@/redux/slice/channelSlice";

const EditChannelModal = () => {
  const dispatch = useDispatch();
  const { getChannel, updateChannel } = useChannel();

  const [channelDetails, setChannelDetails] = useState({});

  const [channelName, setChannelName] = useState("");
  const [channelUsers, setChannelUsers] = useState("");
  const [channelTableau, setChannelTableau] = useState("");

  const [isLoaded, setIsLoaded] = useState(false);

  const currentActionChannel = useSelector(
    (state) => state.channel.currentActionChannel
  );
  const open = useSelector((state) => state.modal.editChannelModal);

  const handleOpen = () => {
    dispatch(toggleEditChannelModal());
  };

  useEffect(() => {
    if (open) {
      getChannel(currentActionChannel).then((channel) => {
        setChannelDetails(channel);
        setChannelName(channel.name);
        setChannelUsers(channel.users.map((user) => user.username).join(", "));
        setChannelTableau(channel.tableau);
        console.log(channel);
      });
    }

    return () => {
      removeCurrentActionChannel();
      setChannelName("");
      setChannelUsers("");
      setChannelTableau("");
    };
  }, [open, currentActionChannel]);

  const handleCreateChannel = async () => {
    setIsLoaded(true);

    try {
      if (!channelName) {
        throw new Error("Channel name is required.");
      }

      if (!channelTableau) {
        throw new Error("Tableau Public is required.");
      }

      if (!channelUsers) {
        throw new Error("Cannot create channel without users.");
      }

      const usersArray = channelUsers.split(",").map((user) => user.trim());

      const response = await updateChannel(
        currentActionChannel,
        channelName,
        usersArray,
        channelTableau
      );

      if (response) {
        handleOpen();
        setChannelName("");
        setChannelUsers("");
        setChannelTableau("");
      }
    } catch (err) {
      toast.error(err.message);
    } finally {
      setIsLoaded(false);
    }
  };

  return (
    <Dialog open={open} size="lg" handler={handleOpen}>
      <div className="flex items-center justify-between p-2">
        <DialogHeader className="flex flex-col items-start">
          {" "}
          <Typography className="mb-1" variant="h4">
            Edit Channel
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
            "Update Channel"
          )}
        </Button>
      </DialogFooter>
    </Dialog>
  );
};

export default EditChannelModal;
