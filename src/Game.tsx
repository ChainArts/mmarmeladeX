import { useEffect, useRef } from "react";
import kaboom from "kaboom";
import { Player } from "./game-components/Player";
import { createOilContainer } from "./game-components/OilContainer";
import { createToxicContainer } from "./game-components/ToxicContainer";
import { createShell } from "./game-components/Shell";

export const Game: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const lifeTextRef = useRef<any>(null);



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
            lifeTextRef.current.text = `life: ${player.life}, Invincible: ${player.isInvincible}`;
        };

        // Collisions ----------------------------------------------------------------

        player.onCollide("powerup", (p) => {

            player.life += 10;
            if (player.life > 100) {
                player.life = 100;
            }
        
            if (p.is("shell")) {
                player.isInvincible = true;
                setTimeout(() => {
                    player.isInvincible = false;
                }, 5000);
            }

            p.destroy();
        });

        player.onCollide("enemy", (e) => {
            

            if (player.isInvincible === false) {
                if (e.is("oil")) {
                    k.shake(10);
                    player.life -= 10;
                }

                if (e.is("toxic")) {
                    k.shake(20);
                    player.life -= 20;
                }
            }
            e.destroy();        
        });
        


        // Create oil containers at random intervals ----------------------------------
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

        lifeTextRef.current = k.add([
            k.text(`life: ${player.life}, Incincible: ${player.isInvincible}`),
            k.pos(12, 12),
            k.fixed()
        ])

        k.onUpdate(() => {
            updateStatusText();
        });

    }, []);
    return <canvas ref={canvasRef} />;
};
