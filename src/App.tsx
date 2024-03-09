import { Canvas } from "@react-three/fiber";
import { CuboidCollider, Physics } from "@react-three/rapier";
import Player from "./components/Player/Player";

function App() {
  return (
    <div>
      <Player />
    </div>
  );
}

export default App;
