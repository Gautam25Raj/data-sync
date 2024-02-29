import Sidebar from "@/components/sidebar/Sidebar";
import ChatContainer from "@/components/chat/ChatContainer";

import AuthProvider from "@/providers/AuthProvider";
import CreateContact from "@/components/modals/CreateContact";
import NewChannelModal from "@/components/modals/NewChannelModal";
import AblyAuthProvider from "@/providers/AblyProvider";

const HomeLayout = ({ children }) => {
  return (
    <AuthProvider>
      <AblyAuthProvider>
        <div className="bg-gray-100 flex hide-scroll">
          <NewChannelModal />
          <CreateContact />
          <Sidebar />
          {children}
          <ChatContainer />
        </div>
      </AblyAuthProvider>
    </AuthProvider>
  );
};

export default HomeLayout;
