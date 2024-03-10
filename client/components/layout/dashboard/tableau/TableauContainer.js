import { Button } from "@material-tailwind/react";

import { Suspense } from "react";
import { useDispatch } from "react-redux";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

import { clearCurrentSite } from "@/redux/slice/siteSlice";

const TableauContainer = () => {
  const dispatch = useDispatch();

  const handleBack = () => {
    dispatch(clearCurrentSite());
  };

  return (
    <Suspense
      fallback={<AiOutlineLoading3Quarters className="mx-auto animate-spin" />}
    >
      <div>
        <Button onClick={handleBack}>go back</Button>
      </div>
    </Suspense>
  );
};

export default TableauContainer;
