import { useEffect, useRef } from "react";
import kaboom from "kaboom";
import { Player } from "./game-components/Player";
import { createOilContainer } from "./game-components/OilContainer";

export const Game: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const k = kaboom({
            global: false,
            canvas: canvasRef.current!,
        });

        const player = Player(k);
        k.loadSprite("oil", "/assets/oil.png");
        k.loadSprite("seaweed", "/assets/seaweed.png");
        k.loadSprite("shells", "/assets/shells.png");
        k.loadSprite("wheel", "/assets/wheel.png");
        k.loadSprite("jam", "/assets/jam.png");
        k.loadSprite("turtle2", "/assets/turtle2.png");


        player.onCollide("oil", (o) => {
            o.destroy();
            player.hurt(10);
            k.shake(10);
        });
        k.setBackground(103, 211, 250, 1);

        // Create oil containers at random intervals
        k.loop(5, () => {
            k.wait(k.rand(2, 8), () => {
                createOilContainer(k);
            });
        });
    }, []);
    return <canvas ref={canvasRef} />;
};
