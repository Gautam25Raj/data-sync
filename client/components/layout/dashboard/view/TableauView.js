"use client";

import { useRef } from "react";
import { useSelector } from "react-redux";

export default function TableauView({ view, edit }) {
  const ref = useRef(null);

  const token = useSelector((state) => state.site.token);

  return (
    <div className="flex flex-col flex-grow justify-between h-full bg-gray-50 rounded-lg py-12 overflow-y-auto overflow-x-hidden relative">
      <div className="absolute top-0 left-0 w-full h-full p-2" ref={ref}>
        {edit ? (
          <tableau-authoring-viz
            id="tableauViz"
            height={ref.current?.offsetHeight}
            width={ref.current?.offsetWidth}
            hide-tabs
            src={view.embedUrl}
            toolbar="top"
            token={token}
            hide-close-button
          ></tableau-authoring-viz>
        ) : (
          <tableau-viz
            id="tableauViz"
            height={ref.current?.offsetHeight}
            width={ref.current?.offsetWidth}
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
