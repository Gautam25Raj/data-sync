"use client";

import { useCallback, useEffect } from "react";
import { Card } from "@material-tailwind/react";

import useAbly from "@/hooks/useAbly";
import { useSelector } from "react-redux";

const DashboardPage = () => {
  const { initializeAbly } = useAbly();

  const currentUser = useSelector((state) => state.user.user);

  const memoizedInitAbly = useCallback(
    () => initializeAbly(currentUser.username),
    [initializeAbly]
  );

  useEffect(() => {
    let cleanupAbly;

    memoizedInitAbly().then((cleanup) => (cleanupAbly = cleanup));

    return () => {
      if (cleanupAbly) {
        cleanupAbly();
      }
    };
  }, []);

  return (
    <div className="flex h-screen py-2 ml-2 flex-1 w-full">
      <Card className="rounded-xl bg-white flex-1 flex-grow">Hi</Card>
    </div>
  );
};

export default DashboardPage;
