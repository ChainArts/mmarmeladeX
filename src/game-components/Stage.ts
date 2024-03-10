import { KaboomCtx } from "kaboom";

export function createStage(k: KaboomCtx) {
    k.add([
        k.sprite("border"),
        k.pos(-20, -20),
        k.scale(1.05),
        k.anchor("topleft"),
        k.area({ offset: { x: 0, y: -50 } }),
        k.body({ isStatic: true }),
    
    ]);

    k.add([
        k.sprite("border"),
        k.pos(630, -20),
        k.scale(1.05),
        k.anchor("topleft"),
        k.area({ offset: { x: 0, y: -50 } }),
        k.body({ isStatic: true }),
    ]);

    k.add([
        k.sprite("border"),
        k.pos(k.width() + 20, -20),
        k.scale(1.05),
        k.anchor("topright"),
        k.area({ offset: { x: 0, y: -50 } }),
        k.body({ isStatic: true }),
    ]);

    k.add([
        k.sprite("border-bottom"),
        k.pos(-20, k.height() + 20),
        k.scale(1.05),
        k.anchor("botleft"),
        k.area({ offset: { x: 0, y: 50 } }),
        k.body({ isStatic: true }),
    
    ]);

    k.add([
        k.sprite("border-bottom"),
        k.pos(630, k.height() + 20),
        k.scale(1.05),
        k.anchor("botleft"),
        k.area({ offset: { x: 0, y: 50 } }),
        k.body({ isStatic: true }),
    ]);

    k.add([
        k.sprite("border-bottom"),
        k.pos(k.width() + 20, k.height() + 20),
        k.scale(1.05),
        k.anchor("botright"),
        k.area({ offset: { x: 0, y: 50 } }),
        k.body({ isStatic: true }),
    ]);

    k.add([
        k.sprite("boat"),
        k.pos(k.width(), 0 - 200),
        k.scale(0.5),
        k.anchor("top"),
        k.area(),
        k.body({ isStatic: true }),
    ]);
    k.add([
        k.sprite("boat"),
        k.pos(0, 0 - 200),
        k.scale(0.5),
        k.anchor("top"),
        k.area(),
        k.body({ isStatic: true }),
    ]);

    k.add([
        k.sprite("boat"),
        k.pos(0, k.height() + 200),
        k.scale(0.5),
        k.anchor("bot"),
        k.area(),
        k.body({ isStatic: true }),
    ]);
    k.add([
        k.sprite("boat"),
        k.pos(k.width(), k.height() + 200),
        k.scale(0.5),
        k.anchor("bot"),
        k.area(),
        k.body({ isStatic: true }),
    ]);

}