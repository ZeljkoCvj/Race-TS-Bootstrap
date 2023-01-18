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
        this.close = document.querySelector(".ml-2");
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
            this.namec.style.visibility = "visible";
        });
    }
    copyName() {
        let name = document.querySelectorAll(".list-group-item");
        name.forEach((item) => {
            item.addEventListener("click", () => {
                navigator.clipboard.writeText(item.textContent);
                this.element.innerHTML = "Imena";
                this.namec.style.visibility = "hidden";
                this.notify.style.visibility = "visible";
                this.close.addEventListener("click", () => {
                    this.notify.style.visibility = "hidden";
                });
                setTimeout(() => {
                    this.notify.style.visibility = "hidden";
                }, 500);
            });
        });
    }
}
class inputFilter extends Validate {
    constructor() {
        super(document.querySelector(".form-control"));
        this.filterItems = this.filterItems;
        this.dataContener = document.querySelector(".content");
        this.divEl = document.querySelector(".align-self-center");
        this.input.addEventListener("input", this.filterData.bind(this));
    }
    filterData() {
        const inputText = this.input.value.toLowerCase();
        this.dataContener.innerHTML = "";
        fetch("car.json")
            .then((Response) => Response.json())
            .then((data) => {
            this.filterItems = data.filter((item) => item.name.toLowerCase().includes(inputText));
        });
        this.filterItems.map((item) => {
            // console.log(item.name);
        });
    }
}
const inpt = new inputFilter();
const nameR = new nameRace(document.querySelector(".btnn"));
//# sourceMappingURL=script.js.map