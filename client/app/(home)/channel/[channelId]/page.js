"use client";

import useChannel from "@/hooks/useChannel";
import { Card } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const ChannelPage = ({ params: { channelId } }) => {
  const { getChannel } = useChannel();

  const [channel, setChannel] = useState(null);

  useEffect(() => {
    const fetch = async () => {
      const res = await getChannel(channelId);
      setChannel(res);
    };

    fetch();
  }, []);

  return (
    <div className="flex h-screen py-2 ml-2 flex-1 w-full">
      <Card className="rounded-xl bg-white flex-1 flex-grow">
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
  );
};

export default ChannelPage;
