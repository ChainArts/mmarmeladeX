import { FC } from "react";
import Ecctrl from "ecctrl";
import { KeyboardControls } from "@react-three/drei";

const Player: FC = () => {
  const keyboardMap = [
    { name: "forward", keys: ["ArrowUp", "KeyW"] },
    { name: "backward", keys: ["ArrowDown", "KeyS"] },
    { name: "leftward", keys: ["ArrowLeft", "KeyA"] },
    { name: "rightward", keys: ["ArrowRight", "KeyD"] },
    { name: "jump", keys: ["Space"] },
    { name: "run", keys: ["Shift"] },
  ];

  return (
    <KeyboardControls map={keyboardMap}>
      <Ecctrl>
        <group>
          <mesh>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial />
          </mesh>
        </group>
      </Ecctrl>
    </KeyboardControls>
  );
};

export default Player;
