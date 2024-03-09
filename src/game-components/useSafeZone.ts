import { KaboomCtx } from "kaboom";

export function useSafeZone(k: KaboomCtx, safeZoneWidth: number, safeZoneHeight: number) {
    // Generate a random position while considering the safezone
    let x, y;
    do {
        x = k.rand(safeZoneWidth, k.width() - safeZoneWidth);
        y = k.rand(safeZoneHeight, k.height() - safeZoneHeight);
    } while (
        // Check if the oil container's position is within the safezone
        x >= k.width() / 2 - safeZoneWidth / 2 &&
        x <= k.width() / 2 + safeZoneWidth / 2 &&
        y >= k.height() / 2 - safeZoneHeight / 2 &&
        y <= k.height() / 2 + safeZoneHeight / 2
    );

    return { x, y };
}