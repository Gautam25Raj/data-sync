"use client";

import { setCurrentView } from "@/redux/slice/siteSlice";
import { ViewfinderCircleIcon } from "@heroicons/react/24/outline";
import { ListItem } from "@material-tailwind/react";
import { useDispatch } from "react-redux";

export default function ViewItems({ view }) {
  const dispatch = useDispatch();
  return (
    <ListItem
      key={view.id}
      className="flex gap-2 items-center"
      onClick={() => {
        dispatch(setCurrentView(view));
      }}
    >
      <ViewfinderCircleIcon className="h-6 w-6" />
      <h3 className="text-lg mt-1">{view.name}</h3>
    </ListItem>
  );
}
