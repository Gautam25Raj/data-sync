import MessageInput from "./MessageInput";

const SendMessageContainer = () => {
  return (
    <div className="flex z-10 items-center rounded-xl shadow-xl bg-white pl-5 border-t border-gray-200 py-1.5">
      <MessageInput />
    </div>
  );
};

export default SendMessageContainer;
