"use client";

import { DialogBody, Typography } from "@material-tailwind/react";

import FormInput from "../../ui/FormInput";
import FormTextarea from "../../ui/FormTextarea";
import TagInputs from "@/components/ui/TagInputs";

const LeftChannelModal = ({
  channelName,
  setChannelName,
  channelUsers,
  setChannelUsers,
  channelTableau,
  setChannelTableau,
}) => {
  return (
    <div className="flex-1 border-r border-gray-300">
      <DialogBody className="!p-6">
        <Typography
          className="mb-10 -mt-12 text-lg text-md"
          color="gray"
          variant="lead"
        >
          Write your channel name and add members to create a new channel.
        </Typography>

        <div className="grid gap-6 overflow-y-auto max-h-72 hide-scroll">
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

          <TagInputs
            label="Channel Members"
            id={"channel-members"}
            type={"text"}
            placeholder={"Separate usernames with comas (,)"}
            input={channelUsers}
            setInput={setChannelUsers}
            required
          />
        </div>
      </DialogBody>
    </div>
  );
};

export default LeftChannelModal;
