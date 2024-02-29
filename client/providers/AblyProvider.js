"use client";

import * as Ably from "ably";
import { AblyProvider } from "ably/react";
import { useSelector } from "react-redux";

const AblyAuthProvider = ({ children }) => {
  const user = useSelector((state) => state.user.user);

  if (!user) return null;

  const client = Ably.Realtime.Promise({
    authUrl: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/ably/auth/${user?._id}`,
  });

  return <AblyProvider client={client}>{children}</AblyProvider>;
};

export default AblyAuthProvider;
