import { useEffect, useRef } from "react";
import kaboom, { KaboomCtx } from "kaboom";
import { Player } from "./game-components/Player";

function createOilContainer(k: KaboomCtx) {
    // Define safezone dimensions
    const safezoneWidth = 100;
    const safezoneHeight = 100;

    // Generate a random position while considering the safezone
    let x, y;
    do {
        x = k.rand(safezoneWidth, k.width() - safezoneWidth);
        y = k.rand(safezoneHeight, k.height() - safezoneHeight);
    } while (
        // Check if the oil container's position is within the safezone
        x >= k.width() / 2 - safezoneWidth / 2 &&
        x <= k.width() / 2 + safezoneWidth / 2 &&
        y >= k.height() / 2 - safezoneHeight / 2 &&
        y <= k.height() / 2 + safezoneHeight / 2
    );

    const oilContainer = k.add([
        k.sprite("oil"),
        "oil",
        k.area(),
        k.anchor("center"),
        k.pos(x, y), // Random position
        k.scale(0.1),
        k.lifespan(10), // Destroy after 10 seconds
    ]);
}

export const Game: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const k = kaboom({
            global: false,
            canvas: canvasRef.current!,
        });
        k.loadSprite("turtle", "/assets/turtle.png");
        k.loadSprite("oil", "/assets/oil.png");

        const player = Player(k);

        player.onCollide("oil", (o) => {
            o.destroy();
            player.hurt(10);
            k.shake(10);
        });
        k.setBackground(103, 211, 250, 1);

        // Create oil containers at random intervals
        k.loop(1, () => {
            k.wait(k.rand(2, 8), () => {
                createOilContainer(k);
            });
        });
    }, []);
    return <canvas ref={canvasRef} />;
};
