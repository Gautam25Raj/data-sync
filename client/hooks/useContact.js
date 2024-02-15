"use client";

const { toast } = require("sonner");
const { useDispatch } = require("react-redux");

const {
  addContact,
  setContacts,
  addOriginalContact,
  setOriginalContacts,
} = require("@/redux/slice/contactSlice");

const useContact = () => {
  const dispatch = useDispatch();

  const fetchChats = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/contact`,
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

      const chats = await response.json();
      dispatch(setContacts(chats));
      dispatch(setOriginalContacts(chats));
      toast.success("Chats fetched successfully");

      return chats;
    } catch (err) {
      toast.error(err.message);
    }
  };

  const createChats = async (userId, message) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/contact`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({ userId, message }),
        }
      );

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error);
      }

      const chat = await response.json();
      dispatch(addContact(chat));
      dispatch(addOriginalContact(chat));
      toast.success("Chat created successfully");

      return chat;
    } catch (err) {
      toast.error(err.message);
    }
  };

  const deleteChat = async (chatId) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/contact/${chatId}`,
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

      dispatch(removeContact(chatId));
      toast.success("Chat deleted successfully");
    } catch (err) {
      toast.error(err.message);
    }
  };

  return { fetchChats, createChats, deleteChat };
};

export default useContact;
