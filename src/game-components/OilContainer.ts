import { KaboomCtx } from "kaboom";
import { useSafeZone } from "./useSafeZone";

export function createOilContainer(k: KaboomCtx) {

    const { x, y } = useSafeZone(k, 100, 100);
    const oilContainer = k.add([
        k.sprite("oil"),
        "oil",
        "enemy",
        k.area({ scale: 0.5}),
        k.anchor("center"),
        k.pos(x, y), // Random position
        k.scale(0.15),
        k.lifespan(30), // Destroy after 10 seconds
    ]);

    return oilContainer;
}