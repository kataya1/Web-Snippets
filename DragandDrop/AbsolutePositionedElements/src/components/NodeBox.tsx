import React, { useRef } from "react";
import "./NodeBox.css";

export interface NodeBoxProps {
  id: string;
  top: number;
  left: number;
}

interface DragEvent extends React.DragEvent<HTMLDivElement> {}

const NodeBox: React.FC<NodeBoxProps> = ({ id, top, left }) => {
  const ref = useRef<HTMLDivElement>(null);
  function handleDragStart(e: DragEvent) {
    const rect = (ref.current as HTMLDivElement).getBoundingClientRect();
    // const rect = ref.current?.getBoundingClientRect();
    ref.current?.classList.add("dragging");

    // where the mouse grapped the nodebox
    const offsetX = e.clientX - rect.x;
    const offsetY = e.clientY - rect.y;
    e.dataTransfer.setData(
      "text/plain",
      JSON.stringify({
        id,
        offsetX,
        offsetY,
      })
    );
    e.dataTransfer.dropEffect = "move";
    e.dataTransfer.effectAllowed = "move";
    console.log(e.dataTransfer);
  }

  function handleDragEnd(e: DragEvent) {
    e.preventDefault();
    // console.log("Drag end at: ", e.clientX, e.clientY);
    (e.target as HTMLElement).classList.remove("dragging");
    e.dataTransfer.clearData();
    // e.target.classList.remove("dragging");
    // ref.current?.classList.remove("dragging");
  }
  return (
    <div
      ref={ref}
      className="node-box"
      id={id}
      style={{ top, left }}
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    ></div>
  );
};

export default NodeBox;
