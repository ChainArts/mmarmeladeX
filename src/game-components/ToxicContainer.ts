import { KaboomCtx } from "kaboom";
import { useSafeZone } from "./useSafeZone";

export function createToxicContainer(k: KaboomCtx) {
    
    const { x, y } = useSafeZone(k, 100, 100);
    
    const toxicContainer = k.add([
        k.sprite("toxic"),
        "toxic",
        "enemy",
        k.area({ scale: 0.5}),
        k.anchor("center"),
        k.pos(x, y), // Random position
        k.scale(0.2),
        k.lifespan(30), // Destroy after 10 seconds
    ]);

    return toxicContainer;
}