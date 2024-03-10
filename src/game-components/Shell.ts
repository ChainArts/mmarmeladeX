import { KaboomCtx } from "kaboom";
import { useSafeZone } from "./useSafeZone";

export function createShell(k: KaboomCtx) {
    // Define safezone dimensions
    const { x, y } = useSafeZone(k, 100, 100);

    const shell = k.add([
        k.sprite("shell"),
        "shell",
        "powerup",
        k.area(),
        k.anchor("center"),
        k.pos(x, y),
        k.scale(0.2),
        k.lifespan(20),
    ]);

    return shell;
}