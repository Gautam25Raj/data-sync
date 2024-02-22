"use client";

import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";

import { addJoinedChannel } from "@/redux/slice/channelSlice";

const useInvite = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const joinChannel = async (id) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/invite`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({ channelId: id }),
        }
      );

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error);
      }
      const channelData = await response.json();
      console.log(channelData);

      dispatch(addJoinedChannel(channelData));
      toast.success("Joined Channel");

      return channelData;
    } catch (err) {
      toast.error(err.message);

      if (err.message.includes("User already in channel")) {
        router.push(`/channel/${id}`);
      }
    }
  };

  return {
    joinChannel,
  };
};

export default useInvite;
