class Plateau {
    constructor(cases,plateau,players) {
        this.plateau = plateau;
        this.plateauCases = cases;
        this.caisse = 100;

        this.playersName = players;
        this.players = [];
        this.playerTurn = 0;
        this.movement = 0;
        this.createPlateCase();
        this.createPlayerPions();
    }

    createPlateCase() {
        let platLength = Object.keys(this.plateauCases).length;
        this.plateau.style.gridTemplate = "repeat("+(platLength/4+1)+",1fr) / repeat("+(platLength/4+1)+",1fr)";
        let cardIndex = 0;
        let x = (platLength/4+1);
        let y = (platLength/4+1);
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
            } else {
                cardElement.classList.add("corner");
            }


            cardElement.style.order = cardIndex;

            cardElement.style.gridColumn = x + " / span 1";
            cardElement.style.gridRow = y + " / span 1";
            cardIndex++;
            if (cardIndex >= platLength-(platLength/4-1)) {
                y++;
            } else if (cardIndex >= platLength/2+1) {
                x++;
            } else if (cardIndex >= platLength/4+1) {
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
        let header = document.querySelector("header");

        for (let i in this.playersName) {
            let player = this.playersName[i]
            let counter = document.createElement("p");
            counter.innerText = player;
            header.appendChild(counter);

            this.players.push(new Player(player,counter,"hsl("+Math.round(Math.random()*360)+",75%,60%)",500,[i,this.playersName.length - 1],this));
        }

        this.diceRoll(1,2,2);
    }

    diceRoll(min,max,times) {
        let movement = min * times;
        for (var i = 0; i < times; i++) {
            movement += Math.floor(Math.random() * max);
        }
        this.nextMove = movement;
        this.counterHandeler();
        this.popUp("Jetez les dés !",this.players[this.playerTurn].name,this.turnHandeler,"Roll")
    }

    popUp(title,info,func1,name1) {
        let popUpElement = document.createElement("div");
        popUpElement.classList.add("popUp");

        let popUpTitle = document.createElement("p");
        popUpTitle.innerText = title;
        popUpElement.appendChild(popUpTitle);

        let popUpInfo = document.createElement("p");
        popUpInfo.innerText = info;
        popUpElement.appendChild(popUpInfo);

        let buttonDiv = document.createElement("div");

        popUpElement.appendChild(buttonDiv);

        let confirm = document.createElement("button");
        confirm.innerText = name1;
        confirm.onclick = function() {
            popUpElement.remove();
            func1()
        }
        buttonDiv.appendChild(confirm);

        document.getElementById('plateau').appendChild(popUpElement);

    }

    turnHandeler = () => {
        this.players[this.playerTurn].movePion(this.nextMove);
        this.playerTurn++;

        if (this.playerTurn < 0) {
            this.playerTurn += this.playersName.length;
        }
        if (this.playerTurn >= this.playersName.length) {
            this.playerTurn -= this.playersName.length;
        }
    }

    counterHandeler = () => {
        this.players.forEach(function(player) {
            player.counter.innerText = player.name + " " + player.money;
        });
    }


}




var plateauCases = {
    start: {
        function: "start",
        name: "Start",
        prix: 200,
        element: null
    },
    rue1: {
        function: "sell",
        name: "Rue 1",
        prix: 10,
        color: "hsl(57, 75%, 50%)",
        owner: null, loyer: 5,
        element: null
    },
    rue2: {
        function: "sell",
        name: "Rue 2",
        prix: 15,
        color: "hsl(57, 75%, 50%)",
        owner: null, loyer: 7,
        element: null
    },
    rue3: {
        function: "sell",
        name: "Rue 3",
        prix: 20,
        color: "hsl(57, 75%, 50%)",
        owner: null, loyer: 13,
        element: null
    },
    jail: {
        function: "jail",
        name: "Jail",
        waitTime: 3,
        element: null
    },
    rue4: {
        function: "sell",
        name: "Rue 4",
        prix: 26,
        color: "hsl(57, 75%, 50%)",
        owner: null, loyer: 14,
        element: null
    },
    rue5: {
        function: "sell",
        name: "Rue 5",
        prix: 30,
        color: "hsl(57, 75%, 50%)",
        owner: null, loyer: 21,
        element: null
    },
    rue6: {
        function: "sell",
        name: "Rue 6",
        prix: 32,
        color: "hsl(57, 75%, 50%)",
        owner: null, loyer: 27,
        element: null
    },
    parc: {
        function: "parc",
        name: "Free Parc",
        element: null
    },
    rue7: {
        function: "sell",
        name: "Rue 7",
        prix: 40,
        color: "hsl(57, 75%, 50%)",
        owner: null, loyer: 35,
        element: null
    },
    rue8: {
        function: "sell",
        name: "Rue 8",
        prix: 42,
        color: "hsl(57, 75%, 50%)",
        owner: null, loyer: 36,
        element: null
    },
    rue9: {
        function: "sell",
        name: "Rue 9",
        prix: 45,
        color: "hsl(57, 75%, 50%)",
        owner: null, loyer: 39,
        element: null
    },
    police: {
        function: "police",
        name: "Go to Jail",
        element: null
    },
    rue10: {
        function: "sell",
        name: "Rue 10",
        prix: 50,
        color: "hsl(243, 75%, 50%)",
        owner: null, loyer: 40,
        element: null
    },
    rue11: {
        function: "sell",
        name: "Rue 10",
        prix: 60,
        color: "hsl(243, 75%, 50%)",
        owner: null, loyer: 50,
        element: null
    },
    rue12: {
        function: "sell",
        name: "Rue 10",
        prix: 80,
        color: "hsl(243, 74%, 50%)",
        owner: null, loyer: 70,
        element: null
    },
}

var game = new Plateau(plateauCases,document.getElementById('plateau'),["Solal","sOLAL","simon"]);
/*
setInterval(function() {

},1000);*/
//game.players[0].movePion(3);
