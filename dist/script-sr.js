"use strict";
let carImage = [];
let brzina = [];
class DomManipulation {
    constructor(carsForRace, item) {
        this.brojac = 0;
        this.item = item;
        this.carsForRace = carsForRace;
        this.input = document.querySelector(".form-control");
        this.namec = document.querySelector(".btnn");
        this.contHolder = document.querySelector(".race");
        this.domel = document.querySelector(".contentHolder");
        this.button = document.querySelector(".butn");
        this.elementManipulation();
        this.maxNumberOfDrivers();
        this.race();
    }
    elementManipulation() {
        this.namec.style.visibility = "hidden";
    }
    race() {
        this.button.style.visibility = "visible";
        this.contHolder.style.visibility = "visible";
        const carImg = document.createElement("img");
        carImg.src = this.item.picture;
        let cars = document.createElement("p");
        carImage.push(carImg);
        brzina.push(this.item.brzina);
        cars.style.transition = "1s";
        cars.classList.add("raceCar");
        cars.appendChild(carImg);
        this.contHolder.appendChild(cars);
        this.domel.innerHTML = "";
        const targetDistance = this.domel.offsetWidth - 158;
        this.removeCar(cars);
        return { carImg, targetDistance };
    }
    removeCar(cars) {
        let removeEl = document.createElement("button");
        removeEl.innerHTML = "x";
        removeEl.classList.add("buttonn");
        cars.appendChild(removeEl);
        removeEl.addEventListener("click", () => {
            cars.remove();
            if (this.contHolder.children.length === 0) {
                this.contHolder.style.visibility = "hidden";
                this.contHolder.style.transition = "0s";
                this.button.style.visibility = "hidden";
            }
        });
        this.button.addEventListener("click", () => {
            removeEl.style.display = "none";
        });
    }
    maxNumberOfDrivers() {
        if (this.contHolder.children.length === 6) {
            document.getElementById("notification").style.display = "block";
            setTimeout(() => {
                document.getElementById("notification").style.display = "none";
            }, 1500);
        }
        if (this.contHolder.children.length < 0) {
            this.contHolder.style.display = "none";
            this.contHolder.style.transition = "0s";
        }
    }
}
class startRacee {
    constructor(list1, list2) {
        this.niz = [];
        this.brojac = 0;
        this.list1 = list1;
        this.list2 = list2;
        this.button = document.querySelector(".butn");
        this.domel = document.querySelector(".contentHolder");
        this.carHolder = document.querySelector(".race");
        this.input = document.querySelector(".form-control");
        this.button.addEventListener("click", this.startRace.bind(this));
    }
    startRace() {
        this.input.placeholder =
            "Posele pocetka trke nije moguce pretrazivati nove vozace!";
        this.input.disabled = true;
        this.input.classList.add("is-invalid");
        this.brojac++;
        for (let i = 0; i < this.list1.length; i++) {
            let startTime;
            const moveRight = (timestamp) => {
                const targetDistance = this.domel.offsetWidth - 158;
                if (!startTime)
                    startTime = timestamp;
                const progress = timestamp - startTime;
                const distance = (progress / 1000) * this.list2[i];
                this.list1[i].style.left = `${distance}px`;
                if (distance >= targetDistance) {
                    this.niz.push(this.list2[i]);
                    console.log(this.niz);
                    const max = Math.max(...this.niz);
                    const min = Math.min(...this.niz);
                    for (let i = 0; i < this.niz.length; i++) {
                        if (this.niz[i] === max) {
                            this.list1[i].classList.add("first");
                        }
                        else if (this.niz[i] === min) {
                            this.list1[i].classList.add("second");
                        }
                        else {
                            this.list1[i].classList.add("third");
                        }
                    }
                }
                if (distance < targetDistance) {
                    requestAnimationFrame(moveRight);
                    this.button.style.visibility = "hidden";
                }
                else {
                    this.button.style.visibility = "visible";
                    this.button.innerHTML = "Pocnite novu trku";
                }
                if (this.brojac === 2) {
                    this.carHolder.style.display = "none";
                    location.reload();
                }
            };
            requestAnimationFrame(moveRight);
        }
    }
}
const e = new startRacee(carImage, brzina);
//# sourceMappingURL=script-sr.js.map