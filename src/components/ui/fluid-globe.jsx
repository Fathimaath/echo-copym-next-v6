"use client";
import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Sphere, Torus } from "@react-three/drei";
import * as THREE from "three";

function RotatingSphere() {
  const sphereRef = useRef();
  const ringsRef = useRef([]);

  useFrame(() => {
    if (sphereRef.current) sphereRef.current.rotation.y += 0.01;
    ringsRef.current.forEach((ring, i) => {
      ring.rotation.x += 0.003 + i * 0.001;
      ring.rotation.y += 0.005 + i * 0.002;
    });
  });

  return (
    <>
      <Sphere ref={sphereRef} args={[1, 128, 128]}>
        <meshPhysicalMaterial
          color={new THREE.Color(0x9d4edd)}
          emissive={new THREE.Color(0x9d4edd)}
          emissiveIntensity={0.6}
          metalness={0.9}
          roughness={0.1}
          clearcoat={1}
          clearcoatRoughness={0.1}
        />
      </Sphere>

      {[0, 1, 2].map((i) => (
        <Torus
          key={i}
          ref={(el) => (ringsRef.current[i] = el)}
          args={[1.3 + i * 0.2, 0.03, 16, 100]}
          rotation={[Math.random() * Math.PI, Math.random() * Math.PI, 0]}
        >
          <meshPhysicalMaterial
            color={new THREE.Color(0xbb86fc)}
            emissive={new THREE.Color(0xbb86fc)}
            emissiveIntensity={0.4}
            transparent
            opacity={0.4}
            metalness={1}
            roughness={0.3}
          />
        </Torus>
      ))}
    </>
  );
}

export default function FluidGlobe({ height = 400, className = "" }) {
  return (
    <div
      className={`relative w-full rounded-3xl overflow-hidden ${className}`}
      style={{
        height,
        background: "radial-gradient(circle at center, #2b005a, #0d0018)",
      }}
    >
      <Canvas camera={{ position: [0, 0, 3], fov: 75 }}>
        <ambientLight intensity={0.4} />
        <pointLight position={[2, 3, 4]} intensity={2} color={0x9d4edd} />
        <pointLight position={[-3, -2, -4]} intensity={0.8} color={0x6a00f4} />

        <RotatingSphere />

        <OrbitControls enableDamping enableZoom={false} />
      </Canvas>
    </div>
  );
}
