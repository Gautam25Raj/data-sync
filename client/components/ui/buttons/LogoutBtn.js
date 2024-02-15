"use client";

import { ArrowLeftStartOnRectangleIcon } from "@heroicons/react/24/outline";

import { toast } from "sonner";

import useUser from "@/hooks/useUser";

import SideNavItem from "../../sidebar/SideNavItem";

const LogoutBtn = () => {
  const { logoutUser } = useUser();

  const handleLogout = async () => {
    try {
      const response = await logoutUser();

      if (response) {
        toast.success("User Logout successfully.");
      }
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
