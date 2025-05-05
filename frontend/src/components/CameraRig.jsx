import { useFrame, useThree } from '@react-three/fiber';
import { useRef } from 'react';
import * as THREE from 'three';

const CameraRig = () => {
  const { camera } = useThree();
  const target = useRef(new THREE.Vector3());

  useFrame(() => {
    camera.lookAt(target.current);
  });

  return null;
};

export default CameraRig;