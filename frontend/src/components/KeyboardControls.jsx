// import { useEffect, useState } from 'react';
// import { useFrame, useThree } from '@react-three/fiber';

// const KeyboardControls = () => {
//   const { camera } = useThree();
//   const [keys, setKeys] = useState({});

//   useEffect(() => {
//     const handleKeyDown = (event) => {
//       setKeys((prev) => ({ ...prev, [event.key]: true }));
//     };

//     const handleKeyUp = (event) => {
//       setKeys((prev) => ({ ...prev, [event.key]: false }));
//     };

//     window.addEventListener('keydown', handleKeyDown);
//     window.addEventListener('keyup', handleKeyUp);

//     return () => {
//       window.removeEventListener('keydown', handleKeyDown);
//       window.removeEventListener('keyup', handleKeyUp);
//     };
//   }, []);

//   useFrame(() => {
//     // Handle WASD keys
//     if (keys['w']) camera.position.z -= 1; // Move forward
//     if (keys['s']) camera.position.z += 1; // Move backward
//     if (keys['a']) camera.position.x -= 1; // Move left
//     if (keys['d']) camera.position.x += 1; // Move right

//     // Handle Arrow keys
//     if (keys['ArrowUp']) camera.position.z -= 1; // Move forward
//     if (keys['ArrowDown']) camera.position.z += 1; // Move backward
//     if (keys['ArrowLeft']) camera.position.x -= 1; // Move left
//     if (keys['ArrowRight']) camera.position.x += 1; // Move right
//   });

//   return null;
// };

// export default KeyboardControls;
import { useEffect, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';

const KeyboardControls = () => {
  const { camera } = useThree();
  const [keys, setKeys] = useState({});

  useEffect(() => {
    const handleKeyDown = (event) => {
      setKeys((prev) => ({ ...prev, [event.key]: true }));
    };

    const handleKeyUp = (event) => {
      setKeys((prev) => ({ ...prev, [event.key]: false }));
    }; 

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  useFrame(() => {
    const speed = 1; // Adjust speed as needed

    // Handle WASD keys for movement
    if (keys['w']) camera.position.z -= speed; // Move forward
    if (keys['s']) camera.position.z += speed; // Move backward
    if (keys['a']) camera.position.x -= speed; // Move left
    if (keys['d']) camera.position.x += speed; // Move right

    // Handle Arrow keys for vertical movement
    if (keys['ArrowUp']) camera.position.y += speed; // Move up
    if (keys['ArrowDown']) camera.position.y -= speed; // Move down
    if (keys['ArrowLeft']) camera.position.x -= speed; // Move left
    if (keys['ArrowRight']) camera.position.x += speed; // Move right
  });

  return null;
};

export default KeyboardControls;