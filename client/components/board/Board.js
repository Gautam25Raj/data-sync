"use client";

import { io } from "socket.io-client";
import { usePathname } from "next/navigation";
import { useRef, useEffect, useState } from "react";

import { useDraw } from "@/hooks/useDraw";

import { drawLine } from "@/utils/drawLine";

const socket = io("http://localhost:8080");

const Board = () => {
  const router = usePathname();

  const [color, setColor] = useState("#000");

  const { canvasRef, onMouseDown, clear } = useDraw(createLine);

  useEffect(() => {
    const channelId = router.split("/")[2];

    const ctx = canvasRef.current?.getContext("2d");
    const roomId = channelId;

    socket.emit("join-room", roomId);

    socket.emit("client-ready", roomId);

    socket.on("get-canvas-state", () => {
      if (!canvasRef.current?.toDataURL()) return;
      console.log("sending canvas state");
      socket.emit("canvas-state", {
        state: canvasRef.current.toDataURL(),
        roomId,
      });
    });

    socket.on("canvas-state-from-server", (state) => {
      console.log("I received the state");
      const img = new Image();
      img.src = state;
      img.onload = () => {
        ctx?.drawImage(img, 0, 0);
      };
    });

    socket.on("draw", ({ prevPoint, currentPoint, color }) => {
      if (!ctx) return console.log("no ctx here");
      drawLine({ prevPoint, currentPoint, ctx, color });
    });

    socket.on("clear", () => {
      socket.emit("clear", roomId);
    });

    return () => {
      socket.off("draw");
      socket.off("get-canvas-state");
      socket.off("canvas-state-from-server");
      socket.off("clear");
    };
  }, [canvasRef, router]);

  function createLine({ prevPoint, currentPoint, ctx }) {
    socket.emit("draw", {
      prevPoint,
      currentPoint,
      color,
      roomId: router.split("/")[2],
    });
    drawLine({ prevPoint, currentPoint, ctx, color });
  }

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        overflow: "hidden",
      }}
    >
      <canvas
        ref={canvasRef}
        onMouseDown={onMouseDown}
        width={2000}
        height={2000}
        className="border border-black"
      />
    </div>
  );
};

export default Board;
