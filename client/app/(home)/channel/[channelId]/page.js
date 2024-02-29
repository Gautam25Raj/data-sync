"use client";

import { Card } from "@material-tailwind/react";

import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

import useChannel from "@/hooks/useChannel";

import LiveCursor from "@/components/LiveCursor";
import Whiteboard from "@/components/board/WhiteBoard";

const ChannelPage = ({ params: { channelId } }) => {
  const { getChannel } = useChannel();

  const [channel, setChannel] = useState(null);
  const [showCursors, setShowCursors] = useState(false);

  const currentUser = useSelector((state) => state.user.user);

  useEffect(() => {
    const fetch = async () => {
      const res = await getChannel(channelId);
      setChannel(res);
    };

    fetch();
  }, []);

  const handleShowCursors = () => {
    setShowCursors((prev) => !prev);
  };

  return (
    <>
      <div className="flex flex-col h-screen py-2 ml-2 flex-1 w-full relative prevent-select">
        <button
          size="sm"
          onClick={handleShowCursors}
          className="absolute top-8 left-2 z-30 h-fit bg-black py-1 px-2 text-white rounded-lg"
        >
          {showCursors ? "Stop Collab" : "Start Collab"}
        </button>

        <Card className="rounded-xl bg-white flex-1 flex-grow">
          {showCursors && (
            <LiveCursor channelId={channelId} currentUser={currentUser} />
          )}

          {channel ? (
            <tableau-viz
              id="tableauViz"
              src={channel?.tableau}
              toolbar="top"
              hide-tabs="hidden"
              hide-toolbar="hidden"
            ></tableau-viz>
          ) : (
            <p>Loading...</p>
          )}
        </Card>
      </div>

      {showCursors && <Whiteboard />}
    </>
  );
};

export default ChannelPage;
