import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { IoMdArrowBack } from "react-icons/io";

import { Suspense } from "react";

import MultiForm from "./MultiForm";

const Form = ({ setIsClicked }) => {
  const handleGoBack = () => {
    setIsClicked(false);
  };

  return (
    <Suspense
      fallback={
        <AiOutlineLoading3Quarters className="animate-spin text-5xl text-blue-500" />
      }
    >
      <div className="flex flex-grow flex-col w-full p-3 cursor-pointer">
        <div onClick={handleGoBack} className="flex items-start w-fit flex-col">
          <IoMdArrowBack size={28} />

          <p className="text-xs">Go Back</p>
        </div>

        <div className="w-full flex flex-grow justify-between items-center">
          <MultiForm />
        </div>
      </div>
    </Suspense>
  );
};

export default Form;
