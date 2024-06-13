import { useState } from "react";
import { Html, Line } from "@react-three/drei";

interface EdgeProps {
  edge: Incubit.Edge;
  nodes: Incubit.Node[];
  onLabelChange: (from: number, to: number, label: string) => void;
}

export const Edge = ({ edge, nodes, onLabelChange }: EdgeProps) => {
  const { source, target, value } = edge;

  const [editing, setEditing] = useState(false);
  const [label, setLabel] = useState(value);

  const fromNode = nodes.find(({ id }) => id === source);
  const toNode = nodes.find(({ id }) => id === target);

  if (!fromNode || !toNode) return null;

  return (
    <>
      <Line
        points={[fromNode.position, toNode.position]}
        color="white"
        lineWidth={2}
      />
      <Html
        position={[
          (fromNode.position[0] + toNode.position[0]) / 2,
          (fromNode.position[1] + toNode.position[1]) / 2,
          (fromNode.position[2] + toNode.position[2]) / 2,
        ]}
      >
        <div
          className="text-black bg-white rounded-md border-2 border-zinc-950 cursor-pointer min-w-[100px] text-center"
          onClick={() => setEditing(true)}
        >
          {editing ? (
            <input
              type="text"
              value={label}
              onChange={(event) => setLabel(event.target.value)}
              onBlur={() => {
                setEditing(false);
                onLabelChange(edge.source, edge.target, label);
              }}
              className="w-[100px] text-center"
            />
          ) : (
            label
          )}
        </div>
      </Html>
    </>
  );
};
