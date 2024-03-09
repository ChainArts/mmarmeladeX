import { useEffect, useRef } from "react";
import kaboom from "kaboom";
import { Player } from "./game-components/Player";
import { createOilContainer } from "./game-components/OilContainer";
import { createToxicContainer } from "./game-components/ToxicContainer";
import { createShell } from "./game-components/Shell";

export const Game: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const healthTextRef = useRef<any>(null);



    useEffect(() => {
        const k = kaboom({
            global: false,
            canvas: canvasRef.current!,
        });

        k.setBackground(103, 211, 250, 1);

        const player = Player(k);
        k.loadSprite("oil", "/assets/oil.png");
        k.loadSprite("toxic", "/assets/toxic.png");
        k.loadSprite("seaweed", "/assets/seaweed.png");
        k.loadSprite("shell", "/assets/shells.png");
        k.loadSprite("wheel", "/assets/wheel.png");
        k.loadSprite("jam", "/assets/jam.png");
        k.loadSprite("turtle2", "/assets/turtle2.png");

        const updateStatusText = () => {
            healthTextRef.current.text = `Health: ${player.health}, Invincible: ${player.isInvincible}`;
        };

        player.onCollide("powerup", (p) => {
            p.destroy();
            player.health += 10;
            if (player.health > 100) {
                player.health = 100;
            }
        

            if (p.is("shell")) {
                player.isInvincible = true;
                k.wait(5, () => {
                    player.isInvincible = false;
                    updateStatusText();
                })
            }

            updateStatusText();
        
        });

        player.onCollide("enemy", (e) => {
            e.destroy();

            if (player.isInvincible === false) {
                if (e.is("oil")) {
                    k.shake(10);
                    player.health -= 10;
                }
                else if (e.is("toxic")) {
                    k.shake(20);
                    player.health -= 20;
                }
            }
            
            updateStatusText();
        });
        


        // Create oil containers at random intervals
        k.loop(5, () => {
            k.wait(k.rand(2, 8), () => {
                createOilContainer(k);
            });
        });

        k.loop(5, () => {
            k.wait(k.rand(2, 8), () => {
                createToxicContainer(k);
            });
        });

         k.loop(5, () => {
            k.wait(k.rand(2, 8), () => {
                createShell(k);
            });
        });

        healthTextRef.current = k.add([
            k.text(`Health: ${player.health}, Incincible: ${player.isInvincible}`),
            k.pos(12, 12),
            k.fixed()
        ])

    }, []);
    return <canvas ref={canvasRef} />;
};
