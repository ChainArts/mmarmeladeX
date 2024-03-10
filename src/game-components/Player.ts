import { KaboomCtx } from "kaboom";
export function Player(k: KaboomCtx) {
    k.loadSprite("turtle", "/assets/turtle.png");

    let x = 0;
    let y = 0;

    const player = k.add([
        k.sprite("turtle"),
        "player",
        k.pos(k.width() / 2, k.height() / 2),
        k.anchor("center"),
        k.rotate(0),
        k.scale(0.2),
        k.area({ scale: 0.75 }),
        k.body(),
        k.center(),
        {
            life: 100,
            speed: 5000,
            isInvincible: false,
            isInverted: false,
            canMove: true,
            score: 0,
        },
    ]);

    const bubble = k.add([
        k.sprite("bubble"),
        k.pos(player.pos.x, player.pos.y),
        k.anchor("center"),
        k.opacity(0), // Invisible initially
        k.scale(0.2), // Match the player's scale or set as needed
    ]);

    // Controls ----------------------------------------------------------------

    k.onKeyDown("d", () => {
        x = 1;
        y = 0;
        player.rotateTo(player.isInverted ? -90 : 90);
    });
    k.onKeyDown("a", () => {
        x = -1;
        y = 0;
        player.rotateTo(player.isInverted ? 90 : -90);
    });
    k.onKeyDown("w", () => {
        x = 0;
        y = -1;
        player.rotateTo(player.isInverted ? 180 : 0);
    });
    k.onKeyDown("s", () => {
        x = 0;
        y = 1;
        player.rotateTo(player.isInverted ? 0 : 180);
    });

    // Collisions ----------------------------------------------------------------

    // Powerups ------------------------------------------------------------------

    player.onCollide("powerup", (p) => {
        player.life += 10;
        player.score += 10;
        if (player.life > 100) {
            player.life = 100;
        }

        if (p.is("shell")) {
            player.isInvincible = true;
            bubble.opacity = 1;
            player.score += 10;
            setTimeout(() => {
                player.isInvincible = false;
                bubble.opacity = 0;
            }, 5000);
        }

        if (p.is("jam")) {
            player.speed = 10000;
            player.score += 40;
            setTimeout(() => {
                player.speed = 5000;
            }, 1000);
        }

        p.destroy();
    });

    // enemies ------------------------------------------------------------------

    player.onCollide("enemy", (e) => {
        if (player.isInvincible === false) {
            if (e.is("oil")) {
                k.addKaboom(player.pos);
                k.shake(10);
                player.life -= 20;
                player.canMove = false;
                setTimeout(() => {
                    player.canMove = true;

                    if (x === 1) {
                        player.rotateTo(90);
                    } else if (x === -1) {
                        player.rotateTo(-90);
                    } else if (y === 1) {
                        player.rotateTo(180);
                    } else if (y === -1) {
                        player.rotateTo(0);
                    }
                }, 2000);
            }

            if (e.is("toxic")) {
                k.addKaboom(player.pos);
                k.shake(20);
                player.life -= 50;
                player.isInverted = true;
                player.rotateBy(180);
                setTimeout(() => {
                    player.isInverted = false;
                    player.rotateBy(180);
                }, 5000);
            }

            if (e.is("tire")) {
                k.addKaboom(player.pos);
                k.shake(5);
                player.life -= 10;
            }
        } else {
            player.score += 20;
            if (e.is("toxic")) {
                player.score += 30;
            }
        }
        e.destroy();
    });

    k.onUpdate(() => {
        if (player.canMove) {
            if (player.isInverted) {
                player.move(
                    x * -player.speed * k.dt(),
                    y * -player.speed * k.dt()
                );
            } else {
                player.move(
                    x * player.speed * k.dt(),
                    y * player.speed * k.dt()
                );
            }
        } else {
            // player spins in place
            player.rotateBy(10);
        }

        bubble.pos = player.pos.clone();
        player.life -= 1 * k.dt();
    });

    return player;
}
