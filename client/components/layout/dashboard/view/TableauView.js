"use client";

import { useSelector } from "react-redux";

export default function TableauView({ view, edit }) {
  const token = useSelector((state) => state.site.token);
  return (
    <div className="flex flex-col flex-grow justify-between h-full bg-gray-50 rounded-lg py-12 overflow-y-auto overflow-x-hidden relative">
      <div className="absolute top-0 left-0 w-full h-full p-2">
        {edit ? (
          <tableau-authoring-viz
            id="tableauViz"
            height="100%"
            width="100%"
            hide-tabs
            src={view.embedUrl}
            toolbar="top"
            token={token}
            hide-close-button
          ></tableau-authoring-viz>
        ) : (
          <tableau-viz
            id="tableauViz"
            height="100%"
            width="100%"
            hide-tabs
            hide-edit-button
            src={view.embedUrl}
            device={"desktop"}
            toolbar="top"
            token={token}
          ></tableau-viz>
        )}
      </div>
    </div>
  );
}
