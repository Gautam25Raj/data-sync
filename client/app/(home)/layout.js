import Sidebar from "@/components/sidebar/Sidebar";
import ChatContainer from "@/components/chat/ChatContainer";

import AuthProvider from "@/providers/AuthProvider";
import AblyAuthProvider from "@/providers/AblyProvider";

import EditSiteModal from "@/components/modals/EditSiteModal";
import CreateContact from "@/components/modals/CreateContact";
import NewChannelModal from "@/components/modals/NewChannelModal";
import EditChannelModal from "@/components/modals/EditChannelModal";

const HomeLayout = ({ children }) => {
  return (
    <AuthProvider>
      <AblyAuthProvider>
        <div className="bg-gray-100 flex hide-scroll">
          <EditChannelModal />
          <NewChannelModal />
          <CreateContact />
          <Sidebar />
          <EditSiteModal />
          {children}
          <ChatContainer />
        </div>
      </AblyAuthProvider>
    </AuthProvider>
  );
};

export default HomeLayout;
