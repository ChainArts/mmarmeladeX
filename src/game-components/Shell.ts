import { KaboomCtx } from "kaboom";
import { useSafeZone } from "./useSafeZone";

export function createShell(k: KaboomCtx) {
    // Define safezone dimensions
    const { x, y } = useSafeZone(k, 100, 100);

    const oilContainer = k.add([
        k.sprite("shell"),
        "shell",
        "powerup",
        k.area(),
        k.anchor("center"),
        k.pos(x, y),
        k.scale(0.1),
        k.lifespan(30),
    ]);

    return oilContainer;
}