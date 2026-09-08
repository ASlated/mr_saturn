import { Scene } from 'phaser';

// Must be an integer
const TITLE_SCALING = 2;
// Must be exactly 6
const TITLE_SIZE = 6;
// Character starting Y position
const TITLE_Y = 54;
// Character movement amount
const TITLE_Y_MOVEMENT = 10;

export class MainMenu extends Scene
{
    constructor ()
    {
        super('MainMenu');
    }

    create ()
    {
        this.graphics = this.add.graphics();

        this.graphics.fillStyle(0xeec39a, 1);

        this.graphics.fillRect(0, 0, 160, 48);
        this.graphics.fillRect(0, 96, 160, 48);

        let titleStr = 'MR. SATURN';
        let titleChars = []
        for (let char of titleStr) {
            titleChars.push(this.add.bitmapText(0, TITLE_Y, 'squareFontLight', char, 10 * TITLE_SCALING, 0));
        }
        let titleLeftPos = 80 - titleStr.length * TITLE_SIZE * TITLE_SCALING / 2
        for (let i = 0; i < titleChars.length; i++) {
            const e = titleChars[i];
            e.setX(titleLeftPos + TITLE_SIZE * i * TITLE_SCALING)
            this.tweens.add({
                targets: e,
                y: TITLE_Y + TITLE_Y_MOVEMENT,
                duration: 800,
                repeat: -1,
                ease: 'quad.inout',
                yoyo: true,
                delay: i * 100 + 500
            });
        }
        let text = this.add.bitmapText(0, 84, 'squareFontLight', 'Press \'ENTER\' to start', 10, 0)
        text.setX(80 - Math.round(text.width / 2))
        
        let authorText = this.add.bitmapText(0, 108, 'squareFontDark', 'designed by Aidan Slate', 10, 0)
        authorText.setX(80 - Math.round(authorText.width / 2))
        
        let creatorText1 = this.add.bitmapText(0, 124, 'squareFontDark', 'Mr. Saturn created by', 10, 0)
        creatorText1.setX(80 - Math.round(creatorText1.width / 2))
        let creatorText2 = this.add.bitmapText(0, 132, 'squareFontDark', 'Shigesato Itoi', 10, 0)
        creatorText2.setX(80 - Math.round(creatorText2.width / 2))

        for (let i = 0; i < 12; i++) {
            let saturn = this.add.sprite(-40, 32, 'mr_saturn').playAfterDelay('walk-right', Math.random() * 800);
            this.tweens.add({
                targets: saturn,
                x: 200,
                duration: 12000,
                delay: i * 1200,
                yoyo: true,
                repeat: -1,
                onYoyo: () => {
                    saturn.playAfterDelay('walk-left', Math.random() * 800);
                    saturn.setY(8);
                },
                onRepeat: () => {
                    saturn.playAfterDelay('walk-right', Math.random() * 800);
                    saturn.setY(32);
                },
            });
        }
        
        this.input.keyboard.on('keydown-ENTER', () => {

            this.scene.start('Game');

        });


        this.scale.setZoom(4);
    }
}
