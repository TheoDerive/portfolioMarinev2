import React, { useRef } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import * as THREE from "three";
import { useLoader } from "@react-three/fiber";

export function Macbook(props) {
  const group = useRef();
  const materialRef = useRef();
  const { nodes, materials, animations } = useGLTF("/model/macbook.gltf");
  const { actions, mixer } = useAnimations(animations, group);
  const texture = useLoader(
    THREE.TextureLoader,
    "/model/textures/textureMac.png",
  );

  React.useEffect(() => {
    if (actions.Animation) {
      const actionAnimation = actions.Animation;
      actionAnimation.setLoop(THREE.LoopOnce);
      actionAnimation.play();

      setTimeout(() => {
        actionAnimation.paused = true;
      }, 3000);
    }
  }, [actions.Animation]);

  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <group name="Sketchfab_model" rotation={[-Math.PI / 2, 0, 0]}>
          <group name="root">
            <group name="GLTF_SceneRootNode" rotation={[Math.PI / 2, 0, 0]}>
              <group
                name="Bevels_2"
                position={[0, 0.008, -0.104]}
                rotation={[-0.001, 0, 0]}
                scale={0.275}
              >
                <group name="Empty_1" position={[0, 0.001, 0]} scale={-0.039}>
                  <group
                    name="Camera_Light_0"
                    position={[0, 0.077, -0.044]}
                    rotation={[1.949, 0, 0]}
                    scale={-25.381}
                  >
                    <mesh
                      name="Object_12"
                      geometry={nodes.Object_12.geometry}
                      material={materials.Camera_Light}
                    />
                  </group>
                </group>
                <mesh
                  name="Object_4"
                  geometry={nodes.Object_4.geometry}
                  material={materials.Black_Glass}
                />
                <mesh
                  name="Object_5"
                  geometry={nodes.Object_5.geometry}
                  material={materials.Black_Plastic}
                />
                <mesh
                  name="Object_6"
                  geometry={nodes.Object_6.geometry}
                  material={materials.Glass}
                />
                <mesh name="Object_7" geometry={nodes.Object_7.geometry}>
                  {props.show ? (
                    <meshBasicMaterial map={texture} ref={materialRef} />
                  ) : (
                    <meshBasicMaterial color={"grey"} />
                  )}
                </mesh>
                <mesh
                  name="Object_8"
                  geometry={nodes.Object_8.geometry}
                  material={materials.Space_Grey}
                />
                <mesh
                  name="Object_9"
                  geometry={nodes.Object_9.geometry}
                  material={materials["Space_Grey.001"]}
                />
              </group>
              <group
                name="Circle001_12"
                position={[0.203, 0.008, -0.104]}
                rotation={[-0.001, 0, 0]}
              />
              <group
                name="Caps_Lock_Light_3"
                position={[0, -0.014, 0]}
                scale={0.275}
              >
                <mesh
                  name="Object_14"
                  geometry={nodes.Object_14.geometry}
                  material={materials.Caps_Lock_Light}
                />
              </group>
              <group name="Cube_9" position={[0, -0.014, 0]}>
                <mesh
                  name="Object_32"
                  geometry={nodes.Object_32.geometry}
                  material={materials.Black_Plastic}
                />
              </group>
              <group name="Keyboard_8" position={[0, -0.014, 0]} scale={0.275}>
                <mesh
                  name="Object_29"
                  geometry={nodes.Object_29.geometry}
                  material={materials.Black_Plastic}
                />
                <mesh
                  name="Object_30"
                  geometry={nodes.Object_30.geometry}
                  material={materials.Keys}
                />
              </group>
              <group
                name="Macbook_Pro_4"
                position={[0, 0.008, -0.104]}
                rotation={[1.949, 0, 0]}
                scale={0.275}
              >
                <mesh
                  name="Object_16"
                  geometry={nodes.Object_16.geometry}
                  material={materials["Material.001"]}
                />
              </group>
              <group name="Main_Body_5" position={[0, -0.014, 0]} scale={0.275}>
                <mesh
                  name="Object_18"
                  geometry={nodes.Object_18.geometry}
                  material={materials.Space_Grey}
                />
                <mesh
                  name="Object_19"
                  geometry={nodes.Object_19.geometry}
                  material={materials.Black_Plastic}
                />
                <mesh
                  name="Object_20"
                  geometry={nodes.Object_20.geometry}
                  material={materials.Black_Plastic}
                />
                <mesh
                  name="Object_21"
                  geometry={nodes.Object_21.geometry}
                  material={materials["Keys.001"]}
                />
              </group>
              <group
                name="Touch_Bar_Shot_7"
                position={[0, -0.014, 0]}
                scale={0.275}
              >
                <mesh
                  name="Object_27"
                  geometry={nodes.Object_27.geometry}
                  material={materials["Touch_Bar_Shot_2021-04-02_at_18.13.28"]}
                />
              </group>
              <group name="Touch_Bar_6" position={[0, -0.014, 0]} scale={0.275}>
                <mesh
                  name="Object_23"
                  geometry={nodes.Object_23.geometry}
                  material={materials.Black_Plastic}
                />
                <mesh
                  name="Object_24"
                  geometry={nodes.Object_24.geometry}
                  material={materials.Black_Glass}
                />
                <mesh
                  name="Object_25"
                  geometry={nodes.Object_25.geometry}
                  material={materials.Keys}
                />
              </group>
            </group>
          </group>
        </group>
      </group>
    </group>
  );
}

useGLTF.preload("/model/macbook.gltf");
