import { Button } from "@material-tailwind/react";
import SiteList from "./SiteList";
import { Suspense } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const SiteContainer = ({ sites, setIsClicked }) => {
  const handleAddSites = () => {
    setIsClicked(true);
  };

  return (
    <Suspense
      fallback={<AiOutlineLoading3Quarters className="mx-auto animate-spin" />}
    >
      <div className="flex flex-col flex-grow justify-between py-12">
        <div className="h-full overflow-hidden mb-5">
          <h2 className="text-3xl text-black font-bold mb-12">
            Your Tableau Sites on DataSync
          </h2>

          <SiteList sites={sites} />
        </div>

        <Button className="mx-1.5" fullWidth onClick={handleAddSites}>
          Add More Site
        </Button>
      </div>
    </Suspense>
  );
};

export default SiteContainer;
