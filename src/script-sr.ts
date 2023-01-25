interface CarResponse {
  _id: string;
  index: number;
  guid: string;
  isActive: boolean;
  balance: string;
  picture: string;
  age: number;
  opis: string;
  brzina: number;
  eyeColor: string;
  name: string;
  gender: string;
  company: string;
  email: string;
  phone: string;
  address: string;
  about: string;
  registered: string;
  latitude: number;
  longitude: number;
  tags: string[];
  friends: Friend[];
  greeting: string;
  favoriteFruit: string;
}
let carImage: HTMLImageElement[] = [];
let brzina: number[] = [];

class DomManipulation {
  namec: HTMLDivElement;
  input: HTMLInputElement;
  button: HTMLButtonElement;
  carsForRace: Partial<CarResponse>[];

  protected contHolder: HTMLDivElement;
  item: Partial<CarResponse>;
  domel: HTMLDivElement;

  brojac = 0;
  constructor(carsForRace: Partial<CarResponse>[], item: Partial<CarResponse>) {
    this.item = item;
    this.carsForRace = carsForRace;
    this.input = document.querySelector(".form-control")! as HTMLInputElement;
    this.namec = document.querySelector(".btnn")! as HTMLDivElement;
    this.contHolder = document.querySelector(".race")! as HTMLDivElement;
    this.domel = document.querySelector(".contentHolder")! as HTMLDivElement;
    this.button = document.querySelector(".butn")! as HTMLButtonElement;

    this.elementManipulation();
    this.maxNumberOfDrivers();
    this.race();
  }

  private elementManipulation() {
    this.namec.style.visibility = "hidden";
  }

  public race() {
    this.button.style.visibility = "visible";
    this.contHolder.style.visibility = "visible";
    const carImg = document.createElement("img")! as HTMLImageElement;

    carImg.src = this.item.picture!;
    let cars = document.createElement("p");
    carImage.push(carImg);
    brzina.push(this.item.brzina!);
    cars.style.transition = "1s";
    cars.classList.add("raceCar");
    cars.appendChild(carImg);
    this.contHolder.appendChild(cars);
    this.domel.innerHTML = "";
    const targetDistance = this.domel.offsetWidth - 158;
    this.removeCar(cars);

    return { carImg, targetDistance };
  }

  public removeCar(cars: HTMLParagraphElement) {
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

  private maxNumberOfDrivers() {
    if (this.contHolder.children.length === 6) {
      document.getElementById("notification")!.style.display = "block";

      setTimeout(() => {
        document.getElementById("notification")!.style.display = "none";
      }, 1500);
    }

    if (this.contHolder.children.length < 0) {
      this.contHolder.style.display = "none";
      this.contHolder.style.transition = "0s";
    }
  }
}

class startRacee {
  niz: number[] = [];
  private list1: HTMLPictureElement[];
  private list2: number[];
  button: HTMLButtonElement;
  domel: HTMLDivElement;
  carHolder: HTMLDivElement;
  input: HTMLInputElement;

  brojac = 0;

  constructor(list1: HTMLParagraphElement[], list2: number[]) {
    this.list1 = list1;
    this.list2 = list2;
    this.button = document.querySelector(".butn")! as HTMLButtonElement;
    this.domel = document.querySelector(".contentHolder")! as HTMLDivElement;
    this.carHolder = document.querySelector(".race")! as HTMLDivElement;
    this.input = document.querySelector(".form-control")! as HTMLInputElement;

    this.button.addEventListener("click", this.startRace.bind(this));
  }
  private startRace() {
    this.input.placeholder =
      "Posele pocetka trke nije moguce pretrazivati nove vozace!";
    this.input.disabled = true;
    this.input.classList.add("is-invalid");
    this.brojac++;

    for (let i = 0; i < this.list1.length; i++) {
      let startTime: number;

      const moveRight = (timestamp: number) => {
        const targetDistance = this.domel.offsetWidth - 158;
        if (!startTime) startTime = timestamp;
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
            } else if (this.niz[i] === min) {
              this.list1[i].classList.add("second");
            } else {
              this.list1[i].classList.add("third");
            }
          }
        }
        if (distance < targetDistance) {
          requestAnimationFrame(moveRight);
          this.button.style.visibility = "hidden";
        } else {
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
