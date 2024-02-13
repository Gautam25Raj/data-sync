"use client";

import { Card } from "@material-tailwind/react";
import { ArrowLeftStartOnRectangleIcon } from "@heroicons/react/24/outline";

import { toast } from "sonner";
import { useDispatch } from "react-redux";

import Logo from "../Logo";
import SideNav from "./SideNav";
import SideNavItem from "./SideNavItem";

import { clearUser } from "@/redux/slice/userSlice";

const Sidebar = () => {
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
    <div className="sticky h-screen top-0 py-2 ml-2 w-full min-w-fit max-w-72">
      <Card className="h-full space-y-3 overflow-y-auto rounded-xl px-5 py-4 hide-scrollbar bg-white">
        <section className="flex h-full flex-col justify-between gap-8">
          <Logo />

          <SideNav />

          <SideNavItem
            label="Log Out"
            href="/"
            onClick={handleLogout}
            icon={<ArrowLeftStartOnRectangleIcon />}
          />
        </section>
      </Card>
    </div>
  );
};

export default Sidebar;
