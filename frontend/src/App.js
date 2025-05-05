import { Canvas, useFrame, useThree } from '@react-three/fiber';
import React, { Suspense, useRef, useState, useEffect } from 'react';
import { OrbitControls, useProgress } from '@react-three/drei';
import ExteriorScene from './components/ExteriorScene';
import InteriorScene from './components/InteriorScene';
import CameraRig from './components/CameraRig';
import KeyboardControls from './components/KeyboardControls';
import AdminPanel from './AdminPanel';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HexColorPicker } from "react-colorful"; // Install this package using `npm install react-colorful`

function Loader() {
  const { active, progress } = useProgress();
  return active ? (
    <div className="absolute inset-0 flex items-center justify-center bg-white z-50">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
        <p className="mt-2 text-xl text-gray-700">Loading... {progress.toFixed(0)}%</p>
      </div>
    </div>
  ) : null;
}

const CameraUpdater = ({ moveCamera, resetCamera, view, setCameraPosition }) => {
  const { camera } = useThree();
  const lastPos = useRef({ x: 0, y: 0, z: 0 });

  useFrame(() => {
    const { x, y, z } = camera.position;
    const diff = Math.abs(lastPos.current.x - x) + Math.abs(lastPos.current.y - y) + Math.abs(lastPos.current.z - z);
    if (diff > 0.1) {
      setCameraPosition({ x, y, z });
      lastPos.current = { x, y, z };
    }
  });

  // moveCamera.current = (direction) => {
  //   const moveStep = view === 'interior' ? 0.5 : 4;
  //   const bounds = {
  //     minX: -20, maxX: 20,
  //     minY: 1, maxY: 10,
  //     minZ: -20, maxZ: 20,
  //   };

  //   let { x, y, z } = camera.position;

  //   switch (direction) {
  //     case 'forward': z -= moveStep; break;
  //     case 'backward': z += moveStep; break;
  //     case 'left': x -= moveStep; break;
  //     case 'right': x += moveStep; break;
  //     default: break;
  //   }

  //   if (view === 'interior') {
  //     if (
  //       x >= bounds.minX && x <= bounds.maxX &&
  //       y >= bounds.minY && y <= bounds.maxY &&
  //       z >= bounds.minZ && z <= bounds.maxZ
  //     ) {
  //       camera.position.set(x, y, z);
  //     }
  //   } else {
  //     camera.position.set(x, y, z);
  //   }

  //   camera.updateProjectionMatrix();
  //   console.log('Moved camera:', direction, { x, y, z });
  // };
  moveCamera.current = (direction) => {
    const moveStep = 4; // Adjust movement speed
    let { x, y, z } = camera.position;
  
    switch (direction) {
      case 'forward': // Move upward
        y += moveStep;
        break;
      case 'backward': // Move downward
        y -= moveStep;
        break;
      case 'left': // Move left
        x -= moveStep;
        break;
      case 'right': // Move right
        x += moveStep;
        break;
      default:
        break;
    }
  
    // Update camera position
    camera.position.set(x, y, z);
    camera.updateProjectionMatrix();
    console.log('Moved camera:', direction, { x, y, z });
  };
  useEffect(() => {
    if (view === 'interior') {
      resetCamera.current = () => {
        camera.position.set(-3.064622101908278, 17.59411020049189, -76.08168770565449);
        console.log('Reset camera to interior view', camera.position);
        camera.lookAt(0, 0, 0);
        camera.updateProjectionMatrix();
      };
    } else {
      resetCamera.current = () => {
        camera.position.set(-139.00307008907947, 489.982804278398, 2107.2645500930857);
        camera.lookAt(0, 0, 0);
        camera.updateProjectionMatrix();
      };
    }
  }, [view, camera, resetCamera]);

  return null;
};

function App() {
  const [view, setView] = useState('exterior');
  const [cameraPosition, setCameraPosition] = useState({
    x: -139.00307008907947,
    y: 489.982804278398,
    z: 2107.2645500930857,
  });
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [selectedObject, setSelectedObject] = useState('Object_2'); // Default object
  const [selectedColor, setSelectedColor] = useState('#ffffff'); // Default color

  const moveCamera = useRef(null);
  const resetCamera = useRef(null);
  const intervalRef = useRef(null);

  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().then(() => setIsFullScreen(true));
    } else {
      document.exitFullscreen().then(() => setIsFullScreen(false));
    }
  };

  const applyColor = () => {
    const object = window.scene.getObjectByName(selectedObject); // Access the object by name
    if (object) {
      object.material.color.set(selectedColor); // Change the object's color
    } else {
      console.warn(`Object with name ${selectedObject} not found.`);
    }
  };

  return (
    <div className="w-screen h-screen relative">
      <Router>
        <Routes>
          <Route path="/admin" element={<AdminPanel />} />
        </Routes>
      </Router>

      <Loader />

      <Canvas
        shadows
        camera={{
          position: [cameraPosition.x, cameraPosition.y, cameraPosition.z],
          fov: 50,
          near: 0.1,
          far: 5000,
        }}
        onCreated={({ scene }) => (window.scene = scene)} // Expose the scene globally for debugging
      >
        <CameraUpdater
          moveCamera={moveCamera}
          resetCamera={resetCamera}
          view={view}
          setCameraPosition={setCameraPosition}
        />

        {/* <Suspense fallback={null}>
          <ambientLight intensity={1} />
          <directionalLight position={[10, 10, 10]} intensity={1} />

          <OrbitControls
            enableZoom={true}
            enablePan={true}
            enableRotate={true}
          />

          <KeyboardControls />
          <CameraRig />

          {view === 'exterior' ? (
            <ExteriorScene onEnter={() => setView('interior')} />
          ) : (
            <InteriorScene />
          )}
        </Suspense> */}
        <Suspense fallback={null}>
  {/* Sunlight */}
  <directionalLight
    position={[50, 100, 50]} // Position of the sunlight
    intensity={1.5} // Brightness of the sunlight
    castShadow // Enable shadows
    shadow-mapSize-width={1024} // Shadow map resolution
    shadow-mapSize-height={1024}
    shadow-camera-far={500} // Shadow camera far clipping plane
    shadow-camera-left={-100} // Shadow camera bounds
    shadow-camera-right={100}
    shadow-camera-top={100}
    shadow-camera-bottom={-100}
  />
  <directionalLight position={[-50, -100, -50]} intensity={0.5} /> {/* Fill light */}

  <OrbitControls enableZoom={true} enablePan={true} enableRotate={true} />

  <KeyboardControls />
  <CameraRig />

  {view === 'exterior' ? (
    <ExteriorScene onEnter={() => setView('interior')} />
  ) : (
    <InteriorScene />
  )}
</Suspense>
      </Canvas>

      {/* Color Picker UI */}
      <div className="absolute top-4 left-4 bg-white p-4 rounded shadow-md">
        <h3 className="text-lg font-bold mb-2">Change Object Color</h3>
        <label className="block mb-2">
          Select Object:
          <select
            value={selectedObject}
            onChange={(e) => setSelectedObject(e.target.value)}
            className="block w-full mt-1 p-2 border rounded"
          >
            {['Object_2', 'Object_3', 'Object_4', 'Object_5', 'Object_6', 'Object_7', 'Object_8'].map((obj) => (
              <option key={obj} value={obj}>
                {obj}
              </option>
            ))}
          </select>
        </label>
        <label className="block mb-2">
          Pick Color:
          <HexColorPicker
            color={selectedColor}
            onChange={setSelectedColor}
            className="mt-2"
          />
        </label>
        <button
          onClick={applyColor}
          className="bg-blue-500 text-white px-4 py-2 rounded shadow-md mt-2"
        >
          Save
        </button>
      </div>

      <div className="absolute bottom-0 left-0 w-full p-2 flex items-center justify-between shadow-inner">
        <div>
          {view === 'exterior' ? (
            <button
              onClick={() => {
                setView('interior');
                setTimeout(() => resetCamera.current?.(), 0);
              }}
              className="bg-blue-500 text-white px-4 py-2 rounded shadow-md"
            >
              Go Inside
            </button>
          ) : (
            <button
              onClick={() => {
                setView('exterior');
                setTimeout(() => resetCamera.current?.(), 0);
              }}
              className="bg-green-500 text-white px-4 py-2 rounded shadow-md"
            >
              Go Outside
            </button>
          )}
        </div>

        <div className="relative w-32 h-32 rounded-full border-2 border-gray-400 flex items-center justify-center">
          {['forward', 'backward', 'left', 'right'].map((dir) => {
            const handleMouseDown = () => {
              if (moveCamera.current) {
                moveCamera.current(dir);
                intervalRef.current = setInterval(() => moveCamera.current(dir), 100);
              }
            };
            const handleMouseUp = () => {
              clearInterval(intervalRef.current);
              intervalRef.current = null;
            };
            const getPositionClass = (direction) => {
              switch (direction) {
                case 'forward': return 'top-2';
                case 'backward': return 'bottom-2';
                case 'left': return 'left-2';
                case 'right': return 'right-2';
                default: return '';
              }
            };
            const symbol = { forward: '↑', backward: '↓', left: '←', right: '→' };

            return (
              <button
                key={dir}
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
                className={`absolute ${getPositionClass(dir)} bg-blue-500 text-white w-8 h-8 rounded-full flex items-center justify-center shadow-md`}
              >
                {symbol[dir]}
              </button>
            );
          })}

          <button
            onClick={() => resetCamera.current && resetCamera.current()}
            className="absolute bg-gray-300 text-black w-10 h-10 rounded-full flex items-center justify-center shadow-md"
          >
            R
          </button>
        </div>

        <button
          onClick={toggleFullScreen}
          className="bg-blue-500 text-white px-4 py-2 rounded shadow-md"
        >
          {isFullScreen ? '] [' : '[ ]'}
        </button>
      </div>
    </div>
  );
}

export default App;