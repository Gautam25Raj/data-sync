"use client";

import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";

import useTableau from "@/hooks/useTableau";

export default function TableauView({ view, edit }) {
  const ref = useRef(null);

  const token = useSelector((state) => state.site.token);
  const currentSite = useSelector((state) => state.site.currentSite);

  const { getTableauToken } = useTableau();

  useEffect(() => {
    const getToken = async () => {
      const response = await getTableauToken(currentSite._id);
      console.log(response);
    };

    if (currentSite._id) getToken();
  }, [currentSite, edit]);

  return (
    <div className="flex flex-col flex-grow justify-between h-full bg-gray-50 rounded-lg py-12 overflow-y-auto overflow-x-hidden relative">
      <div className="absolute top-0 left-0 w-full h-full p-2" ref={ref}>
        {token ? (
          edit ? (
            <tableau-authoring-viz
              id="tableauViz"
              height={ref.current?.offsetHeight}
              width={ref.current?.offsetWidth}
              hide-tabs
              src={view.embedUrl}
              device={"desktop"}
              toolbar="top"
              // token={token.token}
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
              // token={token.token}
            ></tableau-viz>
          )
        ) : (
          <p>Fetching...</p>
        )}
      </div>
    </div>
  );
}
