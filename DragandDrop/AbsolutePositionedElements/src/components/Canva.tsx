import React, { useState } from "react";
import NodeBox, { NodeBoxProps } from "./NodeBox";
import { v4 as uuidv4 } from "uuid";
import "./Canva.css";

const Canva: React.FC = () => {
  const [boxes, setBoxes] = useState<NodeBoxProps[]>([]);

  function handleDoubleClick(e: React.MouseEvent) {
    const targetBox = e.target as HTMLElement;

    if (targetBox.classList.contains("node-box")) {
      return;
    }

    // logic to add box
    const rect = (e.target as HTMLElement).getBoundingClientRect();
    const id = uuidv4();
    setBoxes((existing) => [
      ...existing,
      {
        id,
        top: e.clientY - rect.top - 25,
        left: e.clientX - rect.left - 125,
      },
    ]);
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    // get the id, and the new top, left value from e.dataTransfer
    const data = JSON.parse(e.dataTransfer.getData("text/plain"));
    const { id, offsetX, offsetY } = data;
    // but how to set the top and left value when i don't have the element
    // solution - I don't need to have it. when boxes change it rerenders. loop/map over nodeprops find the element with the id and modify it's top and left with the new value
    const left = e.clientX + offsetX;
    const top = e.clientY + offsetY;

    setBoxes((prevBoxes) => {
      return prevBoxes.map((box) => {
        if (box.id === id) {
          return { ...box, left, top };
        }
        return box;
      });
    });
  };
  return (
    <div
      className="canva"
      onDoubleClick={handleDoubleClick}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      {boxes.map((box) => (
        <NodeBox key={box.id} {...box} />
      ))}
    </div>
  );
};

export default Canva;
