"use client";

import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Typography,
} from "@material-tailwind/react";
import { IoClose } from "react-icons/io5";

import { toast } from "sonner";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

import useChannel from "@/hooks/useChannel";

import { togglenewChannelModal } from "@/redux/slice/modalSlice";

import FormInput from "../ui/FormInput";
import FormTextarea from "../ui/FormTextarea";

const NewChannelModal = () => {
  const dispatch = useDispatch();
  const { createChannel } = useChannel();

  const [channelName, setChannelName] = useState("");
  const [channelUsers, setChannelUsers] = useState([]);
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
    <Dialog open={open} size="xs" handler={handleOpen}>
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
          <IoClose className="h-6 w-6 text-black " />
        </Button>
      </div>

      <DialogBody className="!p-6">
        <Typography
          className="mb-10 -mt-12 text-lg w-10/12 text-md"
          color="gray"
          variant="lead"
        >
          Write your channel name and add members to create a new channel.
        </Typography>

        <div className="grid gap-6">
          <FormInput
            label="Channel Name"
            id={"channel-name"}
            type={"text"}
            placeholder={"Channel Name"}
            input={channelName}
            setInput={setChannelName}
            required
          />

          <FormInput
            label="Tableau Public Url"
            id={"tableau-url"}
            type={"text"}
            placeholder={
              "https://public.tableau.com/views/ExploringHistoricallyBlackCollegesandUniversities/ExploringHBCU"
            }
            input={channelTableau}
            setInput={setChannelTableau}
            required
          />

          <FormTextarea
            label="Channel Members"
            id={"channel-members"}
            type={"text"}
            placeholder={"Separate user emails with commas (,)"}
            input={channelUsers}
            setInput={setChannelUsers}
            required
          />
        </div>
      </DialogBody>

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
