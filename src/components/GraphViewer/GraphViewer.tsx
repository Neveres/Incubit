import { Canvas } from "@react-three/fiber";
import { OrbitControls, Html } from "@react-three/drei";
import { Edge } from "./Edge";

interface GraphViewerProps {
  graph: Incubit.Graph;
  onEdgeLabelChange: (from: number, to: number, label: string) => void;
}

export const GraphViewer: React.FC<GraphViewerProps> = ({
  graph,
  onEdgeLabelChange,
}) => {
  return (
    <Canvas camera={{ position: [0, 0, 10], fov: 60 }} className="!h-screen">
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <OrbitControls />
      {graph.nodes.map((node) => (
        <mesh key={node.id} position={node.position}>
          <sphereGeometry args={[0.5, 32, 32]} />
          <meshStandardMaterial color="yellow" />
          <Html position={[0, 0.7, 0]}>
            <div className="text-black">{node.name}</div>
          </Html>
        </mesh>
      ))}
      {graph.edges.map((edge) => (
        <Edge
          key={edge.id}
          edge={edge}
          nodes={graph.nodes}
          onLabelChange={onEdgeLabelChange}
        />
      ))}
    </Canvas>
  );
};
