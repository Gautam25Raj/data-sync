"use client";

import { BookOpenIcon } from "@heroicons/react/24/solid";
import { List, ListItem } from "@material-tailwind/react";
import { useState } from "react";
import ViewItems from "./ViewItems";

export default function WorkbookItems({ workbook }) {
  const [toggle, setToggle] = useState(false);
  return (
    <>
      <ListItem
        key={workbook.id}
        className="flex gap-2 items-center"
        onClick={() => {
          setToggle(!toggle);
        }}
      >
        <BookOpenIcon className="h-6 w-6" />
        <h3 className="text-lg mt-1">{workbook.name}</h3>
      </ListItem>

      {toggle && workbook.views.length > 0 && (
        <div className="flex gap-2">
          <div className="ml-5 w-1 bg-black flex-grow rounded-lg opacity-35"></div>
          <List className="ml-2 w-full">
            {workbook.views.map((view) => (
              <ViewItems key={view.id} view={view} />
            ))}
          </List>
        </div>
      )}
    </>
  );
}
