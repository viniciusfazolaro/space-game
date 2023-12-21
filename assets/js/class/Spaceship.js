// objeto da nave
export class Spaceship {
    constructor(x, y, width, height, speed, imagePath) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.speed = speed;
        this.image = new Image();
        this.image.src = imagePath;
    }

    moveLeft() {
        if (this.x > 0) {
            this.x -= this.speed;
        }
    }

    moveRight(canvasWidth) {
        if (this.x < canvasWidth - this.width) {
            this.x += this.speed;
        }
    }

    draw(context) {
        // desenhar a imagem
        context.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
}