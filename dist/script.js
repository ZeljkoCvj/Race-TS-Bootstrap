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
        this.carsForRace = [];
        this.filterItems = [];
        this.brojac = 0;
        this.notification = document.querySelector("#notification");
        this.dataContener = document.querySelector(".contentHolder");
        this.contHolder = document.querySelector(".race");
        this.input.addEventListener("input", this.filterData.bind(this));
        this.button = document.querySelector(".butn");
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
                        let domElement = document.createElement("div");
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
    choseDriver(domElement, item) {
        let cars = document.querySelector(".raceCar");
        domElement.addEventListener("click", () => {
            this.brojac++;
            this.carsForRace.push(item);
            new DomManipulation(filter.carsForRace, item);
            if (this.brojac > 3) {
                this.notification.style.display = "block";
                setTimeout(() => {
                    this.notification.style.display = "none";
                }, 2000);
                cars.remove();
            }
            this.input.value = "";
        });
    }
}
const filter = new inputFilter();
const nameR = new nameRace(document.querySelector(".btnn"));
//# sourceMappingURL=script.js.map