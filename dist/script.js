"use strict";
class Validate {
    constructor(input) {
        this.input = input;
        this.init();
    }
    validateInput(inputStr) {
        const regex = /^[a-zA-Z\s]+$/;
        return regex.test(inputStr);
    }
    init() {
        this.input.addEventListener("input", () => {
            const inputStr = this.getInputValue();
            if (this.validateInput(inputStr)) {
                this.input.classList.remove("is-invalid");
                this.input.classList.add("is-valid");
            }
            else {
                this.input.classList.remove("is-valid");
                this.input.classList.add("is-invalid");
            }
        });
    }
    getInputValue() {
        return this.input.value;
    }
}
class nameRace {
    constructor(element) {
        this.element = element;
        this.namec = document.querySelector(".list-group");
        this.notify = document.querySelector(".notifi");
        this.bindEvents();
        this.copyName();
    }
    bindEvents() {
        this.element.addEventListener("mouseover", () => {
            this.element.innerHTML = "Klikni za imena vozaca";
        });
        this.element.addEventListener("mouseleave", () => {
            this.element.innerHTML = "Imena";
        });
        this.element.addEventListener("click", () => {
            this.namec.style.display = "flex";
        });
    }
    copyName() {
        let name = document.querySelectorAll(".list-group-item");
        name.forEach((item) => {
            item.addEventListener("click", () => {
                navigator.clipboard.writeText(item.textContent);
                this.element.innerHTML = "Text je kopiran";
                this.namec.style.display = "none";
                setTimeout(() => {
                    this.element.innerHTML = "Imena";
                }, 500);
            });
        });
    }
}
class inputFilter extends Validate {
    constructor() {
        super(document.querySelector(".form-control"));
        this.filterItems = this.filterItems;
        this.dataContener = document.querySelector(".contentHolder");
        this.contHolder = document.querySelector(".race");
        this.input.addEventListener("input", this.filterData.bind(this));
        this.btn = document.querySelector(".butn");
    }
    filterData() {
        this.dataContener.innerHTML = "";
        const inputText = this.input.value.toLowerCase();
        if (inputText) {
            fetch("car.json")
                .then((response) => {
                return response.json();
            })
                .then((data) => {
                this.filterItems = data.filter((item) => {
                    return item.name.toLowerCase().includes(inputText);
                });
                if (inputText && this.filterItems) {
                    this.filterItems.map((item) => {
                        const domElement = document.createElement("div");
                        domElement.classList.add("car");
                        const front = document.createElement("div");
                        front.classList.add("front");
                        const back = document.createElement("div");
                        back.classList.add("back");
                        domElement.appendChild(front);
                        domElement.appendChild(back);
                        front.innerHTML = `${item.name} <img src="${item.picture}">`;
                        back.innerHTML = `${item.brzina} km ${item.opis} <img src="${item.picture}">`;
                        this.dataContener.appendChild(domElement);
                        this.choseDriver(domElement, item);
                    });
                }
            })
                .catch((error) => {
                console.error(error);
            });
        }
    }
    choseDriver(_domElement, item) {
        _domElement.addEventListener("click", () => {
            this.btn.setAttribute("style", " visibility: visible;");
            this.dataContener.innerHTML = "";
            const carImg = document.createElement("img");
            carImg.src = item.picture;
            const cars = document.createElement("p");
            cars.style.transition = "1s";
            cars.classList.add("raceCar");
            cars.appendChild(carImg);
            this.contHolder.setAttribute("style", " visibility: visible;");
            this.contHolder.appendChild(cars);
            this.input.value = "";
            if (this.contHolder.children.length === 6) {
                document.getElementById("notification").style.display = "block";
                setTimeout(() => {
                    document.getElementById("notification").style.display = "none";
                }, 1500);
                cars.remove();
            }
            this.removeCar(cars);
            if (this.contHolder.children.length < 0) {
                this.contHolder.style.display = "none";
                this.contHolder.style.transition = "0s";
            }
        });
    }
    removeCar(cars) {
        const removemvEl = document.createElement("button");
        removemvEl.innerHTML = "x";
        removemvEl.classList.add("buttonn");
        cars.appendChild(removemvEl);
        removemvEl.addEventListener("click", () => {
            cars.remove();
            if (this.contHolder.children.length === 0) {
                this.contHolder.style.visibility = "hidden";
                this.contHolder.style.transition = "0s";
                this.btn.style.visibility = "hidden";
            }
        });
    }
}
class startRace extends inputFilter {
    constructor() {
        super();
        this.namec = document.querySelector(".btnn");
        this.startRace();
    }
    startRace() {
        this.btn.addEventListener("click", () => {
            this.btn.innerHTML = "Pocnite novu trku";
            this.input.placeholder =
                "Posele pocetka trke nije moguce pretrazivati nove vozace!";
            this.input.classList.add("is-invalid");
            this.namec.style.visibility = "hidden";
        });
    }
}
const inpt = new startRace();
const nameR = new nameRace(document.querySelector(".btnn"));
//# sourceMappingURL=script.js.map