import { FC } from "react";

import styles from "./StartScreen.module.css";

interface StartScreenProps {
  setStart: (start: boolean) => void;
}

const StartScreen: FC<StartScreenProps> = ({ setStart }) => {
  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Turtle.js</h1>
      <button className={styles.button} onClick={() => setStart(true)}>
        Start Game
      </button>
    </div>
  );
};

export default StartScreen;
