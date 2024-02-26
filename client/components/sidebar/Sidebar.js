"use client";

import { Card } from "@material-tailwind/react";

import Logo from "../Logo";
import SideNav from "./SideNav";
import LogoutBtn from "../ui/buttons/LogoutBtn";

const Sidebar = () => {
  return (
    <div className="sticky h-screen top-0 py-2 ml-2 w-full min-w-fit max-w-72 z-30">
      <Card className="h-full space-y-3 rounded-xl px-5 py-4 hide-scrollbar bg-white">
        <section className="flex h-full flex-col justify-between gap-8 overflow-hidden">
          <Logo />

          <SideNav />

          <LogoutBtn />
        </section>
      </Card>
    </div>
  );
};

export default Sidebar;
