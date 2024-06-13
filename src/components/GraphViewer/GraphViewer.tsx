import React, { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Html } from "@react-three/drei";

interface GraphViewerProps {
  graph: Incubit.Graph;
  onEdgeLabelChange: (from: number, to: number, label: string) => void;
}

export const GraphViewer: React.FC<GraphViewerProps> = ({
  graph,
  onEdgeLabelChange,
}) => {
  return (
    <Canvas camera={{ position: [0, 0, 10], fov: 60 }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <OrbitControls />
      {graph.nodes.map((node) => (
        <mesh key={node.id} position={node.position}>
          <sphereGeometry args={[0.5, 32, 32]} />
          <meshStandardMaterial color="orange" />
          <Html position={[0, 0.7, 0]}>
            <div style={{ color: "white" }}>{node.name}</div>
          </Html>
        </mesh>
      ))}
      {graph.edges.map((edge) => (
        <EdgeComponent
          key={edge.id}
          edge={edge}
          nodes={graph.nodes}
          onLabelChange={onEdgeLabelChange}
        />
      ))}
    </Canvas>
  );
};

interface EdgeComponentProps {
  edge: Incubit.Edge;
  nodes: Incubit.Node[];
  onLabelChange: (from: number, to: number, label: string) => void;
}

const EdgeComponent: React.FC<EdgeComponentProps> = ({
  edge,
  nodes,
  onLabelChange,
}) => {
  const fromNode = nodes.find((node) => node.id === edge.source);
  const toNode = nodes.find((node) => node.id === edge.target);
  const [editing, setEditing] = useState(false);
  const [label, setLabel] = useState(edge.value);

  if (!fromNode || !toNode) return null;

  return (
    <>
      <line>
        <bufferGeometry>
          <bufferAttribute
            // attachObject={["attributes", "position"]}
            array={
              new Float32Array([...fromNode.position!, ...toNode.position!])
            }
            count={2}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial color="white" />
      </line>
      <Html
        position={[
          (fromNode.position![0] + toNode.position![0]) / 2,
          (fromNode.position![1] + toNode.position![1]) / 2,
          (fromNode.position![2] + toNode.position![2]) / 2,
        ]}
      >
        <div
          style={{ color: "white", cursor: "pointer" }}
          onClick={() => setEditing(true)}
        >
          {editing ? (
            <input
              type="text"
              value={label}
              onChange={(e) => setLabel(e.target.value)}
              onBlur={() => {
                setEditing(false);
                onLabelChange(edge.source, edge.target, label);
              }}
            />
          ) : (
            label
          )}
        </div>
      </Html>
    </>
  );
};
