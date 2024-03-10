import { KaboomCtx } from "kaboom";
import { useSafeZone } from "./useSafeZone";

export function createBoat(k: KaboomCtx) {
    // Define safezone dimensions
    const { x, y } = useSafeZone(k, 100, 100);

    const boat = k.add([
        k.sprite("boat"),
        "boat",
        "enemy",
        k.area(),
        k.anchor("center"),
        k.pos(x, y),
        k.scale(0.2),
        k.lifespan(50),
    ]);

    return boat;
}
