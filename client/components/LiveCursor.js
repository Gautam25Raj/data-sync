import useAbly from "@/hooks/useAbly";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

const LiveCursor = () => {
  const { initializeSpaces } = useAbly();

  const [cursors, setCursors] = useState({});

  const ablyToken = useSelector((state) => state.user.ablyToken);

  // useEffect(() => {
  //   const spaces = async () => {
  //     await initializeSpaces("live-cursor", "username", setCursors);
  //   };

  //   if (ablyToken) {
  //     spaces();
  //   }
  // }, [ablyToken]);

  return (
    ablyToken && (
      <div>
        Move your cursor!
        {/* {Object.entries(cursors).map(([connectionId, position]) => (
          <div
            key={connectionId}
            style={{ position: "absolute", left: position.x, top: position.y }}
          >
            Cursor of {connectionId}
          </div>
        ))} */}
      </div>
    )
  );
};

export default LiveCursor;
