"use client";

import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";

import {
  addCreatedSite,
  setCurrentSite,
  setSite,
  updateSite as updateSiteRedux,
  deleteSite as deleteSiteRedux,
  clearCurrentSite,
} from "@/redux/slice/siteSlice";

const useSite = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const getSite = async (siteId) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/site/${siteId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error);
      }

      const siteData = await response.json();

      dispatch(setCurrentSite(siteData));
      return siteData;
    } catch (err) {
      toast.error(err.message);
    }
  };

  const getAllSitesByAdmin = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/site`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error);
      }

      const sites = await response.json();

      dispatch(setSite(sites));
      return sites;
    } catch (err) {
      toast.error(err.message);
    }
  };

  const createSite = async (siteData) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/site`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(siteData),
        }
      );

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error);
      }
      const newSiteData = await response.json();

      dispatch(addCreatedSite(newSiteData));
      toast.success("Created New Site");

      return newSiteData;
    } catch (err) {
      toast.error(err.message);

      if (err.message.includes("Site already exists")) {
        router.push(`/site/${siteData.siteName}`);
      }
    }
  };

  const updateSite = async (siteId, updatedData) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/site/${siteId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(updatedData),
        }
      );

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error);
      }
      const updatedSiteData = await response.json();
      toast.success("Updated Site");

      dispatch(updateSiteRedux(updatedSiteData));

      return updatedSiteData;
    } catch (err) {
      toast.error(err.message);
    }
  };

  const deleteSite = async (siteId) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/site/${siteId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error);
      }

      dispatch(deleteSiteRedux(siteId));
      // dispatch(clearCurrentSite());

      toast.success("Deleted Site");
    } catch (err) {
      toast.error(err.message);
    }
  };

  return {
    getSite,
    createSite,
    updateSite,
    deleteSite,
    getAllSitesByAdmin,
  };
};

export default useSite;
