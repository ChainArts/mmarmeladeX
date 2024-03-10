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

        const player = Player(k);
        const updateStatusText = () => {
            lifeTextRef.current.text = `Life: ${player.life}, Invincible: ${player.isInvincible}`;
        };

        const Stage = createStage(k);

        // Collisions ----------------------------------------------------------------

        player.onCollide("powerup", (p) => {
            
            k.play("eat")

            if (p.is("seaweed")) {
                player.life += 10;
                if (player.life > 100) {
                    player.life = 100;
                }
            }

            if (p.is("shell")) {
                player.isInvincible = true;
                player.children[0].opacity = 1;
                setTimeout(() => {
                    player.isInvincible = false;
                    player.children[0].opacity = 0;
                }, 5000);
            }

            if (p.is("jam")) {
                player.speed = 500;
                setTimeout(() => {
                    player.speed = 300;
                }, 1000);
            }

            p.destroy();
        });

        player.onCollide("enemy", (e) => {


            if (player.isInvincible === false) {
                if (e.is("oil")) {
                    k.addKaboom(player.pos);
                    k.shake(10);
                    player.life -= 10;
                }

                if (e.is("toxic")) {
                    k.addKaboom(player.pos);
                    k.shake(20);
                    player.life -= 20;
                }
                if (e.is("tire")) {
                    k.shake(5);  
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
                createTire(k);
            });
        });

        k.loop(5, () => {
            k.wait(k.rand(2, 8), () => {
                createShell(k);
            });
        });

        k.loop(5, () => {
            k.wait(k.rand(2, 8), () => {
                createSeaweed(k);
            });
        });

        k.loop(5, () => {
            k.wait(k.rand(2, 8), () => {
                createJam(k);
            });
        });

        lifeTextRef.current = k.add([
            k.text(`life: ${player.life}, Incincible: ${player.isInvincible}`),
            k.pos(12, 12),
            k.fixed()
        ]);

        k.onUpdate(() => {
            updateStatusText();
        });
    }, []);
    return <canvas ref={canvasRef} />;
};
