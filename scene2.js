class Scene2 extends Phaser.Scene {
    constructor() {
        super("level2");
    }

    preload() {
        this.load.image("skyBg", "assets/blue_night_sky.jpg");
        this.load.spritesheet("airship", "assets/airship.png", {
            frameWidth: 32,
            frameHeight: 32,
        });
        this.load.image("cloudPlatform", "assets/cloud_platform.png");
    }

    create() {
        this.add.image(window.innerWidth / 2, window.innerHeight / 2, "skyBg");

        this.platforms = this.physics.add.staticGroup();

        this.platforms.create(window.innerWidth / 2, window.innerHeight / 2, 'cloudPlatform');
        this.platforms.create(window.innerWidth / 2 + 200, window.innerHeight / 2 + 200, 'cloudPlatform');

        this.airshipPlayer = this.physics.add.sprite(
            window.innerWidth / 2,
            window.innerHeight / 2 - 300,
            "airship"
        );

        let airship = this.anims.create({
            key: "fly",
            frames: this.anims.generateFrameNumbers("airship", {
                start: 0,
                end: 1
            }),
            frameRate: 5
        });
        this.airshipPlayer.setScale(7);
        this.airshipPlayer.setBounce(0.5);
        this.airshipPlayer.setCollideWorldBounds(true);
        this.cursors = this.input.keyboard.createCursorKeys();

        this.physics.add.collider(this.airshipPlayer, this.platforms);


    }
    update() {

        this.airshipPlayer.anims.play("fly", true);

        if (this.cursors.left.isDown) {
            this.airshipPlayer.setVelocityX(-160);
            this.airshipPlayer.setFlipX(true);
        } else if (this.cursors.right.isDown) {
            this.airshipPlayer.setVelocityX(160);
            this.airshipPlayer.setFlipX(false);
        } else {
            this.airshipPlayer.setVelocityX(0);
        }

        if (this.cursors.up.isDown /* && player.body.touching.down */) {
            this.airshipPlayer.setVelocityY(-300);
        }

    }
}

