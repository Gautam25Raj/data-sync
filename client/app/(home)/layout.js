import ChatContainer from "@/components/chat/ChatContainer";
import Sidebar from "@/components/sidebar/Sidebar";

import CreateContact from "@/components/modals/CreateContact";
import NewChannelModal from "@/components/modals/NewChannelModal";
import AuthProvider from "@/providers/AuthProvider";

const HomeLayout = () => {
  return (
    <AuthProvider>
      <div className="bg-gray-100 flex">
        <NewChannelModal />
        <CreateContact />
        <Sidebar />
        <ChatContainer />
      </div>
    </AuthProvider>
  );
};

export default HomeLayout;
