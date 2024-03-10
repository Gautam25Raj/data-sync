"use client";

import { AiOutlineLoading3Quarters } from "react-icons/ai";

import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { useState, useEffect, Suspense } from "react";

import { setSite } from "@/redux/slice/siteSlice";

const SiteProvider = ({ children }) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserSites = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/site`,
          {
            method: "GET",

            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          const data = await response.json();
          throw new Error(data.error);
        }

        const sites = await response.json();
        console.log(sites);

        dispatch(setSite(sites));
      } catch (err) {
        console.error("err");
        toast.error("An error occurred while fetching sites.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserSites();
  }, []);

  if (isLoading) {
    return (
      <div className="h-screen w-screen flex justify-center items-center">
        <AiOutlineLoading3Quarters
          size={30}
          className="animate-spin h-10 w-10"
        />
      </div>
    );
  }

  return <Suspense>{children}</Suspense>;
};

export default SiteProvider;
