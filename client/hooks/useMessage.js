"use client";

import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { removeMessage, setMessages } from "@/redux/slice/messageSlice";

const useMessage = () => {
  const dispatch = useDispatch();

  const fetchMessage = async (messageId) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/message${messageId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error);
      }

      const message = await response.json();

      return message;
    } catch (err) {
      toast.error(err.message);
    }
  };

  const fetchChatMessages = async (chatId) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/message/chat/${chatId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error);
      }

      const messages = await response.json();
      dispatch(setMessages(messages));
    } catch (err) {
      toast.error(err.message);
    }
  };

  const fetchChannelMessages = async (channelId) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/message/channel/${channelId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error);
      }

      const messages = await response.json();
      dispatch(setMessages(messages));
    } catch (err) {
      toast.error(err.message);
    }
  };

  const fetchLatestMessage = async (chatId) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/message/${chatId}/latest-message`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error);
      }

      const latestMessage = await response.json();

      return latestMessage;
    } catch (err) {
      toast.error(err.message);
    }
  };

  const createChatMessage = async (chatId, content) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/message/chat`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({ chatId, content }),
        }
      );

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error);
      }

      await response.json();
    } catch (err) {
      toast.error(err.message);
    }
  };

  const createChannelMessage = async (channelId, content) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/message/channel`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({ channelId, content }),
        }
      );

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error);
      }

      await response.json();
    } catch (err) {
      toast.error(err.message);
    }
  };

  const updateMessage = async (messageId, content) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/message/${messageId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({ content }),
        }
      );

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error);
      }

      const message = await response.json();

      return message;
    } catch (err) {
      toast.error(err.message);
    }
  };

  const deleteMessage = async (messageId) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/message/${messageId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error);
      }

      await response.json();
      dispatch(removeMessage(messageId));
    } catch (err) {
      toast.error(err.message);
    }
  };

  const deleteChatMessages = async (chatId) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/message/chat/${chatId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error);
      }

      await response.json();
      toast.success("Chat messages deleted successfully.");
    } catch (err) {
      toast.error(err.message);
    }
  };

  const deleteChannelMessages = async (channelId) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/message/channel/${channelId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error);
      }

      await response.json();
      toast.success("Channel messages deleted successfully.");
    } catch (err) {
      toast.error(err.message);
    }
  };

  return {
    fetchMessage,
    fetchChatMessages,
    fetchChannelMessages,
    fetchLatestMessage,
    createChatMessage,
    createChannelMessage,
    updateMessage,
    deleteMessage,
    deleteChatMessages,
    deleteChannelMessages,
  };
};

export default useMessage;
