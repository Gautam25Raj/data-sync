import Sidebar from "@/components/sidebar/Sidebar";
import ChatContainer from "@/components/chat/ChatContainer";

import AuthProvider from "@/providers/AuthProvider";
import CreateContact from "@/components/modals/CreateContact";
import NewChannelModal from "@/components/modals/NewChannelModal";

const HomeLayout = ({ children }) => {
  return (
    <AuthProvider>
      <div className="bg-gray-100 flex hide-scroll">
        <NewChannelModal />
        <CreateContact />
        <Sidebar />
        {children}
        <ChatContainer />
      </div>
    </AuthProvider>
  );
};

export default HomeLayout;
