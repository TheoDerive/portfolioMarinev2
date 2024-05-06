import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, OrbitControls } from "@react-three/drei";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import { PostProcessing } from "./PostProcessing";
import { Experience } from "./Experience";
import { Light } from "./Light";

export default function Cinematic() {
  return (
    <Canvas camera={{ position: [0, 0, 10] }}>
      <color attach="background" args={["#000"]} />
      <Light />
      <ambientLight intensity={0.05} color={"hsl(25, 100%, 64%)"} />
      <Environment preset="night" />
      <Experience rotate={true} position={[0, 0.05, 0]} />
      {Array.from({ length: 10 }).map((_, i) => (
        <>
          <Experience key={i} position={[i * 5 + -20, 0, -2]} />
          <Experience key={i + 10} position={[i * 5 + -20, 0, -7]} />
          <Experience key={i + 20} position={[i * 5 + -20, 0, -12]} />
        </>
      ))}
      <OrbitControls />
      <PostProcessing />
    </Canvas>
  );
}
