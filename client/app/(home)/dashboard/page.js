"use client";

import { Button, Card } from "@material-tailwind/react";
import dynamic from "next/dynamic";

import Image from "next/image";
import { useState } from "react";

const Form = dynamic(() =>
  import("@/components/layout/dashboard/tableauForm/Form")
);

const DashboardPage = () => {
  const [isClicked, setIsClicked] = useState(false);

  const handleConnectToTableau = () => {
    setIsClicked(true);
  };

  return (
    <div className="flex h-screen py-2 ml-2 flex-1 w-full">
      <Card className="rounded-xl bg-white flex-1 flex flex-grow h-full justify-center items-center">
        {isClicked ? (
          <Form setIsClicked={setIsClicked} />
        ) : (
          <>
            <div className="flex items-center flex-col mb-2">
              <Image src="/assets/datasync-logo.png" width={100} height={100} />

              <h1 className="text-4xl font-bold text-black">
                Welcome to the DataSync
              </h1>
            </div>

            <p className="text-gray-500 flex gap-1 items-center mb-6">
              Powered by
              <span>
                <Image
                  src="/assets/tableau-logo.png"
                  width={120}
                  height={120}
                />
              </span>
            </p>

            <Button
              className="bg-[#0176d3] hover:bg-[#014486] hover:underline transition-colors"
              onClick={handleConnectToTableau}
            >
              Connect to Tableau
            </Button>
          </>
        )}
      </Card>
    </div>
  );
};

export default DashboardPage;
