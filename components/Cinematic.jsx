"use client";

import Loading from "@/app/loading";
import { Environment } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import React from "react";
import Experience from "./Experience";

export default function Cinematic() {
  const [loading, setLoading] = React.useState(true);

  return (
    <>
      {loading ? <Loading /> : null}
      <Canvas camera={{ position: [0, 1.5, 4], fov: 45, near: 0.1, far: 2000 }}>
        <Environment preset="warehouse" />
        <ambientLight intensity={1.5} />
        <Experience setLoading={setLoading} loading={loading} />
      </Canvas>
    </>
  );
}
