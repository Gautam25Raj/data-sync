"use client";

import { Button, Card } from "@material-tailwind/react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

import dynamic from "next/dynamic";

import Image from "next/image";
import { useSelector } from "react-redux";
import { Suspense, useState } from "react";
import ViewContainer from "@/components/layout/dashboard/view/ViewContainer";

const SiteContainer = dynamic(() =>
  import("@/components/layout/dashboard/sites/SiteContainer")
);

const TableauContainer = dynamic(() =>
  import("@/components/layout/dashboard/tableau/TableauContainer")
);

const Form = dynamic(() =>
  import("@/components/layout/dashboard/tableauForm/Form")
);

const DashboardPage = () => {
  const [isClicked, setIsClicked] = useState(false);

  const sites = useSelector((state) => state.site.sites);
  const currentSite = useSelector((state) => state.site.currentSite);
  const currentview = useSelector((state) => state.site.currentView);

  const handleConnectToTableau = () => {
    setIsClicked(true);
  };

  return (
    <Suspense
      fallback={<AiOutlineLoading3Quarters className="mx-auto animate-spin" />}
    >
      <div className="flex h-screen py-2 ml-2 flex-1 w-full">
        <Card className="rounded-xl bg-white flex-1 flex flex-grow h-full justify-center items-center">
          {currentview ? (
            <ViewContainer />
          ) : currentSite ? (
            <TableauContainer />
          ) : sites.length > 0 && !isClicked ? (
            <SiteContainer sites={sites} setIsClicked={setIsClicked} />
          ) : isClicked ? (
            <Form setIsClicked={setIsClicked} />
          ) : (
            <>
              <div className="flex items-center flex-col mb-2">
                <Image
                  src="/assets/datasync-logo.png"
                  alt="datasync-logo"
                  width={100}
                  height={100}
                />

                <h1 className="text-4xl font-bold text-black">
                  Welcome to the DataSync
                </h1>
              </div>

              <p className="text-gray-500 flex gap-1 items-center mb-6">
                Powered by
                <span>
                  <Image
                    alt="Tableau logo"
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
    </Suspense>
  );
};

export default DashboardPage;
