import { PiCursorFill } from "react-icons/pi";

import useAbly from "@/hooks/useAbly";
import Ably from "ably";
import Spaces from "@ably/spaces";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";

import { updateCurrentSpace, updateSpaces } from "@/redux/slice/ablySlice";

const LiveCursor = ({ currentUser, color, channelId }) => {
  const dispatch = useDispatch();

  const [cursors, setCursors] = useState({});

  useEffect(() => {
    let cursorSubscription;
    let space;

    const mouseMoveHandler = ({ clientX, clientY }) => {
      space.cursors.set({
        position: { x: clientX - 320, y: clientY },
      });
    };

    const init = async () => {
      const ablyAuth = new Ably.Realtime.Promise({
        authUrl: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/ably/auth/${currentUser.username}`,
      });
      const spacesInstance = new Spaces(ablyAuth);

      space = await spacesInstance.get(channelId);

      await space.enter({ name: currentUser.username });

      dispatch(updateSpaces(spacesInstance));
      dispatch(updateCurrentSpace(space));

      cursorSubscription = space.cursors.subscribe(
        "update",
        async (cursorUpdate) => {
          const members = await space.members.getAll();

          const member = members.find((member) => {
            return member.connectionId === cursorUpdate.connectionId;
          });

          console.log("Member:", member);

          setCursors((prevCursors) => ({
            ...prevCursors,
            cursorUpdate,
          }));
        }
      );

      window.addEventListener("mousemove", mouseMoveHandler);
    };

    init();

    return () => {
      window.removeEventListener("mousemove", mouseMoveHandler);

      if (cursorSubscription) {
        cursorSubscription.unsubscribe();
      }
    };
  }, [channelId]);

  return (
    <div className="z-20">
      {Object.entries(cursors).map((cursor) => {
        return (
          <div
            key={cursor[1].connectionId}
            style={{
              position: "absolute",
              left: cursor[1].position.x,
              top: cursor[1].position.y,
            }}
          >
            <PiCursorFill color={color.name} />

            <p
              className="text-black px-3 py-1 rounded-full"
              style={{
                backgroundColor: color.bg,
              }}
            >
              {cursor[1].clientId}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default LiveCursor;
