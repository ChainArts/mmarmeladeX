import { KaboomCtx } from "kaboom";

export function Player(k: KaboomCtx) {
    k.loadSprite("turtle", "/assets/turtle.png");
    
    let x = 0;
    let y = 0;

    const player = k.add([
        k.sprite("turtle"),
        k.pos(k.width() / 2, k.height() / 2),
        k.anchor("center"),
        k.rotate(0),
        k.scale(0.2),
        k.area({ scale: 0.75}),
        k.body(),
        k.center(),
        {
            life: 100,
            speed: 200,
            isInvincible: false,
        }
    ]);

    k.onUpdate(() => {
        player.move(x * player.speed, y * player.speed);
    });

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
