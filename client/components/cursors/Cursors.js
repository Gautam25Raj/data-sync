import React from "react";
import { useCursors } from "@ably/spaces/react";

import CursorSvg from "./CursorSvg";

const YourCursor = ({ self, position }) => {
  if (!self) return null;

  const cursorColor = self.profileData.userColors;

  return (
    <div
      className="absolute"
      style={{
        zIndex: 1000,
        top: `${position.y}px`,
        left: `${position.x}px`,
      }}
    >
      <CursorSvg cursorColor={cursorColor.name} />

      <div
        style={{ backgroundColor: cursorColor.bg }}
        className="px-2 py-1 rounded-full text-nowrap whitespace-nowrap text-black"
      >
        You
      </div>
    </div>
  );
};

const MemberCursors = () => {
  const { cursors } = useCursors({ returnCursors: true });

  return (
    <>
      {Object.values(cursors).map((data) => {
        const cursorUpdate = data.cursorUpdate;
        const member = data.member;
        console.log("member", data);

        if (cursorUpdate?.data?.state === "leave") return null;
        const { userColors } = member.profileData;

        return (
          <div
            key={member.connectionId}
            id={`member-cursor-${member.connectionId}`}
            className="absolute"
            style={{
              zIndex: 1000,
              left: `${cursorUpdate.position.x}px`,
              top: `${cursorUpdate.position.y}px`,
            }}
          >
            <CursorSvg cursorColor={userColors.name} />

            <div
              style={{ backgroundColor: userColors.bg }}
              className="px-2 py-1 rounded-full text-nowrap whitespace-nowrap text-black"
            >
              {member.profileData.name}
            </div>
          </div>
        );
      })}
    </>
  );
};

export { MemberCursors, YourCursor };
