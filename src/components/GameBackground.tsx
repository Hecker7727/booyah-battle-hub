
import { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { PerspectiveCamera, OrbitControls, Text3D, Float } from '@react-three/drei';
import * as THREE from 'three';

function Gun(props: any) {
  const mesh = useRef<THREE.Mesh>(null!);
  
  useFrame((state) => {
    if (mesh.current) {
      // Add subtle gun movement to simulate breathing or holding
      mesh.current.position.y = Math.sin(state.clock.getElapsedTime()) * 0.01;
      mesh.current.rotation.z = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.02;
    }
  });

  return (
    <mesh
      {...props}
      ref={mesh}
      position={[0.5, -0.3, -0.5]}
      rotation={[0, -Math.PI / 4, 0]}
      scale={0.15}
    >
      <boxGeometry args={[1, 0.2, 2]} />
      <meshStandardMaterial color="#333" metalness={0.8} roughness={0.2} />
      <mesh position={[0, 0, -0.9]} scale={[0.2, 0.15, 1]}>
        <boxGeometry />
        <meshStandardMaterial color="#222" metalness={0.9} roughness={0.1} />
      </mesh>
    </mesh>
  );
}

function Target({ position = [0, 0, 0] }: { position?: [number, number, number] }) {
  const mesh = useRef<THREE.Mesh>(null!);
  const [hovered, setHover] = useState(false);
  const [active, setActive] = useState(false);

  useFrame(() => {
    if (mesh.current) {
      mesh.current.rotation.x = mesh.current.rotation.y += 0.01;
    }
  });

  return (
    <mesh
      position={position}
      ref={mesh}
      scale={active ? 1.1 : 1}
      onClick={() => setActive(!active)}
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
    >
      <torusGeometry args={[0.3, 0.1, 8, 24]} />
      <meshStandardMaterial color={hovered ? '#ea384c' : '#9b87f5'} emissive={hovered ? '#ea384c' : '#9b87f5'} emissiveIntensity={0.5} />
    </mesh>
  );
}

function FloatingLogo() {
  return (
    <Float
      speed={2} // Animation speed
      rotationIntensity={0.5} // Rotation intensity
      floatIntensity={0.5} // Float intensity
      position={[0, 1, -2]}
    >
      <Text3D
        font="/fonts/Inter_Bold.json"
        size={0.5}
        height={0.1}
        curveSegments={12}
      >
        BOOYAH
        <meshStandardMaterial color="#ea384c" emissive="#ea384c" emissiveIntensity={0.5} />
      </Text3D>
    </Float>
  );
}

function Crosshair() {
  return (
    <group position={[0, 0, -1]}>
      <mesh position={[0, 0, 0]}>
        <ringGeometry args={[0.02, 0.03, 32]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.8} />
      </mesh>
      <mesh position={[0, 0, 0]}>
        <ringGeometry args={[0.001, 0.005, 32]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>
    </group>
  );
}

function BackgroundScene() {
  return (
    <>
      <ambientLight intensity={0.3} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <fog attach="fog" args={['#1A1F2C', 5, 15]} />
      
      <Gun />
      <Crosshair />
      
      <Target position={[-2, 0, -5]} />
      <Target position={[2, 1, -7]} />
      <Target position={[0, -1, -6]} />
      
      <FloatingLogo />
      
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]}>
        <planeGeometry args={[50, 50]} />
        <meshStandardMaterial color="#1A1F2C" roughness={1} metalness={0} />
      </mesh>
      
      <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />
      <PerspectiveCamera makeDefault position={[0, 0, 0]} fov={75} />
    </>
  );
}

export const GameBackground: React.FC = () => {
  return (
    <div className="game-background fixed inset-0 -z-10">
      <Canvas shadows>
        <BackgroundScene />
      </Canvas>
    </div>
  );
};
