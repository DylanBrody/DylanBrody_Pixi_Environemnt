import { Application, Assets, Sprite, Rectangle } from "pixi.js";

async function tinting() {
    const app = new Application();

    await app.init({ resizeTo: window });

    document.body.appendChild(app.canvas);

    const texture = await Assets.load('https://pixijs.com/assets/eggHead.png');

    const aliens: any[] = [];

    const totalDudes = 20;

    for (let i = 0; i < totalDudes; i++) {
        const dude = new Sprite(texture);
        dude.anchor.set(0.5);
        dude.scale.set(0.8 + Math.random() * 0.3);

        dude.x = Math.random() * app.screen.width;
        dude.y = Math.random() * app.screen.height;

        dude.tint = Math.random() * 0xffffff;

        dude.direction = Math.random() * Math.PI * 2;

        // This number will be used to modify the direction of the dude over time
        dude.turningSpeed = Math.random() - 0.8;

        // Create a random speed for the dude between 2 - 4
        dude.speed = 2 + Math.random() * 2;

        aliens.push(dude);
        app.stage.addChild(dude);
    }

    const dudeBoundsPadding = 100;
    const dudeBounds = new Rectangle(
        -dudeBoundsPadding,
        -dudeBoundsPadding,
        app.screen.width + dudeBoundsPadding * 2,
        app.screen.height + dudeBoundsPadding * 2,
    );

    app.ticker.add(() =>
    {
        // Iterate through the dudes and update their position
        for (let i = 0; i < aliens.length; i++)
        {
            const dude = aliens[i];

            dude.direction += dude.turningSpeed * 0.01;
            dude.x += Math.sin(dude.direction) * dude.speed;
            dude.y += Math.cos(dude.direction) * dude.speed;
            dude.rotation = -dude.direction - Math.PI / 2;

            // Constrain the dudes' position by testing their bounds...
            if (dude.x < dudeBounds.x)
            {
                dude.x += dudeBounds.width;
            }
            else if (dude.x > dudeBounds.x + dudeBounds.width)
            {
                dude.x -= dudeBounds.width;
            }

            if (dude.y < dudeBounds.y)
            {
                dude.y += dudeBounds.height;
            }
            else if (dude.y > dudeBounds.y + dudeBounds.height)
            {
                dude.y -= dudeBounds.height;
            }
        }
    });
}

tinting();