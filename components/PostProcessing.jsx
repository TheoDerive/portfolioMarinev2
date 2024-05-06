import {
  Bloom,
  DepthOfField,
  EffectComposer,
  Noise,
  SMAA,
} from "@react-three/postprocessing";

export const PostProcessing = () => {
  return (
    <EffectComposer>
      <Bloom luminanceThreshold={1} luminanceSmoothing={0.3} mipmapBlur />
      <SMAA />
    </EffectComposer>
  );
};
