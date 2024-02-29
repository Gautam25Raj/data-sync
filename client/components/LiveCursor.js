// import { PiCursorFill } from "react-icons/pi";

// import Ably from "ably";
// import Spaces from "@ably/spaces";
// import { useDispatch } from "react-redux";
// import { useEffect, useState } from "react";

// import { updateCurrentSpace, updateSpaces } from "@/redux/slice/ablySlice";

// const LiveCursor = ({ currentUser, color, channelId }) => {
//   const dispatch = useDispatch();

//   const [cursors, setCursors] = useState({});

//   useEffect(() => {
//     let cursorSubscription;
//     let space;

//     const mouseMoveHandler = ({ clientX, clientY }) => {
//       space.cursors.set({
//         position: { x: clientX - 320, y: clientY },
//       });
//     };

//     const init = async () => {
//       const ablyAuth = new Ably.Realtime.Promise({
//         authUrl: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/ably/auth/${currentUser.username}`,
//       });
//       const spacesInstance = new Spaces(ablyAuth);

//       space = await spacesInstance.get(channelId);

//       await space.enter({ name: currentUser.username });

//       dispatch(updateSpaces(spacesInstance));
//       dispatch(updateCurrentSpace(space));

//       cursorSubscription = space.cursors.subscribe(
//         "update",
//         async (cursorUpdate) => {
//           const members = await space.members.getAll();

//           const member = members.find((member) => {
//             return member.connectionId === cursorUpdate.connectionId;
//           });

//           setCursors((prevCursors) => ({
//             ...prevCursors,
//             [cursorUpdate.connectionId]: {
//               clientId: member.clientId,
//               position: cursorUpdate.position,
//             },
//           }));
//         }
//       );

//       window.addEventListener("mousemove", mouseMoveHandler);
//     };

//     init();

//     return () => {
//       window.removeEventListener("mousemove", mouseMoveHandler);

//       if (cursorSubscription) {
//         cursorSubscription.unsubscribe();
//       }
//     };
//   }, [channelId]);

//   return (
//     <div className="z-30">
//       {Object.entries(cursors).map((cursor) => {
//         return (
//           <div
//             key={cursor[1].connectionId}
//             style={{
//               position: "absolute",
//               left: cursor[1].position.x,
//               top: cursor[1].position.y,
//             }}
//           >
//             <PiCursorFill color={color.name} />

//             <p
//               className="text-black px-3 py-1 rounded-full"
//               style={{
//                 backgroundColor: color.bg,
//               }}
//             >
//               {cursor[1].clientId}
//             </p>
//           </div>
//         );
//       })}
//     </div>
//   );
// };

// export default LiveCursor;

// import { useMemo, useRef, useEffect } from "react";
// import { useMembers, useSpace } from "@ably/spaces/react";
// import { MemberCursors, YourCursor } from "./cursors/Cursors";

// /** 💡 Select a mock name to assign randomly to a new user that enters the space💡 */
// const mockName = () => mockNames[Math.floor(Math.random() * mockNames.length)];

// const LiveCursor = ({ currentUser, color, channelId }) => {
//   const name = useMemo(mockName, []);
//   /** 💡 Select a color to assign randomly to a new user that enters the space💡 */
//   const userColors = useMemo(
//     () => colours[Math.floor(Math.random() * colours.length)],
//     [],
//   );

//   /** 💡 Get a handle on a space instance 💡 */
//   const { space } = useSpace();

//   useEffect(() => {
//     space.enter({ name: `${channelId}::$space`, userColors: color });
//   }, [space]);

//   const { self } = useMembers();

//   const liveCursors = useRef(null);

//   return (
//     <div
//       id="live-cursors"
//       ref={liveCursors}
//       className={`example-container w-full cursor-none flex justify-center items-center relative bg-gray-400 h-screen`}
//     >
//       <p style={{ maxWidth: "80%", textAlign: "center" }}>
//         Move your cursor over the screen to see live cursors in action
//       </p>
//       <YourCursor self={self} parentRef={liveCursors} />
//       <MemberCursors />
//     </div>
//   );
// };

// export default LiveCursor;

import React, { useState, useEffect } from "react";
import { useSpace, useCursors, useMembers } from "@ably/spaces/react";

import { MemberCursors, YourCursor } from "./cursors/Cursors";

const LiveCursor = ({ currentUser, channelId }) => {
  const { space } = useSpace();
  const { set } = useCursors();
  const { self } = useMembers();
  // console.log("space", space);

  const [position, setPosition] = useState({ x: 0, y: 0 });

  const colors = [
    {
      bg: "#fecaca",
      name: "red",
    },
    {
      bg: "#fdba74",
      name: "orange",
    },
    {
      bg: "#fcd34d",
      name: "#d97706",
    },
    {
      bg: "#fef08a",
      name: "yellow",
    },
    {
      bg: "#d9f99d",
      name: "green",
    },
    {
      bg: "#a7f3d0",
      name: "#047857",
    },
    {
      bg: "#a5f3fc",
      name: "cyan",
    },
    {
      bg: "#38bdf8",
      name: "blue",
    },
    {
      bg: "#a78bfa",
      name: "purple",
    },
  ];

  const handleMouseMove = (event) => {
    const { clientX, clientY } = event;
    setPosition({ x: clientX - 288, y: clientY });
    set({ position: { x: clientX - 288, y: clientY } });
  };

  useEffect(() => {
    space.enter({
      name: currentUser.username,
      userColors: colors[Math.floor(Math.random() * colors.length)],
    });

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [space]);

  return (
    <div className="cursor-none">
      <YourCursor self={self} position={position} />
      <MemberCursors />
    </div>
  );
};

export default LiveCursor;
