Object.size = function(obj) {
    var size = 0, key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
};

class Player {
    constructor(name,color,money,plateau) {
        this.name = name;
        this.color = color;
        this.money = money;
        this.card = [];
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
        document.getElementById('plateau').appendChild(this.pion);
        this.setPos();
    }

    movePion(step) {
        let index = this.pos + step;
        let platLength = Object.size(this.plateau);
        if (index < 0) {
            index += platLength;
        }
        if (index >= platLength) {
            index -= platLength;
        }
        this.pos = index;
        this.setPos();
        this.popUp("Buy ?",this.test,"Yes",this.test2,"No");
    }

    popUp(title,func1,name1,func2,name2) {
        let popUpElement = document.createElement("div");
        popUpElement.classList.add("popUp");

        let popUpTitle = document.createElement("p");
        popUpTitle.innerText = title;
        popUpElement.appendChild(popUpTitle);

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

    test = () => {console.log('oui');}
    test2 = () => {console.log('non');}

    setPos = () => {
        let element = this.plateau[Object.keys(this.plateau)[this.pos]].element;

        this.pion.style.top = element.offsetTop + element.scrollHeight/2 - this.pion.scrollHeight/2 + "px";
        this.pion.style.left = element.offsetLeft + element.scrollWidth/2 - this.pion.scrollWidth/2 + "px";

    }
}
