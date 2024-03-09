"use client";

import { toast } from "sonner";
import { useEffect, useState } from "react";

import FormInput from "@/components/ui/FormInput";

const Step1 = ({
  siteName,
  setSiteName,
  tableauUsername,
  setTableauUsername,
  tableauBaseUrl,
  setTableauBaseUrl,
  tableauUrl,
  setTableauUrl,
  tableauSiteName,
  setTableauSiteName,
}) => {
  const [typingTimeout, setTypingTimeout] = useState(0);

  function parseTableauUrl(url) {
    if (!url) return;

    try {
      const urlObj = new URL(url);

      const baseUrl = `${urlObj.protocol}//${urlObj.hostname}/api/3.4`;

      const pathSegments = urlObj.href.split("/");
      const siteIndex = pathSegments.indexOf("site");
      const name = siteIndex !== -1 ? pathSegments[siteIndex + 1] : "";

      return { baseUrl, name };
    } catch (error) {
      toast.error("Invalid Tableau URL");

      return {
        baseUrl: "",
        name: "",
      };
    }
  }

  const handleTableauUrlChange = (url) => {
    setTableauUrl(url);

    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }

    setTypingTimeout(
      setTimeout(() => {
        if (!url) return;

        const { baseUrl, name } = parseTableauUrl(url);

        setTableauBaseUrl(baseUrl);
        setTableauSiteName(name);
      }, 1000)
    );
  };

  useEffect(() => {
    return () => {
      if (typingTimeout) {
        clearTimeout(typingTimeout);
      }
    };
  }, [typingTimeout]);

  return (
    <div className="space-y-4 max-w-md w-full mx-auto">
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

      <FormInput
        label="Your Tableau Dashboard URL"
        id={"tableau-url"}
        type={"text"}
        placeholder={"https://10ax.online.tableau.com/#/site/datasync/home"}
        input={tableauUrl}
        setInput={handleTableauUrlChange}
      />

      {tableauUrl && (
        <>
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

          <p className="text-xs text-gray-500">
            <span className="text-red-400 font-bold">Note:</span> This is
            automatically filled. Feel free to update it if it looks wrong.
          </p>
        </>
      )}
    </div>
  );
};

export default Step1;
