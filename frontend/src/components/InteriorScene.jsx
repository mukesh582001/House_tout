import { useGLTF } from '@react-three/drei';
import { useEffect } from 'react';

const InteriorScene = () => {
  const { scene } = useGLTF('/models/interior.glb');

  useEffect(() => {
    // Recursively hide nodes named "Wall", "Roof", etc.
    scene.traverse((child) => {
      const name = child.name.toLowerCase();
      if (name.includes('wall') || name.includes('roof')) {
        child.visible = false;
      }
    });
  }, [scene]);

  return <primitive object={scene} scale={[10, 10, 10]} />;
};

export default InteriorScene;

// import React from 'react';
// import { useGLTF } from '@react-three/drei';
// import { PointerLockControls } from '@react-three/drei';
// import KeyboardControls from './KeyboardControls';

// const InteriorScene = () => {
//   const { scene } = useGLTF('/models/interior.glb');

//   return (
//     <>
//       <PointerLockControls />
//       <ambientLight intensity={0.5} />
//       <directionalLight position={[10, 10, 10]} intensity={1} />
//       <primitive object={scene} scale={[0.01, 0.01, 0.01]} />
//       <KeyboardControls />
//     </>
//   );
// };

// export default InteriorScene;