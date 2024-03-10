"use client";

import {
  CogIcon,
  UserIcon,
  BuildingLibraryIcon,
} from "@heroicons/react/24/outline";
import { Stepper, Step, Button, Typography } from "@material-tailwind/react";

import React from "react";

import useSite from "@/hooks/useSite";

import Step1 from "./steps/Step1";
import Step2 from "./steps/Step2";
import Step3 from "./steps/Step3";
import { toast } from "sonner";

const MultiForm = ({ setIsClicked }) => {
  const { createSite } = useSite();

  const [activeStep, setActiveStep] = React.useState(0);
  const [isLastStep, setIsLastStep] = React.useState(false);
  const [isFirstStep, setIsFirstStep] = React.useState(false);

  // Step 1
  const [siteName, setSiteName] = React.useState("");
  const [tableauUsername, setTableauUsername] = React.useState("");
  const [tableauBaseUrl, setTableauBaseUrl] = React.useState("");
  const [tableauUrl, setTableauUrl] = React.useState("");
  const [tableauSiteName, setTableauSiteName] = React.useState("");

  // Step 2
  const [clientId, setClientId] = React.useState("");
  const [appSecretId, setAppSecretId] = React.useState("");
  const [appSecretValue, setAppSecretValue] = React.useState("");

  // Step 3
  const [patName, setPatName] = React.useState("");
  const [patSecret, setPatSecret] = React.useState("");

  const handleNext = () => !isLastStep && setActiveStep((cur) => cur + 1);
  const handlePrev = () => !isFirstStep && setActiveStep((cur) => cur - 1);

  const handleSubmit = async () => {
    if (
      !siteName ||
      !tableauUsername ||
      !tableauBaseUrl ||
      !tableauUrl ||
      !tableauSiteName ||
      !clientId ||
      !appSecretId ||
      !appSecretValue ||
      !patName ||
      !patSecret
    ) {
      toast.error("Please fill in all the fields.");
      return;
    }

    const response = await createSite({
      name: siteName,
      username: tableauUsername,
      baseUrl: tableauBaseUrl,
      siteName: tableauSiteName,
      clientId,
      appSecretId,
      appSecretValue,
      patName,
      patSecret,
    });

    if (response) {
      setIsClicked(false);

      setActiveStep(0);
      setSiteName("");
      setTableauUsername("");
      setTableauBaseUrl("");
      setTableauUrl("");
      setTableauSiteName("");
      setClientId("");
      setAppSecretId("");
      setAppSecretValue("");
      setPatName("");
      setPatSecret("");
    }
  };

  return (
    <div className="w-full px-32 py-4">
      <Stepper
        activeStep={activeStep}
        isLastStep={(value) => setIsLastStep(value)}
        isFirstStep={(value) => setIsFirstStep(value)}
      >
        <Step onClick={() => setActiveStep(0)}>
          <UserIcon className="h-5 w-5" />

          <div className="absolute -bottom-[4.5rem] w-max text-center">
            <Typography
              variant="h6"
              color={activeStep === 0 ? "blue-gray" : "gray"}
            >
              Step 1
            </Typography>

            <Typography
              color={activeStep === 0 ? "blue-gray" : "gray"}
              className="font-normal max-w-60"
            >
              Tableau site and account details.
            </Typography>
          </div>
        </Step>

        <Step onClick={() => setActiveStep(1)}>
          <CogIcon className="h-5 w-5" />

          <div className="absolute -bottom-[4.5rem] w-max text-center">
            <Typography
              variant="h6"
              color={activeStep === 1 ? "blue-gray" : "gray"}
            >
              Step 2
            </Typography>

            <Typography
              color={activeStep === 1 ? "blue-gray" : "gray"}
              className="font-normal max-w-60"
            >
              Tableau connected app details.
            </Typography>
          </div>
        </Step>

        <Step onClick={() => setActiveStep(2)}>
          <BuildingLibraryIcon className="h-5 w-5" />

          <div className="absolute -bottom-[6rem] w-max text-center">
            <Typography
              variant="h6"
              color={activeStep === 2 ? "blue-gray" : "gray"}
            >
              Step 3
            </Typography>

            <Typography
              color={activeStep === 2 ? "blue-gray" : "gray"}
              className="font-normal max-w-60"
            >
              Tableau Personal Access Tokens details.
            </Typography>
          </div>
        </Step>
      </Stepper>

      <div className="mt-24 h-[356px] flex items-center justify-center w-full">
        {activeStep === 0 && (
          <Step1
            siteName={siteName}
            setSiteName={setSiteName}
            tableauUsername={tableauUsername}
            setTableauUsername={setTableauUsername}
            tableauBaseUrl={tableauBaseUrl}
            setTableauBaseUrl={setTableauBaseUrl}
            tableauUrl={tableauUrl}
            setTableauUrl={setTableauUrl}
            tableauSiteName={tableauSiteName}
            setTableauSiteName={setTableauSiteName}
          />
        )}

        {activeStep === 1 && (
          <Step2
            clientId={clientId}
            setClientId={setClientId}
            appSecretId={appSecretId}
            setAppSecretId={setAppSecretId}
            appSecretValue={appSecretValue}
            setAppSecretValue={setAppSecretValue}
          />
        )}

        {activeStep === 2 && (
          <Step3
            patName={patName}
            setPatName={setPatName}
            patSecret={patSecret}
            setPatSecret={setPatSecret}
            handleSubmit={handleSubmit}
          />
        )}
      </div>

      <div className="mt-12 flex justify-between">
        <Button onClick={handlePrev} disabled={isFirstStep}>
          Prev
        </Button>
        <Button onClick={handleNext} disabled={isLastStep}>
          Next
        </Button>
      </div>
    </div>
  );
};

export default MultiForm;
