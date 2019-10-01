class Player {
    constructor(name,color,money,plateau) {
        this.name = name;
        this.color = color;
        this.money = money;
        this.plateau = plateau;
        this.pos = 0;

        this.pion;
        this.createPion();
    }

    createPion() {
        let pion = document.createElement("div");
        pion.classList.add("pion");
        pion.style.background = this.color;
        this.pion = pion;
        this.setPos();
    }

    movePion(step) {
        let index = this.pos + step;
        if (index < 0) {
            index += this.plateau.length;
        }
        if (index >= this.plateau.length) {
            index -= this.plateau.length;
        }
        this.pos = index;
        this.setPos();

    }

    setPos = () => {

        this.plateau[this.pos].getElementsByTagName('div')[0].appendChild(this.pion);

    }
}
