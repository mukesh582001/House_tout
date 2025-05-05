// ModelCustomizer.jsx
import React, { useEffect, useRef, useState } from 'react';
import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';

const objectNames = Array.from({ length: 8 }, (_, i) => `Object_${i + 2}`);

const ModelCustomizer = () => {
  const gltf = useGLTF('/models/exterior.glb');
  const meshRefs = useRef({});
  const [selectedObject, setSelectedObject] = useState('Object_2');
  const [selectedColor, setSelectedColor] = useState('#ffffff');
  const [savedColors, setSavedColors] = useState({});

  // Apply saved colors on every frame (in case of changes)
  useFrame(() => {
    objectNames.forEach(name => {
      const mesh = meshRefs.current[name];
      if (mesh && savedColors[name]) {
        mesh.material.color.set(savedColors[name]);
      }
    });
  });

  // Build references to each object mesh
  useEffect(() => {
    objectNames.forEach(name => {
      const foundMesh = gltf.scene.getObjectByName(name);
      if (foundMesh) {
        meshRefs.current[name] = foundMesh;
      }
    });
  }, [gltf]);

  const handleSave = () => {
    if (selectedObject) {
      setSavedColors(prev => ({
        ...prev,
        [selectedObject]: selectedColor,
      }));
    }
  };

  return (
    <>
      <primitive object={gltf.scene} />

      <div className="absolute top-4 left-4 bg-white p-4 rounded-lg shadow-md z-50">
        <label className="block mb-2 font-medium">Select Object:</label>
        <select
          value={selectedObject}
          onChange={(e) => setSelectedObject(e.target.value)}
          className="mb-4 p-2 border rounded"
        >
          {objectNames.map(name => (
            <option key={name} value={name}>{name}</option>
          ))}
        </select>

        <label className="block mb-2 font-medium">Select Color:</label>
        <input
          type="color"
          value={selectedColor}
          onChange={(e) => setSelectedColor(e.target.value)}
          className="mb-4"
        />

        <button
          onClick={handleSave}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Save
        </button>
      </div>
    </>
  );
};

export default ModelCustomizer;
