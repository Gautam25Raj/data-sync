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

  return {
    initializeAbly,
  };
}
