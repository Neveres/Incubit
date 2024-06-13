"use client";
import { Canvas } from "@react-three/fiber";
import { Mesh } from "./Mesh";

export const Box = () => {
  return (
    <Canvas>
      <ambientLight intensity={Math.PI / 2} />
      <spotLight
        position={[10, 10, 10]}
        angle={0.15}
        penumbra={1}
        decay={0}
        intensity={Math.PI}
      />
      <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} />

      <Mesh position={[0, 0, 0]} />
    </Canvas>
  );
};
