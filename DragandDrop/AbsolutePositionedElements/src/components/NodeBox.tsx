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
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    console.log(rect);
    console.log(e.clientX);
    console.log(e.clientY);
    const offsetX = e.clientX - centerX;
    const offsetY = e.clientY - centerY;

    e.dataTransfer.setData(
      "text",
      JSON.stringify({
        id,
        offsetX,
        offsetY,
      })
    );
  }
  // const offset = {
  //   x: e.clientX - rect.left,
  //   y: e.clientY - rect.top,
  // };
  // console.log(offset);
  // console.log(`y = ${e.clientY - top}`);
  // console.log(`x = ${e.clientX - left}`);
  // e.dataTransfer.setData("id", id);
  // e.dataTransfer.setData("text/plain", json.stringfy({ id: -, mousX: }));
  // e.dataTransfer.setData("mouseX", e.clientX.toString());
  // e.dataTransfer.setData("mouseY", e.clientY.toString());
  // e.dataTransfer.setData("left", left.toString());
  // e.dataTransfer.setData("top", top.toString());

  function handleDragEnd(e: DragEvent) {
    // e.preventDefault();
    console.log("Drag end at: ", e.clientX, e.clientY);
    (e.target as HTMLElement).classList.remove("dragging");
    // e.target.classList.remove("dragging");
    ref.current?.classList.remove("dragging");
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
