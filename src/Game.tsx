import { useEffect, useRef } from "react";
import kaboom from "kaboom";
import { Player } from "./game-components/Player";
import { createOilContainer } from "./game-components/OilContainer";
import { createToxicContainer } from "./game-components/ToxicContainer";

export const Game: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const heathTextRef = useRef<any>(null);
    let health = 100;
    useEffect(() => {
        const k = kaboom({
            global: false,
            canvas: canvasRef.current!,
        });

        const player = Player(k);
        k.loadSprite("oil", "/assets/oil.png");
        k.loadSprite("toxic", "/assets/toxic.png");
        k.loadSprite("seaweed", "/assets/seaweed.png");
        k.loadSprite("shells", "/assets/shells.png");
        k.loadSprite("wheel", "/assets/wheel.png");
        k.loadSprite("jam", "/assets/jam.png");
        k.loadSprite("turtle2", "/assets/turtle2.png");


        player.onCollide("enemy", (e) => {
            e.destroy();
            if (e.is("oil")) {
                {
                    k.shake(10);
                    health -= 10;
                }   
            }
            else if (e.is("toxic")) {
                {
                    k.shake(20);
                    health -= 20;
                }
            }
            heathTextRef.current.text = `Health: ${health}`;
        });
        k.setBackground(103, 211, 250, 1);

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

        heathTextRef.current = k.add([
            k.text(`Health: ${health}`),
            k.pos(12, 12),
            k.fixed()
        ])

    }, []);
    return <canvas ref={canvasRef} />;
};
