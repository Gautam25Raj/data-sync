"use client";
import { BriefcaseIcon } from "@heroicons/react/24/solid";
import { List, ListItem } from "@material-tailwind/react";
import { useState } from "react";
import WorkbookItems from "./WorkbookItems";

export default function ProjectItems({ name, workbooks }) {
  const [toggle, setToggle] = useState(false);
  return (
    <>
      <ListItem
        className="flex gap-3 items-center"
        onClick={() => {
          setToggle(!toggle);
        }}
      >
        <BriefcaseIcon className="h-6 w-6" />
        <h3 className="text-lg mt-1">{name}</h3>
      </ListItem>
      {toggle && workbooks.length > 0 && (
        <div className="flex gap-2">
          <div className="ml-5 w-1 bg-black flex-grow rounded-lg opacity-35"></div>
          <List className=" w-full">
            {workbooks.map((workbook) => (
              <WorkbookItems key={workbook.id} workbook={workbook} />
            ))}
          </List>
        </div>
      )}
    </>
  );
}
