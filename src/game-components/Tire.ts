import { KaboomCtx } from "kaboom";
import { useSafeZone } from "./useSafeZone";

export function createTire(k: KaboomCtx) {

    const { x, y } = useSafeZone(k, 100, 100);
    const Tire = k.add([
        k.sprite("tire"),
        "tire",
        "enemy",
        k.scale(0.1),
        k.anchor("center"),
        k.pos(x, y), // Random position
        k.area(),
        k.lifespan(10), // Destroy after 10 seconds
    ]);

    return Tire;
}