import useAbly from "@/hooks/useAbly";
import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect, useState } from "react";
import Spaces from "@ably/spaces";
import Ably from "ably";
import { updateCurrentSpace, updateSpaces } from "@/redux/slice/ablySlice";

const LiveCursor = () => {
  // const { initializeSpaces } = useAbly();

  const [cursors, setCursors] = useState({});
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();

  // const ablyAuth = useSelector((state) => state.ably.ably);

  // const memoizedInitSpaces = useCallback(
  //   () => initializeSpaces("live-cursor", "123", setCursors),
  //   [setCursors]
  // );

  // useEffect(() => {
  //   let cleanupSpaces;

  //   memoizedInitSpaces().then((cleanup) => (cleanupSpaces = cleanup));

  //   return () => {
  //     if (cleanupSpaces) {
  //       cleanupSpaces();
  //     }
  //   };
  // }, []);

  useEffect(() => {
    let cursorSubscription;
    let space;

    const mouseMoveHandler = ({ clientX, clientY }) => {
      space.cursors.set({
        position: { x: clientX, y: clientY },
        data: {
          color: "red",
        },
      });
    };

    const init = async () => {
      const ablyAuth = new Ably.Realtime.Promise({
        authUrl: `${
          process.env.NEXT_PUBLIC_BACKEND_URL
        }/api/ably/auth/${"test"}`,
      });
      const spacesInstance = new Spaces(ablyAuth);

      space = await spacesInstance.get("spaceName");

      await space.enter({ name: "username" });

      dispatch(updateSpaces(spacesInstance));
      dispatch(updateCurrentSpace(space));

      cursorSubscription = space.cursors.subscribe(
        "update",
        async (cursorUpdate) => {
          const members = await space.members.getAll();
          const member = members.find(
            (member) => member.connectionId === cursorUpdate.connectionId
          );

          setCursors((prevCursors) => ({
            ...prevCursors,
            cursorUpdate,
          }));
          console.log("Cursor subscription:", cursorUpdate);
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
  }, []);

  return (
    <div>
      Move your cursor!
      {Object.entries(cursors).map((cursor) => {
        console.log("Cursor:", cursor);
        return (
          <div
            key={cursor[1].connectionId}
            style={{
              position: "absolute",
              left: cursor[1].position.x,
              top: cursor[1].position.y,
            }}
          >
            Cursor of {cursor[1].clientId}
          </div>
        );
      })}
    </div>
  );
};

export default LiveCursor;
