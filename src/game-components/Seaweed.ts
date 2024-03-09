import { KaboomCtx } from "kaboom";
import { useSafeZone } from "./useSafeZone";

export function createSeaweed(k: KaboomCtx) {
    // Define safezone dimensions
    const { x, y } = useSafeZone(k, 100, 100);

    const seaweed = k.add([
        k.sprite("seaweed"),
        "seaweed",
        "powerup",
        k.area(),
        k.anchor("center"),
        k.pos(x, y),
        k.scale(0.2),
        k.lifespan(50),
    ]);

    return seaweed;
}