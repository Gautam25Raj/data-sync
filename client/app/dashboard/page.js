import NewChannelModal from "@/components/modals/NewChannelModal";
import Sidebar from "@/components/sidebar/Sidebar";

const DashboardPage = () => {
  return (
    <div className="bg-gray-100 flex">
      <Sidebar />
      <NewChannelModal />
    </div>
  );
};

export default DashboardPage;
