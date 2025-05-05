
import { useGLTF, useTexture } from '@react-three/drei';
import { useThree, useFrame } from '@react-three/fiber';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const ExteriorScene = ({ onEnter }) => {
  const { scene } = useGLTF('/models/exterior.glb');
  const { camera, controls, scene: mainScene } = useThree();

  const bboxRef = useRef(new THREE.Box3());
  const lastValidPos = useRef(new THREE.Vector3());

  const grassY = 0.5; // Minimum Y height to prevent camera going below grass

  // Load grass texture
  const grassTexture = useTexture('/textures/grass.jpg');
  
  useEffect(() => {
    grassTexture.wrapS = grassTexture.wrapT = THREE.RepeatWrapping;
    grassTexture.repeat.set(50, 50);
  }, [grassTexture]);

  useEffect(() => {
    // Set sky background
    mainScene.background = new THREE.Color('#87CEEB');

    // Position model above ground
    const bbox = new THREE.Box3().setFromObject(scene);
    const minY = bbox.min.y;
    scene.position.y -= 3;

    // Save bounding box and camera starting position
    bboxRef.current.setFromObject(scene);
    lastValidPos.current.copy(camera.position);
  }, [scene, camera, mainScene]);

  useFrame(() => {
    const bbox = bboxRef.current;

    // Prevent camera from going inside house
    const inHouse = bbox.containsPoint(camera.position);
    const belowGround = camera.position.y < grassY;

    if (!inHouse && !belowGround) {
      lastValidPos.current.copy(camera.position);
    } else {
      camera.position.copy(lastValidPos.current);
    }

    // Optionally restrict controls target
    if (controls?.target && bbox.containsPoint(controls.target)) {
      controls.target.copy(bbox.getCenter(new THREE.Vector3()));
    }

    // Clamp camera Y above ground
    if (camera.position.y < grassY) {
      camera.position.y = grassY;
    }
  });

  return (
    <>
      {/* Sky Dome */}
      <mesh>
        <sphereGeometry args={[5000, 32, 32]} />
        <meshBasicMaterial color="#87CEEB" side={THREE.BackSide} />
      </mesh>

      {/* Grass Ground */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[10000, 10000]} />
        <meshStandardMaterial map={grassTexture} side={THREE.DoubleSide} />
      </mesh>

      {/* Model */}
      <primitive object={scene} scale={[1, 1, 1]} />

      {/* Door trigger */}
      <mesh position={[0, 1, 0]} onClick={onEnter}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="orange" />
      </mesh>
    </>
  );
};

export default ExteriorScene;
