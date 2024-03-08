import { Canvas } from "@react-three/fiber";
import { KeyboardControls } from "@react-three/drei";
import { Physics, RigidBody } from "@react-three/rapier";
import Ecctrl from "ecctrl";

function App() {
  const keyboardMap = [
    { name: "forward", keys: ["ArrowUp", "KeyW"] },
    { name: "backward", keys: ["ArrowDown", "KeyS"] },
    { name: "leftward", keys: ["ArrowLeft", "KeyA"] },
    { name: "rightward", keys: ["ArrowRight", "KeyD"] },
    { name: "jump", keys: ["Space"] },
    { name: "run", keys: ["Shift"] },
    // Optional animation key map
    { name: "action1", keys: ["1"] },
    { name: "action2", keys: ["2"] },
    { name: "action3", keys: ["3"] },
    { name: "action4", keys: ["KeyF"] },
  ];
  return (
    <>
      <Canvas>
        <Physics>
          <KeyboardControls map={keyboardMap}>
            <Ecctrl>
              <RigidBody>
                <mesh>
                  <boxGeometry args={[2, 2, 2]} />
                  <meshStandardMaterial />
                  <ambientLight intensity={0.1} />
                  <directionalLight color="red" position={[0, 0, 5]} />
                </mesh>
              </RigidBody>
            </Ecctrl>
            <RigidBody type="fixed" rotation={[-Math.PI / 2, 0, 0]}>
              <mesh>
                <planeGeometry args={[10, 10]} />
                <meshStandardMaterial />
                <ambientLight intensity={0.1} />
                <directionalLight color="white" position={[0, 0, 5]} />
              </mesh>
            </RigidBody>
          </KeyboardControls>
        </Physics>
      </Canvas>
    </>
  );
}

export default App;
