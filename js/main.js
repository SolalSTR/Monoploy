class Plateau {
    constructor(cases,plateau,players) {
        this.plateau = plateau;
        this.cases = cases;
        this.casesElement = [];
        this.playersName = players;
        this.players = [];
        this.createPlateCase();
        this.createPlayerPions();
    }

    createPlateCase() {
        let corners = [
            document.querySelector(".case-start"),
            document.querySelector(".case-prison"),
            document.querySelector(".case-parc"),
            document.querySelector(".case-police")
        ];
        for (let i in Object.keys(this.cases)) {
            let side = Object.keys(this.cases)[i];
            let ruesContainer = document.querySelector(".case-rue-" + side);
            let color = this.cases[side].color;
            let rueElements = [];
            for (let rue of Object.keys(this.cases[side])) {
                if (rue == "color") {
                    continue;
                }
                let pionDiv = document.createElement("div");
                pionDiv.classList.add("pionDiv");

                let card = document.createElement("div");
                let cardName = document.createElement("p");
                cardName.style.background = color
                cardName.innerText = rue;

                let cardPrice = document.createElement("p");
                cardPrice.innerText = "Prix: " +this.cases[side][rue].prix;

                let cardLoyer = document.createElement("p");
                cardLoyer.innerText = "Loyer: " +this.cases[side][rue].loyer;

                card.appendChild(cardName);
                card.appendChild(cardPrice);
                card.appendChild(cardLoyer);
                card.appendChild(pionDiv);
                ruesContainer.appendChild(card);
                rueElements.push(card);
            }
            this.casesElement = this.casesElement.concat(corners[i],rueElements);
        }
        console.log(this.casesElement);
    }

    createPlayerPions() {
        for (let player of this.playersName) {
            this.players.push(new Player(player,"red",50000,this.casesElement));
        }
    }
}

var cases = {
    bottom: {
        color: "#4ee350",
        Pompidou: {
            loyer: 10, prix: 50
        },
        Séville: {
            loyer: 10, prix: 60
        },
        Oui: {
            loyer: 10, prix: 70
        },
        Pompidou_2: {
            loyer: 10, prix: 80
        },
        Non: {
            loyer: 10, prix: 50
        }
    },
    left: {
        color: "#e34e4e",
        Pompidou: {
            loyer: 10, prix: 50
        },
        Séville: {
            loyer: 10, prix: 60
        },
        Oui: {
            loyer: 10, prix: 70
        },
        Pompidou_2: {
            loyer: 10, prix: 80
        },
        Non: {
            loyer: 10, prix: 50
        }
    },
    top: {
        color: "#e3d94e",
        Pompidou: {
            loyer: 10, prix: 50
        },
        Séville: {
            loyer: 10, prix: 60
        },
        Oui: {
            loyer: 10, prix: 70
        },
        Pompidou_2: {
            loyer: 10, prix: 80
        },
        Non: {
            loyer: 10, prix: 50
        }
    },
    right: {
        color: "#4e54e3",
        Pompidou: {
            loyer: 10, prix: 50
        },
        Séville: {
            loyer: 10, prix: 60
        },
        Oui: {
            loyer: 10, prix: 70
        },
        Pompidou_2: {
            loyer: 10, prix: 80
        },
        Non: {
            loyer: 10, prix: 50
        }
    }
}

var game = new Plateau(cases,document.querySelector(".plateau"),["Solal","sOLAL"]);

setTimeout(function() {
    game.players[0].movePion(4);
},1000);
