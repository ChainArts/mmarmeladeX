import { FC } from "react";
import { appWindow } from "@tauri-apps/api/window";

import styles from "./StartScreen.module.css";

import icon from "/assets/icon.png";

interface StartScreenProps {
  setStart: (start: boolean) => void;
}

const StartScreen: FC<StartScreenProps> = ({ setStart }) => {
  return (
    <div className={styles.container}>
      <img className={styles.icon} src={icon} alt="" />
      <h1 className={styles.heading}>Turtle.js</h1>
      <div className={styles["button-container"]}>
        <button className={styles.button} onClick={() => setStart(true)}>
          Start Game
        </button>
        <button className={styles.button} onClick={() => appWindow.close()}>
          Exit Game
        </button>
      </div>
    </div>
  );
};

export default StartScreen;
