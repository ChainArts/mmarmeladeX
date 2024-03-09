import { KaboomCtx } from "kaboom";
import { useSafeZone } from "./useSafeZone";

export function createToxicContainer(k: KaboomCtx) {
    
    const { x, y } = useSafeZone(k, 100, 100);
    
    const oilContainer = k.add([
        k.sprite("toxic"),
        "toxic",
        "enemy",
        k.area(),
        k.anchor("center"),
        k.pos(x, y), // Random position
        k.scale(0.1),
        k.lifespan(10), // Destroy after 10 seconds
    ]);

    return oilContainer;
}