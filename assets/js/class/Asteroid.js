// objeto do asteroide
export class Asteroid {
    constructor(x, y, width, height, speed, imagePath) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.speed = speed;
        this.image = new Image();
        this.image.src = imagePath;
    }

    draw(context) {
        // desenhar a imagem
        context.drawImage(this.image, this.x, this.y, this.width, this.height);
    }

    update() {
        this.y += this.speed;
    }
}