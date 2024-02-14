import NewChannelModal from "@/components/modals/NewChannelModal";
import Sidebar from "@/components/sidebar/Sidebar";

const HomeLayout = () => {
  return (
    <>
      <div className="bg-gray-100 flex">
        <NewChannelModal />
        <Sidebar />
      </div>
    </>
  );
};

export default HomeLayout;
