class Plateau {
    constructor(cases,plateau,players) {
        this.plateau = plateau;
        this.plateauCases = cases;

        this.playersName = players;
        this.players = [];
        this.createPlateCase();
        this.createPlayerPions();
    }

    createPlateCase() {
        this.plateau.style.gridTemplate = "repeat(3,1fr) / repeat(3,1fr)";
        let cardIndex = 0;
        let x = 3;
        let y = 3;
        for (let cases of Object.keys(this.plateauCases)) {

            let card = this.plateauCases[cases];

            let cardElement = document.createElement("div");

            if (card.function == "start") {
                let iconElemnt = document.createElement("i");
                iconElemnt.classList = "fas fa-long-arrow-alt-left";
                cardElement.appendChild(iconElemnt);
            }
            if (card.function == "jail") {
                let iconElemnt = document.createElement("i");
                iconElemnt.classList = "fas fa-dungeon";
                cardElement.appendChild(iconElemnt);
            }
            if (card.function == "parc") {
                let iconElemnt = document.createElement("i");
                iconElemnt.classList = "fas fa-car-alt";
                cardElement.appendChild(iconElemnt);
            }
            if (card.function == "police") {
                let iconElemnt = document.createElement("i");
                iconElemnt.classList = "fas fa-angry";
                cardElement.appendChild(iconElemnt);
            }

            let cardName = document.createElement("p");
            cardName.style.background = card.color;
            cardName.innerText = card.name;
            cardElement.appendChild(cardName);

            if (card.function == "sell") {
                let cardPrice = document.createElement("p");
                cardPrice.innerText = "Prix: " +card.prix;
                cardElement.appendChild(cardPrice);

                let cardLoyer = document.createElement("p");
                cardLoyer.innerText = "Loyer: " + card.loyer;
                cardElement.appendChild(cardLoyer);
            }
            let platLength = this.plateauCases.length;
            cardElement.style.order = cardIndex;

            cardElement.style.gridColumn = x + " / span 1";
            cardElement.style.gridRow = y + " / span 1";
            cardIndex++;
            if (cardIndex >= 7) {
                y++;
            } else if (cardIndex >= 5) {
                x++;
            } else if (cardIndex >= 3) {
                y--;
            } else {
                x--;
            }

            cardElement.classList.add("case");
            this.plateau.appendChild(cardElement);
            card.element = cardElement;
        }
    }

    createPlayerPions() {
        for (let player of this.playersName) {
            this.players.push(new Player(player,"red",500,this.plateauCases));
        }
    }
}




var plateauCases = {
    start: {
        function: "start",
        name: "Start",
        prix: 200,
        element: null
    },
    pompidou: {
        function: "sell",
        name: "Pompidou",
        prix: 10,
        color: "hsl(57, 75%, 50%)",
        loyer: 5,
        element: null
    },
    jail: {
        function: "jail",
        name: "Jail",
        waitTime: 3,
        element: null
    },
    partDieu: {
        function: "sell",
        name: "Part-Dieu",
        prix: 20,
        color: "hsl(0, 74%, 50%)",
        loyer: 15,
        element: null
    },
    parc: {
        function: "parc",
        name: "Free Parc",
        element: null
    },
    villeurbanne: {
        function: "sell",
        name: "Villeurbanne",
        prix: 100,
        color: "hsl(120, 74%, 50%)",
        loyer: 175,
        element: null
    },
    police: {
        function: "police",
        name: "Go to prison",
        element: null
    },
    lafayette: {
        function: "sell",
        name: "Lafayette",
        prix: 500,
        color: "hsl(246, 74%, 50%)",
        loyer: 600,
        element: null
    }
}

var game = new Plateau(plateauCases,document.getElementById('plateau'),["Solal","sOLAL","simon"]);
/*
setInterval(function() {

},1000);*/
game.players[0].movePion(2);
