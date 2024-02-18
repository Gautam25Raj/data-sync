import Chat from "./Chat";
import ChatHeader from "./header/ChatHeader";
import SendMessageContainer from "../message/SendMessageContainer";

const ChatBox = () => {
  return (
    <>
      <ChatHeader />

      <div className="overflow-auto hide-scroll px-3 py-4 rounded-xl shadow-xl relative flex-grow bg-white z-10">
        <Chat />
      </div>

      <SendMessageContainer />
    </>
  );
};

export default ChatBox;
