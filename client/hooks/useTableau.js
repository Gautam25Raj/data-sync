"use client";

import { toast } from "sonner";

const { useDispatch } = require("react-redux");

const { setToken } = require("@/redux/slice/siteSlice");

const useTableau = () => {
  const dispatch = useDispatch();

  const getTableauToken = async (id) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/tableau/token/${id}`,
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

      const token = await response.json();
      dispatch(setToken(token));

      return token;
    } catch (err) {
      toast.error(err.message);
    }
  };

  const getTableauProjects = async (id) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/tableau/projects/${id}`,
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

      const projects = await response.json();

      return projects;
    } catch (err) {
      toast.error(err.message);
    }
  };

  return { getTableauToken, getTableauProjects };
};

export default useTableau;
