"use client";

import React, { useState, useRef } from "react";

import Board from "./Board";
import Tools from "./Tools";

const Whiteboard = () => {
  const ctx = useRef(null);
  const canvas = useRef(null);

  const [tool, setTool] = useState("pencil");
  const [color, setColor] = useState("#c95a5a");

  const [history, setHistory] = useState([]);
  const [elements, setElements] = useState([]);

  return (
    <div className="Board">
      <div>
        <Board
          canvasRef={canvas}
          ctxRef={ctx}
          elements={elements}
          setElements={setElements}
          color={color}
          tool={tool}
        />
      </div>

      <div className="fixed bottom-2.5 left-1/2 -translate-x-1/2 w-auto h-12 p-2.5 bg-white rounded-md flex items-center justify-center shadow-lg toolbox">
        <Tools
          tool={tool}
          elements={elements}
          history={history}
          setElements={setElements}
          setHistory={setHistory}
          ctx={ctx}
          canvas={canvas}
          setTool={setTool}
        />
      </div>
    </div>
  );
};

export default Whiteboard;
