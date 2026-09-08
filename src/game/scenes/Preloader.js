import { Scene } from 'phaser';

export class Preloader extends Scene
{
    constructor ()
    {
        super('Preloader');
    }

    init ()
    {

        //  A simple progress bar. This is the outline of the bar.
        this.add.rectangle(512, 384, 468, 32).setStrokeStyle(1, 0xffffff);

        //  This is the progress bar itself. It will increase in size from the left based on the % of progress.
        const bar = this.add.rectangle(512-230, 384, 4, 28, 0xffffff);

        //  Use the 'progress' event emitted by the LoaderPlugin to update the loading bar
        this.load.on('progress', (progress) => {

            //  Update the progress bar (our bar is 464px wide, so 100% = 464px)
            bar.width = 4 + (460 * progress);

        });
    }

    preload ()
    {
        //  Load the assets for the game - Replace with your own assets
        this.load.setPath('assets');

        this.load.spritesheet('mr_saturn', 'mr_saturn.png', {frameWidth: 11, frameHeight: 13});

        this.load.bitmapFont('squareFont', 'square_6x6.png', 'square_6x6.xml');
        this.load.bitmapFont('squareFontLight', 'square_6x6_light.png', 'square_6x6.xml');
        this.load.bitmapFont('squareFontDark', 'square_6x6_dark.png', 'square_6x6.xml');
        this.load.bitmapFont('squareFontShadow', 'square_6x6_shadow.png', 'square_6x6.xml');
        
        this.load.audio('music', [
            'tropical.ogg',
            'tropical.mp3'
        ]);
        
        this.load.audio('start-game-sound', [
            'start_game.ogg',
            'start_game.mp3'
        ]);
    }

    create ()
    {
        this.scale.setZoom(4);

        //  When all the assets have loaded, it's often worth creating global objects here that the rest of the game can use.
        //  For example, you can define global animations here, so we can use them in other scenes.

        this.anims.create({
            key: 'walk-right',
            frames: this.anims.generateFrameNumbers('mr_saturn', { start: 0, end: 7}),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'walk-left',
            frames: this.anims.generateFrameNumbers('mr_saturn', { start: 8, end: 15}),
            frameRate: 10,
            repeat: -1
        });

        //  Move to the MainMenu. You could also swap this for a Scene Transition, such as a camera fade.

        let text1 = this.add.bitmapText(4, 4, 'squareFontLight', 'CLICK', 40, 0);
        let text2 = this.add.bitmapText(4, 44, 'squareFontLight', 'HERE', 40, 0);

        // debugger;

        this.input.once('pointerdown', () => {

            this.scene.start('MainMenu');

        });
        // this.scene.start('MainMenu');
    }
}
