"use client";

import { ArrowLeftStartOnRectangleIcon } from "@heroicons/react/24/outline";

import { toast } from "sonner";
import { useDispatch } from "react-redux";

import { clearUser } from "@/redux/slice/userSlice";

import SideNavItem from "../../sidebar/SideNavItem";

const LogoutBtn = () => {
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/logout`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );

      if (!response.ok) {
        const data = await response.json();
        toast.error(data.message);
        return;
      }

      localStorage.removeItem("token");
      toast.success("Logged out successfully.");
      dispatch(clearUser(null));
    } catch (error) {
      toast.error("Error logging out.");
    }
  };

  return (
    <SideNavItem
      label="Log Out"
      href="/"
      onClick={handleLogout}
      icon={<ArrowLeftStartOnRectangleIcon />}
    />
  );
};

export default LogoutBtn;
