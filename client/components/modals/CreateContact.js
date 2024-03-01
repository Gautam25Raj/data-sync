"use client";

import {
  Card,
  Button,
  Dialog,
  CardFooter,
  Typography,
  DialogBody,
  DialogHeader,
} from "@material-tailwind/react";
import { IoClose } from "react-icons/io5";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

import { toast } from "sonner";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import useContact from "@/hooks/useContact";

import { toggleNewContactModal } from "@/redux/slice/modalSlice";

import FormInput from "../ui/FormInput";
import FormTextarea from "../ui/FormTextarea";

const CreateContact = () => {
  const dispatch = useDispatch();

  const { createChats } = useContact();

  const [userId, setUserId] = useState("");
  const [message, setMessage] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const open = useSelector((state) => state.modal.newContactModal);

  const handleOpen = () => {
    dispatch(toggleNewContactModal());
  };

  const handleCreateContact = async () => {
    try {
      setIsLoading(true);

      const response = await createChats(userId, message);

      if (response) {
        handleOpen();
        setUserId("");
        setMessage("");
      }

      setIsLoading(false);
    } catch (err) {
      toast.error("Failed to create contact");
    }
  };

  return (
    <>
      <Dialog
        size="xs"
        open={open}
        handler={handleOpen}
        className={"bg-transparent shadow-none"}
      >
        <Card className="mx-auto w-full max-w-[24rem]">
          <DialogHeader className="justify-between">
            <Typography variant="h4" color="blue-gray">
              Create New Contact
            </Typography>

            <Button
              onClick={handleOpen}
              className="bg-transparent p-1 shadow-none hover:shadow-none hover:bg-gray-200"
            >
              <IoClose className="h-6 w-6 text-black" />
            </Button>
          </DialogHeader>

          <DialogBody className="flex flex-col gap-4 !-mt-6">
            <Typography
              className={"mb-3 font-normal"}
              variant="paragraph"
              color="gray"
            >
              Enter the username or email and a welcome message to create
              contact.
            </Typography>

            <FormInput
              label="Username or Email"
              id={"usernameOrEmail"}
              type={"text"}
              placeholder={"Username or Email"}
              input={userId}
              setInput={setUserId}
              required={true}
            />

            <FormTextarea
              label="Message"
              type={"text"}
              placeholder={"Message"}
              id={"newContactMessage"}
              input={message}
              setInput={setMessage}
              required={false}
            />
          </DialogBody>

          <CardFooter className="pt-0 flex justify-end gap-2">
            <Button variant="outlined" color="red" onClick={handleOpen}>
              Cancel
            </Button>

            <Button variant="gradient" onClick={handleCreateContact}>
              {isLoading ? (
                <AiOutlineLoading3Quarters className="mx-auto animate-spin w-12" />
              ) : (
                "Create"
              )}
            </Button>
          </CardFooter>
        </Card>
      </Dialog>
    </>
  );
};

export default CreateContact;
