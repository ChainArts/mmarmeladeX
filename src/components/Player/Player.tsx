import { FC, useEffect, useRef } from "react";

import styles from "./Player.module.css";

import Turtle from "../../assets/Turtle.png";

const Player: FC = () => {
  const playerRef = useRef<HTMLDivElement | null>(null);

  let direction = 2;

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      console.log("key");
      if (!playerRef.current) return;
      const key = event.code;

      if (key === "KeyW") {
        direction = 0;
      } else if (key === "KeyD") {
        direction = 1;
      } else if (key === "KeyS") {
        direction = 2;
      } else if (key === "KeyA") {
        direction = 3;
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  });

  const handleMovement = () => {
    setTimeout(() => {
      console.log("run");
      if (!playerRef.current) return;
      if (direction === 0) {
        playerRef.current.style.top = `${parseInt(playerRef.current?.style.top || "0") - 2}px`;
        playerRef.current.style.transform = "rotate(0deg)";
      }
      if (direction === 1) {
        playerRef.current.style.left = `${parseInt(playerRef.current?.style.left || "0") + 2}px`;
        playerRef.current.style.transform = "rotate(90deg)";
      }
      if (direction === 2) {
        playerRef.current.style.top = `${parseInt(playerRef.current?.style.top || "0") + 2}px`;
        playerRef.current.style.transform = "rotate(180deg)";
      }
      if (direction === 3) {
        playerRef.current.style.left = `${parseInt(playerRef.current?.style.left || "0") - 2}px`;
        playerRef.current.style.transform = "rotate(270deg)";
      }

      // console.log(playerRef.current.getBoundingClientRect().x, playerRef.current.getBoundingClientRect().y);

      handleMovement();
    }, 25);
  };

  handleMovement();

  return (
    <div className={styles.container} ref={playerRef}>
      <img className={styles.image} src={Turtle} draggable={false} />
    </div>
  );
};

export default Player;
