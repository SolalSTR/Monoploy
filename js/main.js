class Plateau {
    constructor(cases,plateau) {
        this.plateau = plateau;
        this.cases = cases
        this.createPlateCase();
    }

    createPlateCase() {
        for (let side of Object.keys(this.cases)) {
            let ruesContainer = document.querySelector(".case-rue-" + side);
            for (let rue of Object.keys(this.cases[side])) {
                let card = document.createElement("div");
                let cardName = document.createElement("p");
                cardName.innerText = rue;
                card.appendChild(cardName);
                ruesContainer.appendChild(card);
            }
        }

    }
}

var cases = {
    bottom: {
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
