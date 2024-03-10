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
            lifeTextRef.current.text = `Life: ${player.life}, Score: ${player.score}`;
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
            k.text(`life: ${player.life}, score: ${player.score}`),
            k.pos(12, 12),
            k.fixed()
        ]);

        k.onUpdate(() => {
            updateStatusText();
        });
    }, []);
    return <canvas ref={canvasRef} />;
};
