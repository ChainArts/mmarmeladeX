import { KaboomCtx, Vec2 } from "kaboom";
import { useSafeZone } from "./useSafeZone";

export function createTire(k: KaboomCtx, playerPos: Vec2) {

    const { x, y } = useSafeZone(k, 100, 100, playerPos as Vec2, 500);
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