import { useFrame } from "@react-three/fiber";
import React from "react";

export const Light = () => {
  const light = React.useRef();

  useFrame(() => {
    if (light.current && light.current.angle < Math.PI / 2 / 2.5) {
      light.current.angle += 0.02;
    }
  });

  return (
    <spotLight
      ref={light}
      color={"hsl(25, 100%, 64%)"}
      position={[0, 2, 0]}
      angle={0}
      intensity={30}
      penumbra={1}
      decay={1}
    />
  );
};
