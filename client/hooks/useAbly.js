"use client";

import Ably from "ably";
import Spaces from "@ably/spaces";
import { useDispatch, useSelector } from "react-redux";

import { updateAblyToken } from "@/redux/slice/userSlice";

export default function useAbly() {
  const dispatch = useDispatch();

  const ablyToken = useSelector((state) => state.user.ablyToken);

  const initializeAbly = async (clientId) => {
    console.log("Initializing Ably with clientId:", clientId);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/ably/auth/${"3"}`
      );
      console.log("Response:", response);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const tokenRequest = await response.json();
      console.log("TokenRequest:", tokenRequest);

      const realtime = new Ably.Realtime({
        authCallback: function (tokenParams, callback) {
          callback(null, tokenRequest);
        },
      });

      console.log("Realtime:", realtime);
      dispatch(updateAblyToken(realtime));

      realtime.connection.once("failed", () => {
        console.log(
          "Failed to connect to Ably. Requesting a new TokenRequest..."
        );
        initializeAbly();
      });

      realtime.connection.on("disconnected", () => {
        console.log("The connection has been disconnected");
      });
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const initializeSpaces = async (spaceName, username, setCursors) => {
    const ably = new Ably.Realtime.Promise({
      authUrl: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/ably/auth/${"3"}`,
    });
    const spaces = new Spaces(ably);

    const space = await spaces.get(spaceName);

    await space.enter({ name: username });

    space.cursors.subscribe("update", async (cursorUpdate) => {
      const members = await space.members.getAll();
      const member = members.find(
        (member) => member.connectionId === cursorUpdate.connectionId
      );

      setCursors((prevCursors) => ({
        ...prevCursors,
        [member.connectionId]: cursorUpdate.position,
      }));
    });

    window.addEventListener("mousemove", ({ clientX, clientY }) => {
      space.cursors.set({
        position: { x: clientX, y: clientY },
        data: {
          color: "red",
        },
      });
    });
  };

  const disconnectAbly = () => {
    if (ablyToken) {
      ablyToken.close();
    }
  };

  return {
    initializeAbly,
    disconnectAbly,
    initializeSpaces,
  };
}
