import { KaboomCtx } from "kaboom";

export function createShell(k: KaboomCtx) {
    // Define safezone dimensions
    const safezoneWidth = 100;
    const safezoneHeight = 100;

    // Generate a random position while considering the safezone
    let x, y;
    do {
        x = k.rand(safezoneWidth, k.width() - safezoneWidth);
        y = k.rand(safezoneHeight, k.height() - safezoneHeight);
    } while (
        // Check if the oil container's position is within the safezone
        x >= k.width() / 2 - safezoneWidth / 2 &&
        x <= k.width() / 2 + safezoneWidth / 2 &&
        y >= k.height() / 2 - safezoneHeight / 2 &&
        y <= k.height() / 2 + safezoneHeight / 2
    );

    const oilContainer = k.add([
        k.sprite("shell"),
        "shell",
        "powerup",
        k.area(),
        k.anchor("center"),
        k.pos(x, y),
        k.scale(0.1),
        k.lifespan(15),
    ]);

    return oilContainer;
}