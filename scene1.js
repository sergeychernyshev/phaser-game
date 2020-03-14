class Scene1 extends Phaser.Scene {
  constructor() {
    super("level1");
  }

  preload() {
    this.load.image("bg", "assets/background.png");
    this.load.spritesheet("fire", "assets/fireball.png", {
      frameWidth: 32,
      frameHeight: 32
    });
  }

  create() {
    this.add.image(window.innerWidth / 2, window.innerHeight / 2, "bg");

    this.player = this.physics.add.sprite(
      window.innerWidth / 2,
      window.innerHeight / 2,
      "fire"
    );

    this.anims.create({
      key: "burn",
      frames: this.anims.generateFrameNumbers("fire", {
        start: 0,
        end: 3
      }),
      frameRate: 10
    });

    this.player.setScale(2);
    this.player.setBounce(0.5);
    this.player.setCollideWorldBounds(true);

    this.cursors = this.input.keyboard.createCursorKeys();
  }

  update() {
    this.player.anims.play("burn", true);

    if (this.cursors.left.isDown) {
      this.player.setVelocityX(-160);
    } else if (this.cursors.right.isDown) {
      this.player.setVelocityX(160);
    } else {
      this.player.setVelocityX(0);
    }

    if (this.cursors.up.isDown /* && player.body.touching.down */) {
      this.player.setVelocityY(-300);
    }
  }
}
