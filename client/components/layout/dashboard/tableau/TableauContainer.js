import { Button } from "@material-tailwind/react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

import { Suspense, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import useTableau from "@/hooks/useTableau";

import { clearCurrentSite } from "@/redux/slice/siteSlice";

import ProjectView from "./ProjectView";

const TableauContainer = () => {
  const dispatch = useDispatch();
  const { getTableauProjects } = useTableau();

  const currentSite = useSelector((state) => state.site.currentSite);

  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      setIsLoading(true);

      const response = await getTableauProjects(currentSite._id);
      setProjects(response);

      setIsLoading(false);
    };

    fetchProjects();
  }, [currentSite]);

  const handleBack = () => {
    dispatch(clearCurrentSite());
  };

  return (
    <Suspense
      fallback={<AiOutlineLoading3Quarters className="mx-auto animate-spin" />}
    >
      <div className="h-full w-full flex flex-col">
        <div className="flex justify-between items-center bg-gray-50 px-4 py-2 border-b border-gray-400">
          <h2 className="text-3xl text-black font-bold">Project Explorer</h2>

          <Button color="gray" onClick={handleBack}>
            Back
          </Button>
        </div>

        {isLoading ? (
          <div className="h-full flex justify-center items-center">
            <AiOutlineLoading3Quarters
              size={28}
              className="mx-auto animate-spin"
            />
          </div>
        ) : (
          projects.length > 0 && <ProjectView projects={projects} />
        )}
      </div>
    </Suspense>
  );
};

export default TableauContainer;
