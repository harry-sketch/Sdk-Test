import { Canvas } from "@react-three/fiber";
import React from "react";
import { Color } from "three";

type CanvasWrapperProps = {
  children: React.ReactNode;
};

const CanvasWrapper: React.FC<CanvasWrapperProps> = ({ children }) => {
  return (
    <Canvas style={{ height: 600 }} camera={{ fov: 25 }} shadows>
      <ambientLight intensity={0.5} />
      <pointLight
        position={[10, 10, 10]}
        color={new Color(1, 1, 0)}
        intensity={0.5}
        castShadow
      />
      <pointLight
        position={[-10, 0, 10]}
        color={new Color(1, 0, 0)}
        intensity={0.5}
        castShadow
      />
      <pointLight position={[0, 0, 10]} intensity={0.5} castShadow />
      {children}
    </Canvas>
  );
};
export default CanvasWrapper;
