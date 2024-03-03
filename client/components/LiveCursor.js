import React, { useState, useEffect } from "react";
import { useSpace, useCursors, useMembers } from "@ably/spaces/react";

import { MemberCursors, YourCursor } from "./cursors/Cursors";

const LiveCursor = ({ currentUser, channelId }) => {
  const { space } = useSpace();
  const { set } = useCursors();
  const { self } = useMembers();

  const [position, setPosition] = useState({ x: 0, y: 0 });

  const colors = [
    {
      bg: "#fecaca",
      name: "red",
    },
    {
      bg: "#fdba74",
      name: "orange",
    },
    {
      bg: "#fcd34d",
      name: "#d97706",
    },
    {
      bg: "#fef08a",
      name: "yellow",
    },
    {
      bg: "#d9f99d",
      name: "green",
    },
    {
      bg: "#a7f3d0",
      name: "#047857",
    },
    {
      bg: "#a5f3fc",
      name: "cyan",
    },
    {
      bg: "#38bdf8",
      name: "blue",
    },
    {
      bg: "#a78bfa",
      name: "purple",
    },
  ];

  const handleMouseMove = (event) => {
    const { clientX, clientY, buttons } = event;
    setPosition({ x: clientX - 288, y: clientY });
    set({
      position: { x: clientX - 288, y: clientY },
      data: {
        isDrawing: buttons,
      },
    });
  };

  useEffect(() => {
    if (space) {
      space.enter({
        name: currentUser.username,
        userColors: colors[Math.floor(Math.random() * colors.length)],
      });

      window.addEventListener("mousemove", handleMouseMove);
    }

    return () => {
      space?.leave();
      space?.cursors?.unsubscribe();
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [space, channelId]);

  return (
    <div className="cursor-none">
      <YourCursor self={self} position={position} />
      <MemberCursors />
    </div>
  );
};

export default LiveCursor;
