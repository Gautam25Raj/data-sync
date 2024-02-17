import ChatContainer from "@/components/chat/ChatContainer";
import Sidebar from "@/components/sidebar/Sidebar";

import CreateContact from "@/components/modals/CreateContact";
import NewChannelModal from "@/components/modals/NewChannelModal";

const HomeLayout = () => {
  return (
    <>
      <div className="bg-gray-100 flex">
        <NewChannelModal />
        <CreateContact />
        <Sidebar />
        <ChatContainer />
      </div>
    </>
  );
};

export default HomeLayout;
