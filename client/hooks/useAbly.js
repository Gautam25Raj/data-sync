"use client";

import Ably from "ably";
import Spaces from "@ably/spaces";
import { useDispatch, useSelector } from "react-redux";
import {
  updateAblyInstance,
  updateCurrentSpace,
} from "@/redux/slice/ablySlice";

export default function useAbly() {
  const dispatch = useDispatch();

  const ably = useSelector((state) => state.ably.ably);

  const initializeAbly = async (clientId) => {
    console.log("Initializing Ably with clientId:", clientId);
    let reconnectAttempts = 0;
    const maxReconnectAttempts = 3;

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/ably/auth/${clientId}`
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

      realtime.connection.once("connected", () => {
        console.log("Connected to Ably.");
        dispatch(updateAblyInstance(realtime));
      });

      realtime.connection.once("failed", () => {
        console.log("Failed to connect to Ably.");
        if (reconnectAttempts < maxReconnectAttempts) {
          reconnectAttempts++;
          console.log("Reconnecting...");
          setTimeout(() => realtime.connection.connect(), 3000);
        } else {
          console.log("Max reconnection attempts reached.");
        }
      });

      realtime.connection.on("disconnected", () => {
        console.log("The connection has been disconnected.");
        if (reconnectAttempts < maxReconnectAttempts) {
          reconnectAttempts++;
          console.log("Reconnecting...");
          setTimeout(() => realtime.connection.connect(), 3000);
        } else {
          console.log("Max reconnection attempts reached.");
        }
      });

      return () => {
        realtime.close();
      };
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const initializeSpaces = async (spaceName, username, setCursors) => {
    if (!ably || ably.connection.state !== "connected") {
      console.error(
        "Ably is not connected. Please initialize Ably before initializing Spaces."
      );
      return;
    }

    const dispatch = useDispatch();

    try {
      const spacesInstance = new Spaces(ably);
      console.log("Spaces instance:", spacesInstance);
      const space = await spacesInstance.get(spaceName);

      await space.enter({ name: username });

      dispatch(updateSpaces(spacesInstance));
      dispatch(updateCurrentSpace(space));

      console.log("Space:", space);
      const cursorSubscription = space.cursors.subscribe(
        "update",
        async (cursorUpdate) => {
          const members = await space.members.getAll();
          const member = members.find(
            (member) => member.connectionId === cursorUpdate.connectionId
          );

          setCursors((prevCursors) => ({
            ...prevCursors,
            [member.connectionId]: cursorUpdate.position,
          }));
        }
      );
      console.log("Cursor subscription:", cursorSubscription);

      const mouseMoveHandler = ({ clientX, clientY }) => {
        space.cursors.set({
          position: { x: clientX, y: clientY },
          data: {
            color: "red",
          },
        });
      };

      window.addEventListener("mousemove", mouseMoveHandler);

      return () => {
        window.removeEventListener("mousemove", mouseMoveHandler);
        cursorSubscription.unsubscribe();
      };
    } catch (error) {
      console.error("Error initializing spaces:", error);
    }
  };

  return {
    initializeAbly,
    initializeSpaces,
  };
}
