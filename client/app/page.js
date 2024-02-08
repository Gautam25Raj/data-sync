"use client";

import Ably from "ably";
import { useEffect } from "react";

import useAbly from "@/hooks/useAbly";
import LiveCursor from "@/components/LiveCursor";

export default function Home() {
  const { initializeAbly, disconnectAbly } = useAbly();

  useEffect(() => {
    const auth = async () => {
      await initializeAbly(Math.random());
    };
    auth();

    return () => {
      disconnectAbly();
    };
  }, []);

  return (
    <main>
      Hello
      <LiveCursor />
    </main>
  );
}
