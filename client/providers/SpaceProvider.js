"use client";

import Ably from "ably";
import Spaces from "@ably/spaces";
import { SpaceProvider, SpacesProvider } from "@ably/spaces/react";

import { useSelector } from "react-redux";
import { usePathname } from "next/navigation";

const SpaceAuthProvider = ({ children }) => {
  const pathname = usePathname();
  const channelId = pathname.split("/")[2];

  const user = useSelector((state) => state.user.user);

  const client = Ably.Realtime.Promise({
    authUrl: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/ably/auth/${user?._id}`,
  });

  const spaces = new Spaces(client);

  return (
    <SpacesProvider client={spaces}>
      <SpaceProvider name={channelId}>{children}</SpaceProvider>
    </SpacesProvider>
  );
};

export default SpaceAuthProvider;
