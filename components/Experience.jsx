import { Macbook } from "./Macbook";
import * as THREE from "three";
import React from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { useStore } from "@/hooks/useStore";
import { Iphone } from "./IPhone";

export const Experience = ({ rotate = false, position }) => {
  const group = React.useRef();
  const [device, setDevice] = React.useState();

  const { setIsCinematic } = useStore();
  const speedFactor = 0.02;

  React.useEffect(() => {
    if (window.innerWidth <= 720) {
      setDevice("mobile");
    } else {
      setDevice("laptop");
    }
  });

  useFrame(({ camera }) => {
    if (group.current && rotate) {
      camera.position.y = 0.5;

      group.current.rotation.y = THREE.MathUtils.lerp(
        group.current.rotation.y,
        307.9,
        speedFactor,
      );

      if (group.current.rotation.y >= 100 && camera.position.z >= 0.2) {
        camera.position.z -= 0.025;
      }

      if (camera.position.z < 0.2) {
        window.sessionStorage.setItem("cinematicPass", true);
        setIsCinematic(false);
      }
    }
    camera.lookAt(new THREE.Vector3(-0.0, 0.45, -0.6));
  });

  return (
    <group ref={group}>
      {device === "mobile" ? (
        <Iphone scale={0.01} show={rotate} position={position} />
      ) : (
        <Macbook scale={4} position={position} show={rotate} />
      )}
      <mesh position={[position[0], -10, position[2]]}>
        <boxGeometry args={[2, 20, 2]} />
        <meshToonMaterial />
      </mesh>
    </group>
  );
};
