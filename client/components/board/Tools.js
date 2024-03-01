import { BsFillCursorFill } from "react-icons/bs";

import Image from "next/image";
import { HiPencil } from "react-icons/hi2";
import { FaRegCircle } from "react-icons/fa";
import { MdOutlineRectangle } from "react-icons/md";
import { IoArrowUndoOutline, IoArrowRedoOutline } from "react-icons/io5";

const Tools = ({
  tool,
  setTool,
  elements,
  history,
  setElements,
  setHistory,
  ctx,
  canvas,
}) => {
  const handleToolClick = (selectedTool) => {
    setTool(selectedTool);
  };

  const undo = () => {
    if (elements.length === 0) {
      return;
    }

    setHistory((prevHistory) => [
      ...prevHistory,
      elements[elements.length - 1],
    ]);

    setElements((prevElements) => {
      const updatedElements = prevElements.slice(0, prevElements.length - 1);
      ctx.current.clearRect(0, 0, canvas.current.width, canvas.current.height);
      updatedElements.forEach((element) => {});

      return updatedElements;
    });
  };

  const redo = () => {
    if (history.length === 0) {
      return;
    }

    setElements((prevElements) => [
      ...prevElements,
      history[history.length - 1],
    ]);
    setHistory((prevHistory) => prevHistory.slice(0, prevHistory.length - 1));
  };

  return (
    <>
      <BsFillCursorFill
        size={24}
        onClick={() => handleToolClick("select")}
        className={
          (tool === "select" ? "selected" : "") +
          " text-black -rotate-90 cursor-pointer select-none mr-2.5 hover:scale-125"
        }
      />

      <div className="h-6 w-px bg-gray-900 mr-2.5"></div>

      <HiPencil
        size={24}
        onClick={() => handleToolClick("pencil")}
        className={
          (tool === "pencil" ? "selected" : "") +
          " text-black cursor-pointer select-none mr-2.5 hover:scale-125"
        }
      />

      <div className="h-6 w-px bg-gray-900 mr-2.5"></div>

      <FaRegCircle
        size={24}
        onClick={() => handleToolClick("circle")}
        className={
          (tool === "circle" ? "selected" : "") +
          " text-black cursor-pointer select-none mr-2.5 hover:scale-125"
        }
      />

      <div className="h-6 w-px bg-gray-900 mr-2.5"></div>

      <MdOutlineRectangle
        size={24}
        onClick={() => handleToolClick("rect")}
        className={
          (tool === "rect" ? "selected" : "") +
          " text-black cursor-pointer select-none mr-2.5 hover:scale-125"
        }
      />

      <div className="h-6 w-px bg-gray-900 mr-2.5"></div>

      <Image
        width={24}
        height={24}
        src="/assets/toolbar/line.svg"
        alt="Line Tool"
        onClick={() => handleToolClick("line")}
        className={tool === "line" ? "selected" : "" + " hover:scale-125"}
      />

      <div className="h-6 w-px bg-gray-900 mr-2.5"></div>

      <IoArrowUndoOutline
        size={24}
        onClick={() => undo()}
        disabled={elements.length === 0}
        className="text-black select-none mr-2.5 hover:scale-125"
        style={{
          opacity: elements.length === 0 ? 0.2 : 1,
          cursor: elements.length === 0 ? "not-allowed" : "pointer",
        }}
      />

      <div className="h-6 w-px bg-gray-900 mr-2.5"></div>

      <IoArrowRedoOutline
        size={24}
        onClick={() => redo()}
        disabled={history.length < 1}
        className="text-black select-none mr-2.5 hover:scale-125"
        style={{
          opacity: history.length < 1 ? 0.2 : 1,
          cursor: history.length < 1 ? "not-allowed" : "pointer",
        }}
      />
    </>
  );
};

export default Tools;
