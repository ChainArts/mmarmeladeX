import { KaboomCtx } from "kaboom";
import { useSafeZone } from "./useSafeZone";

export function createJam(k: KaboomCtx) {
    // Define safezone dimensions
    const { x, y } = useSafeZone(k, 100, 100);

    const jam = k.add([
        k.sprite("jam"),
        "jam",
        "powerup",
        k.area(),
        k.anchor("center"),
        k.pos(x, y),
        k.scale(0.2),
        k.lifespan(50),
    ]);

    return jam;
}