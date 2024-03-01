"use client";

import { Button, Card } from "@material-tailwind/react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

import Link from "next/link";
import { toast } from "sonner";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Avatar, { genConfig } from "react-nice-avatar";

import AuthProvider from "@/providers/AuthProvider";

import useUser from "@/hooks/useUser";
import useInvite from "@/hooks/useInvite";
import useChannel from "@/hooks/useChannel";

const page = ({ params: { userId, channelId } }) => {
  const router = useRouter();

  const { getUser } = useUser();
  const { getChannel } = useChannel();
  const { joinChannel } = useInvite();

  const [user, setUser] = useState(null);
  const [channel, setChannel] = useState(null);

  const [joining, setJoining] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const currentUser = useSelector((state) => state.user.user);

  useEffect(() => {
    try {
      const fetchUser = async () => {
        setIsLoading(true);

        const user = await getUser(userId);
        setUser(user);
        const channel = await getChannel(channelId);
        setChannel(channel);

        setIsLoading(false);
      };

      fetchUser();
    } catch (err) {
      console.log(err);
    }
  }, [userId, channelId]);

  const handleJoinChannel = async () => {
    if (currentUser.id === channel.admin) {
      toast.error("Admin cannot join their own channel");
    }

    try {
      setJoining(true);
      const response = await joinChannel(channelId);

      if (!response) {
        console.log(response);
      }

      router.push(`/channel/${channelId}`);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setJoining(false);
    }
  };

  return (
    <AuthProvider>
      {isLoading ? (
        <div>Getting Channel Info</div>
      ) : (
        <div className="h-screen w-screen flex items-center justify-center bg-gray-50">
          <Card className="py-5 px-16">
            <h1 className="text-4xl font-bold text-center mb-10">
              Join Channel
            </h1>

            <div className="flex gap-12">
              <div className="space-y-3">
                <div className="p-4 bg-gray-100 rouned-xl shadow">
                  <Avatar
                    style={{ width: "160px", height: "160px" }}
                    {...genConfig(channel ? channel.name : "user")}
                  />
                </div>

                <h2 className="text-center">
                  <p className="font-bold text-xl">Channel Name </p>
                  {channel ? channel.name : "Channel"}
                </h2>
              </div>

              <div className="space-y-6 mt-4 flex flex-col items-center min-w-64">
                <div className="space-1">
                  <div>
                    <div className="flex items-center">
                      <p className="font-bold text-xl mr-1">Admin: </p>
                      <div className="flex items-center gap-2">
                        <Avatar
                          style={{ width: "40px", height: "40px" }}
                          {...genConfig(user ? user._id : "user")}
                        />
                        <h3>{user?.username}</h3>
                      </div>
                    </div>
                  </div>

                  <p className="ml-auto">
                    <span className="font-bold text-xl">Size: </span>{" "}
                    {channel?.users?.length} Members
                  </p>
                </div>

                <p className="text-red-400 ">
                  {currentUser?.id === channel?.admin &&
                    "Admin cannot their own channel."}
                </p>

                <div className="w-full space-y-1 text-center">
                  <Button
                    fullWidth
                    className=""
                    disabled={currentUser?.id === channel?.admin}
                    onClick={handleJoinChannel}
                  >
                    {joining ? (
                      <AiOutlineLoading3Quarters className="mx-auto animate-spin" />
                    ) : (
                      "Join"
                    )}
                  </Button>

                  <p className="text-sm">
                    Back to{" "}
                    <Link href="/dashboard" className="underline">
                      Dashboard
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      )}
    </AuthProvider>
  );
};

export default page;
