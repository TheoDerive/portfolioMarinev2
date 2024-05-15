import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Html, useGLTF } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useEffect } from "react";
import * as THREE from "three";
import { useStore } from "@/hooks/useStore";

export default function Experience({ setLoading, loading }) {
  const laptop = useGLTF(
    "https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/macbook/model.gltf",
  );

  const { camera } = useThree();

  const { setIsCinematic } = useStore();

  useEffect(() => {
    camera.position.x = -3;
    document.querySelector(".cursor").style.display = "none";

    if (!loading) {
      setTimeout(() => {
        setIsCinematic(false);
        window.sessionStorage.setItem("cinematicPass", true);
      }, 6500);
    }
  }, [loading]);

  useGSAP(() => {
    if (!loading) {
      gsap.to(camera.position, {
        x: 0,
        y: 1.5,
        z: 4,
        duration: 2,
      });
    }
  }, [loading]);

  return (
    <>
      <primitive object={laptop.scene} position-y={-1.5} />

      <Html
        transform
        position={[0.01, 0.02, -1.5]}
        rotation-x={-0.25}
        distanceFactor={1.16}
      >
        <iframe
          src="/login"
          loading="lazy"
          onLoad={() => setLoading(false)}
        ></iframe>
      </Html>
    </>
  );
}
