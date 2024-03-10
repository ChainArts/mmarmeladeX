import { useEffect, useRef } from "react";
import kaboom from "kaboom";
import { Player } from "./game-components/Player";
import { createOilContainer } from "./game-components/OilContainer";
import { createToxicContainer } from "./game-components/ToxicContainer";
import { createShell } from "./game-components/Shell";
import { createTire } from "./game-components/Tire";
import { createSeaweed } from "./game-components/Seaweed";
import { createJam } from "./game-components/Jam";
import { createStage } from "./game-components/Stage";

export const Game: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const lifeTextRef = useRef<any>(null);

  useEffect(() => {
    const k = kaboom({
      global: false,
      canvas: canvasRef.current!,
    });

    k.setBackground(66, 190, 240, 1);
    k.volume(0.5);

    k.loadSprite("oil", "/assets/oil.png");
    k.loadSprite("toxic", "/assets/toxic.png");
    k.loadSprite("seaweed", "/assets/seaweed.png");
    k.loadSprite("shell", "/assets/shells.png");
    k.loadSprite("tire", "/assets/wheel.png");
    k.loadSprite("jam", "/assets/jam.png");
    k.loadSprite("boat", "/assets/boat.png");
    k.loadSprite("border", "/assets/border.png");
    k.loadSprite("border-bottom", "/assets/border-bottom.png");
    k.loadSprite("turtle2", "/assets/turtle2.png");
    k.loadSprite("bubble", "/assets/bubble.png");
    k.loadSound("eat", "/assets/eat.mp3");

      k.scene("game", () => {
          const player1 = Player(k, "turtle", "w", "a", "s", "d");
          const player2 = Player(k, "turtle2", "up", "left", "down", "right");

          const updateStatusText = () => {
              lifeTextRef.current.text = `Life: ${Math.ceil(
                  player1.life
              )}, Score: ${player1.score}`;
          };

          const Stage = createStage(k);

          // Collisions ----------------------------------------------------------------

          // Create oil containers at random intervals ----------------------------------
          k.loop(5, () => {
              k.wait(k.rand(2, 8), () => {
                  createOilContainer(k);
              });
          });

          k.loop(10, () => {
              k.wait(k.rand(5, 10), () => {
                  createToxicContainer(k);
              });
          });

          k.loop(5, () => {
              k.wait(k.rand(2, 8), () => {
                  createTire(k);
              });
          });

          k.loop(10, () => {
              k.wait(k.rand(10, 20), () => {
                  createShell(k);
              });
          });

          k.loop(8, () => {
              k.wait(k.rand(0, 5), () => {
                  createSeaweed(k);
              });
          });

          k.loop(15, () => {
              k.wait(k.rand(10, 20), () => {
                  createJam(k);
              });
          });

          lifeTextRef.current = k.add([
              k.text(
                  `life: ${Math.round(player1.life)}, score: ${player1.score}`
              ),
              k.pos(12, 12),
              k.fixed(),
          ]);

          let multiplier = 0.01;

          k.onUpdate(() => {
              updateStatusText();

              player1.life -= k.dt() * 2 * multiplier;
              player2.life -= k.dt() * 2 * multiplier;
              if (multiplier < 1) {
                  multiplier += 0.0005;
              }

                if (player1.life <= 0 || player2.life <= 0) {
                    k.go("game-over", player1.score, player2.score);
                }
          });
      });
      k.scene("game-over", (score1: Number, score2 : Number) => {
          k.add([
              k.text("Game Over"),
              k.pos(k.width() / 2, k.height() / 2 - 80),
              k.anchor("center"),
          ]);
          k.add([
              k.text(`Winner: ${score1 > score2 ? 'Player 1' : 'Player 2'}`),
              k.pos(k.width() / 2, k.height() / 2 - 40),
              k.anchor("center"),
            ]);
          k.add([
              k.text(`Player 1: ${score1}`),
              k.pos(k.width() / 2, k.height() / 2),
              k.anchor("center"),
          ]);
            k.add([
                k.text(`Player 2: ${score2}`),
                k.pos(k.width() / 2, k.height() / 2 + 40),
                k.anchor("center"),
            ]);
          k.add([
              k.text("Press space to restart"),
              k.pos(k.width() / 2, k.height() / 2 + 80),
              k.anchor("center"),
          ]);
          k.onKeyPress("space", () => {
              k.go("game");
          });
          k.onClick(() => {
              window.location.reload();
          });
              
            
      });
      k.go("game");
    }, []);
    return <canvas ref={canvasRef} />;
};
