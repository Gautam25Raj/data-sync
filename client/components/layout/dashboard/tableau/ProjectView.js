"use client";

import { List } from "@material-tailwind/react";

import ProjectItems from "./ProjectItems";

export default function ProjectView({ projects }) {
  return (
    <div className="flex flex-col flex-grow justify-between h-full bg-gray-50 rounded-lg py-12 overflow-y-auto overflow-x-hidden relative">
      <div className="absolute top-0 left-0 w-full h-full p-2">
        <List>
          {projects.map((project) => (
            <ProjectItems
              key={project.id}
              name={project.name}
              workbooks={project.workbooks}
            />
          ))}
        </List>
      </div>
    </div>
  );
}
