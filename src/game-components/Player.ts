import { KaboomCtx } from "kaboom";

export function Player(k: KaboomCtx) {
    const speed = 200;
    let x = 0;
    let y = 0;

    k.onUpdate(() => {
        player.move(x * speed, y * speed);
    });
    const player = k.add([
        k.sprite("turtle"),
        k.pos(k.width() / 2, k.height() / 2),
        k.anchor("center"),
        k.rotate(0),
        k.scale(0.1),
        k.area(),
        k.body(),
        k.center(),
        k.health(100),
    ]);

    k.onKeyDown("d", () => {
        x = 1;
        y = 0;
        player.rotateTo(90);
    });
    k.onKeyDown("a", () => {
        x = -1;
        y = 0
        player.rotateTo(-90);
    });
    k.onKeyDown("w", () => {
        x = 0;
        y = -1;
        player.rotateTo(0);
    });
    k.onKeyDown("s", () => {
        x = 0;
        y = 1;
        player.rotateTo(180);
    });
    return player;
} 
