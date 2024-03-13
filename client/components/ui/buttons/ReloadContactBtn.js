"use client";

import { useState } from "react";
import { IoReload } from "react-icons/io5";
import { Button, Tooltip } from "@material-tailwind/react";
import { toast } from "sonner";

const ReloadContactBtn = ({ handleReload }) => {
  const [isSpinning, setIsSpinning] = useState(false);

  const handleClick = () => {
    setIsSpinning(true);
    handleReload();

    setTimeout(() => {
      setIsSpinning(false);
      toast.success("Reloaded Successfully!");
    }, 1000);
  };

  return (
    <Tooltip content="Reload">
      <Button
        className="p-2.5 shadow-none hover:shadow-sm hover:scale-105 transition-all duration-200 ease-in-out"
        onClick={handleClick}
      >
        <IoReload
          size={24}
          className={`h-4 w-4 text-white ${isSpinning ? "animate-spin" : ""}`}
        />
      </Button>
    </Tooltip>
  );
};

export default ReloadContactBtn;
