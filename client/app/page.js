"use client";

import Ably from "ably";
import { useCallback, useEffect } from "react";

import useAbly from "@/hooks/useAbly";
import LiveCursor from "@/components/LiveCursor";
import SidebarWithBurgerMenu from "@/components/layout/onBoard/SignUp";

export default function Home() {
  const { initializeAbly } = useAbly();

  // const memoizedInitAbly = useCallback(
  //   () => initializeAbly("test"),
  //   [initializeAbly]
  // );

  // useEffect(() => {
  //   let cleanupAbly;

  //   memoizedInitAbly().then((cleanup) => (cleanupAbly = cleanup));

  //   return () => {
  //     if (cleanupAbly) {
  //       cleanupAbly();
  //     }
  //   };
  // }, []);

  return (
    <main className="bg-gray-50 flex justify-center items-center h-screen w-screen">
      {/* <LiveCursor /> */}
      <SidebarWithBurgerMenu />
    </main>
  );
}
