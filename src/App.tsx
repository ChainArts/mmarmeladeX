import { Canvas } from "@react-three/fiber";
import { CuboidCollider, Physics } from "@react-three/rapier";
import Player from "./components/Player";

function App() {
  return (
    <>
      <Canvas>
        <Physics debug>
          <Player />
          <CuboidCollider position={[0, -2, 0]} args={[20, 0.5, 20]} />
        </Physics>
      </Canvas>
    </>
  );
}

export default App;
