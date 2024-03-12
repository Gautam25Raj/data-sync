"use client";

import { Button } from "@material-tailwind/react";

import { Suspense } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

import { clearCurrentView } from "@/redux/slice/siteSlice";

import { useState } from "react";
import TableauView from "./TableauView";

export default function ViewContainer() {
  const dispatch = useDispatch();

  const [edit, setEdit] = useState(false);

  const view = useSelector((state) => state.site.currentView);

  return (
    <Suspense
      fallback={<AiOutlineLoading3Quarters className="mx-auto animate-spin" />}
    >
      <div className="h-full w-full flex flex-col">
        <div className="flex justify-between items-center px-4 py-2 bg-gray-50 border-b border-gray-400">
          <h2 className="text-3xl text-black font-bold">{view.name}</h2>

          <div className="flex gap-2">
            <Button
              color="gray"
              onClick={() => {
                setEdit(!edit);
              }}
            >
              {edit ? "Stop Editing" : "Edit"}
            </Button>

            <Button
              color="gray"
              onClick={() => {
                dispatch(clearCurrentView());
              }}
            >
              Clear View
            </Button>
          </div>
        </div>

        <TableauView view={view} edit={edit} />
      </div>
    </Suspense>
  );
}
