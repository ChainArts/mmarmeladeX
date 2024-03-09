import { useEffect, useRef } from "react";
import kaboom from "kaboom";

export const Game: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const k = kaboom({
            global: false,
            canvas: canvasRef.current!,
        });
        k.add([k.text("Hello, Kaboom!"), k.pos(100, 100)]);
    }, []);
    return <canvas ref={canvasRef} />;
};