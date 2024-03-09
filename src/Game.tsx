import { useEffect, useState, useRef } from "react";
import kaboom from "kaboom";

export const Game: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [isMoving, setIsMoving] = useState(false);

    useEffect(() => {
        const k = kaboom({
            global: false,
            canvas: canvasRef.current!,
        });
        k.loadSprite("turtle", "/assets/turtle.png");
        const player = k.add([
            k.sprite("turtle"),
            k.pos(k.width() / 2, k.height() / 2),
            k.anchor("center"),
            k.rotate(0),
            k.scale(0.1),
            k.area(),
            k.body(),
            k.center(),
            k.health(100),
        ])
        k.setBackground(103, 211, 250, 1);
        k.onKeyDown("d", () => {
            player.move(200, 0);
            player.rotateTo(90);
        });
        k.onKeyDown("a", () => {
            player.move(-200, 0);
            player.rotateTo(-90);
        });
        k.onKeyDown("w", () => {
            player.move(0, -200);
            player.rotateTo(0);
        });
        k.onKeyDown("s", () => {
            player.move(0, 200);
            player.rotateTo(180);
        });
            
    }, []);
    return <canvas ref={canvasRef} />;
};