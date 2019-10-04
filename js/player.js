Object.size = function(obj) {
    var size = 0, key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
};

class Player {
    constructor(name,counter,color,money,order,game) {
        this.name = name;
        this.color = color;
        this.order = order[0];
        this.max = order[1];
        this.money = money;
        this.cards = [];
        this.plateau = game.plateauCases;
        this.counter = counter;
        this.game = game;
        this.pos = 0;
        this.jailTime = 0;

        this.pion;
        this.createPion();
    }

    createPion() {
        let pion = document.createElement("div");
        pion.classList.add("pion");
        pion.style.background = this.color;

        let playerName = document.createElement("p");
        playerName.innerText = this.name;
        pion.appendChild(playerName);

        this.pion = pion;
        document.getElementById('plateau').appendChild(this.pion);
        this.setPos();
    }

    movePion(step,) {
        let index = this.pos + step;
        let platLength = Object.size(this.plateau);
        if (index < 0) {
            index += platLength;
        }
        if (index >= platLength) {
            if (index == platLength) {
                this.money += this.plateau.start.prix * 2;
                console.log(this.name + " a récupéré " + this.plateau.start.prix * 2);
            } else {
                this.money += this.plateau.start.prix;
                console.log(this.name + " est passé par la case départ " + this.plateau.start.prix);
            }
            index -= platLength;

        }
        if (this.jailTime == 0) {
            this.pos = index;
            this.setPos();
        } else {
            this.jailTime--;
            console.log(this.name + " est en prison pour encore " + (this.jailTime + 1));
        }

        let element = this.plateau[Object.keys(this.plateau)[this.pos]];

        if (element.function == "sell") {
            setTimeout(() => {
                this.popUp("Acheter ?",element.name,this.buyCard,"Oui",this.endTurn,"Non")
            },1000);
        } else if (element.function == "police") {

            setTimeout(() => {
                this.goToJail();
            },1000);
            console.log(this.name + " doit aller en prison.");
        } else if (element.function == "owned") {
            if (element.owner.name != this.name) {
                setTimeout(() => {
                    this.giveMoney();
                },1000);
            } else {
                console.log(this.name + " est chez lui.");
                this.endTurn();
            }
        } else if (element.function == "jail") {
            setTimeout(() => {
                this.endTurn();
            },1000);
        } else if (element.function == "parc") {
            setTimeout(() => {
                this.money += this.game.caisse;
                console.log(this.name + " a récupéré " + this.game.caisse);
                this.game.caisse = 0;
                this.endTurn();
            },1000);
        } else {
            setTimeout(() => {
                this.endTurn();
            },1000);
        }



    }

    popUp(title,info,func1,name1,func2,name2) {
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

        let cancel = document.createElement("button");
        cancel.innerText = name2;
        cancel.onclick = function() {
            popUpElement.remove();
            func2()
        }
        buttonDiv.appendChild(cancel);

        document.getElementById('plateau').appendChild(popUpElement);

    }

    buyCard = () => {
        let card = this.plateau[Object.keys(this.plateau)[this.pos]];

        card.owner = this;
        card.function = "owned";
        this.money -= card.prix;
        this.cards.push(card);
        card.element.style.border = this.color + " 5px double";

        this.endTurn();
    }

    giveMoney = () => {
        let card = this.plateau[Object.keys(this.plateau)[this.pos]];
        this.money -= card.loyer;
        this.game.players[card.owner.order].money += card.loyer;
        this.endTurn();
    }

    goToJail = () => {
        this.pos = Object.keys(this.plateau).indexOf("jail");
        this.setPos();
        setTimeout(() => {
            this.jailTime = 3;
            this.endTurn();
        },1000);
    }

    endTurn = () => {
        this.game.diceRoll(1,2,2);
    }

    setPos = () => {
        let element = this.plateau[Object.keys(this.plateau)[this.pos]].element;

        this.pion.style.top = element.offsetTop + element.scrollHeight/2 - this.pion.scrollHeight/2 + "px";
        this.pion.style.left = ((this.max/2 - this.max)*25 + (25*this.order)) + element.offsetLeft + element.scrollWidth/2 - this.pion.scrollWidth/2 + "px";

    }
}
