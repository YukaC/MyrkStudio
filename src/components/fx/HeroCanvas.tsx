import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef, type MutableRefObject } from "react";
import * as THREE from "three";
import { fragment, vertex } from "./fog.glsl";

function Fog({ scroll }: { scroll: MutableRefObject<number> }) {
  const mat = useRef<THREE.ShaderMaterial>(null!);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uRes: { value: new THREE.Vector2(1, 1) },
      uScroll: { value: 0 },
    }),
    [],
  );

  useFrame(({ clock, size }) => {
    const u = mat.current.uniforms;
    u.uTime.value = clock.elapsedTime;
    u.uRes.value.set(size.width, size.height);
    u.uScroll.value = scroll.current;
  });

  return (
    <mesh frustumCulled={false}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        ref={mat}
        vertexShader={vertex}
        fragmentShader={fragment}
        uniforms={uniforms}
        depthTest={false}
        depthWrite={false}
      />
    </mesh>
  );
}

type HeroCanvasProps = {
  scroll: MutableRefObject<number>;
  frameloop?: "always" | "never" | "demand";
};

export default function HeroCanvas({ scroll, frameloop = "always" }: HeroCanvasProps) {
  return (
    <Canvas
      dpr={[1, typeof window !== "undefined" && window.innerWidth < 768 ? 1 : 1.5]}
      gl={{ antialias: false, powerPreference: "high-performance" }}
      frameloop={frameloop}
      style={{ position: "absolute", inset: 0 }}
    >
      <Fog scroll={scroll} />
    </Canvas>
  );
}
