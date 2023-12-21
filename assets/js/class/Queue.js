// classe da fila
export class Queue {
    constructor(maxSize) {
        this.asteroids = [];
        this.maxSize = maxSize;
    }

    // adiciona um asteroide na fila
    enqueue(asteroid) {
        try
        {
            if (this.asteroids.length >= this.maxSize) { // verifica se a fila está cheia
                throw new Error("Queue overflow"); // lança uma exceção caso a fila esteja cheia
            } else {
                this.asteroids.push(asteroid); // adiciona o asteroide à fila
            }
        }
        catch (error)
        {
            console.log(error);
        }
    }

    // remove um asteroide da fila
    dequeue() {
        if (this.isEmpty()) { // verifica se a fila está vazia
            return null;
        } else {
            return this.asteroids.shift(); // remove o primeiro item da fila
        }
    }

    // retorna o primeiro asteroide da fila
    isEmpty() {
        return this.asteroids.length === 0; // retorna true se a fila estiver vazia
    }

    // retorna o tamanho da fila
    size() {
        return this.asteroids.length;
    }
}

// método para percorrer a fila com um for...of
Queue.prototype[Symbol.iterator] = function() {
    let index = 0;
    const asteroids = this.asteroids;

    return {
        next: function() {
            return index < asteroids.length ?
                {value: asteroids[index++], done: false} :
                {done: true};
        }
    };
}

Queue.prototype.size = function() {
    return this.asteroids.length;
};