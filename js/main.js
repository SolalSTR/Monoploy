class Plateau {
    constructor(cases,plateau) {
        this.plateau = plateau;
        this.cases = cases
        this.createPlateCase();
    }

    createPlateCase() {
        for (let side of Object.keys(this.cases)) {
            let ruesContainer = document.querySelector(".case-rue-" + side);
            let color = this.cases[side].color;
            for (let rue of Object.keys(this.cases[side])) {
                if (rue == "color") {
                    continue;
                }
                let card = document.createElement("div");
                let cardName = document.createElement("p");
                cardName.style.background = color
                cardName.innerText = rue;

                let cardPrice = document.createElement("span");
                cardPrice.innerText = "Prix: " +this.cases[side][rue].prix;

                card.appendChild(cardName);
                card.appendChild(cardPrice);
                ruesContainer.appendChild(card);
            }
        }

    }
}

var cases = {
    bottom: {
        color: "#4ee350",
        Pompidou: {
            prix: 50
        },
        Séville: {
            prix: 60
        },
        Oui: {
            prix: 70
        },
        Pompidou_2: {
            prix: 80
        },
        Non: {
            prix: 50
        }
    },
    left: {
        color: "#e34e4e",
        Pompidou: {
            prix: 50
        },
        Séville: {
            prix: 60
        },
        Oui: {
            prix: 70
        },
        Pompidou_2: {
            prix: 80
        },
        Non: {
            prix: 50
        }
    },
    top: {
        color: "#e3d94e",
        Pompidou: {
            prix: 50
        },
        Séville: {
            prix: 60
        },
        Oui: {
            prix: 70
        },
        Pompidou_2: {
            prix: 80
        },
        Non: {
            prix: 50
        }
    },
    right: {
        color: "#4e54e3",
        Pompidou: {
            prix: 50
        },
        Séville: {
            prix: 60
        },
        Oui: {
            prix: 70
        },
        Pompidou_2: {
            prix: 80
        },
        Non: {
            prix: 50
        }
    }
}

var game = new Plateau(cases,document.querySelector(".plateau"));
