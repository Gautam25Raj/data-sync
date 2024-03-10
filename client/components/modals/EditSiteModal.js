"use client";

import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  Typography,
} from "@material-tailwind/react";
import { IoClose } from "react-icons/io5";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

import useSite from "@/hooks/useSite";

import { toast } from "sonner";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { toggleEditSiteModal } from "@/redux/slice/modalSlice";
import FormInput from "../ui/FormInput";
import { clearCurrentActionSite } from "@/redux/slice/siteSlice";

const EditSiteModal = () => {
  const dispatch = useDispatch();

  const { updateSite } = useSite();

  const [isLoaded, setIsLoaded] = useState(false);

  const [siteName, setSiteName] = useState("");
  const [tableauUsername, setTableauUsername] = useState("");
  const [tableauBaseUrl, setTableauBaseUrl] = useState("");
  const [tableauSiteName, setTableauSiteName] = useState("");

  const [clientId, setClientId] = useState("");
  const [appSecretId, setAppSecretId] = useState("");
  const [appSecretValue, setAppSecretValue] = useState("");

  const [patName, setPatName] = useState("");
  const [patSecret, setPatSecret] = useState("");

  const currentActionSite = useSelector(
    (state) => state.site.currentActionSite
  );
  const open = useSelector((state) => state.modal.editSiteModal);

  const handleOpen = () => {
    dispatch(toggleEditSiteModal());
    dispatch(clearCurrentActionSite());
  };

  useEffect(() => {
    if (currentActionSite) {
      setSiteName(currentActionSite.name);
      setTableauUsername(currentActionSite.username);
      setTableauBaseUrl(currentActionSite.baseUrl);
      setTableauSiteName(currentActionSite.siteName);
      setClientId(currentActionSite.clientId);
      setAppSecretId(currentActionSite.appSecretId);
      setAppSecretValue(currentActionSite.appSecretValue);
      setPatName(currentActionSite.patName);
      setPatSecret(currentActionSite.patSecret);
    }

    return () => {
      setSiteName("");
      setTableauUsername("");
      setTableauBaseUrl("");
      setTableauSiteName("");
      setClientId("");
      setAppSecretId("");
      setAppSecretValue("");
      setPatName("");
      setPatSecret("");
    };
  }, [currentActionSite]);

  const handleUpdateSite = async () => {
    setIsLoaded(true);

    try {
      if (
        !siteName ||
        !tableauUsername ||
        !tableauBaseUrl ||
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

      await updateSite(currentActionSite._id, {
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
    } catch (err) {
      toast.error("Failed to update site");
    } finally {
      setIsLoaded(false);
    }
  };

  return (
    <Dialog open={open} size="md" handler={handleOpen}>
      <div className="flex items-center justify-between p-2">
        <DialogHeader className="flex flex-col items-start">
          {" "}
          <Typography className="mb-1" variant="h4">
            Update
          </Typography>
        </DialogHeader>

        <Button
          onClick={handleOpen}
          className="bg-transparent p-1 shadow-none hover:shadow-none hover:bg-gray-200"
        >
          <IoClose className="h-6 w-6 text-black" />
        </Button>
      </div>

      <DialogBody className="!p-6">
        <Typography
          className="mb-10 -mt-12 text-lg text-md"
          color="gray"
          variant="lead"
        >
          Edit you current site details here.
        </Typography>

        <div className="space-y-2">
          <div className="flex gap-2">
            <FormInput
              label="Your site name"
              id={"site-name"}
              type={"text"}
              placeholder={"Example"}
              input={siteName}
              setInput={setSiteName}
            />

            <FormInput
              label="Your Tableau Username"
              id={"tableau-username"}
              type={"text"}
              placeholder={"xyz@datasync.com"}
              input={tableauUsername}
              setInput={setTableauUsername}
            />
          </div>

          <div className="flex gap-2">
            <FormInput
              label="Your Tableau Site Name"
              id={"tableau-site-name"}
              type={"text"}
              placeholder={"datasync"}
              input={tableauSiteName}
              setInput={setTableauSiteName}
            />

            <FormInput
              label="Your Tableau URL"
              id={"tableau-base-url"}
              type={"text"}
              placeholder={"https://10ax.online.tableau.com/api/3.4"}
              input={tableauBaseUrl}
              setInput={setTableauBaseUrl}
            />
          </div>

          <FormInput
            label="Your Client ID"
            id={"client-id"}
            type={"text"}
            placeholder={"abcd-efgh-ijkl-mnop-qrst"}
            input={clientId}
            setInput={setClientId}
          />

          <div className="flex gap-2">
            <FormInput
              label="Your App Secret ID"
              id={"app-secret-id"}
              type={"password"}
              placeholder={"abcd-efgh-ijkl-mnop-qrst"}
              input={appSecretId}
              setInput={setAppSecretId}
            />

            <FormInput
              label="Your App Secret Value"
              id={"app-secret-value"}
              type={"password"}
              placeholder={"abcd-efgh-ijkl-mnop-qrst"}
              input={appSecretValue}
              setInput={setAppSecretValue}
            />
          </div>

          <div className="flex gap-2">
            <FormInput
              label="Personal Access Token ID"
              id={"pat-id"}
              type={"password"}
              placeholder={"abcd-efgh-ijkl-mnop-qrst"}
              input={patName}
              setInput={setPatName}
            />

            <FormInput
              label="Personal Access Token Value"
              id={"pat-value"}
              type={"password"}
              placeholder={"abcd-efgh-ijkl-mnop-qrst"}
              input={patSecret}
              setInput={setPatSecret}
            />
          </div>
        </div>
      </DialogBody>

      <DialogFooter className="space-x-2">
        <Button variant="outlined" color="red" onClick={handleOpen}>
          cancel
        </Button>

        <Button variant="gradient" color="gray" onClick={handleUpdateSite}>
          {isLoaded ? (
            <AiOutlineLoading3Quarters className="mx-auto animate-spin" />
          ) : (
            "Update Site"
          )}
        </Button>
      </DialogFooter>
    </Dialog>
  );
};

export default EditSiteModal;
