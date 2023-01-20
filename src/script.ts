interface Car {
  name: string;
  picture: string;
  brzina: number;
  opis: string;
}
class Validate {
  protected input: HTMLInputElement;

  constructor(input: HTMLInputElement) {
    this.input = input;
    this.init();
  }

  private validateInput(inputStr: string): boolean {
    const regex = /^[a-zA-Z\s]+$/;
    return regex.test(inputStr);
  }

  private init() {
    this.input.addEventListener("input", () => {
      const inputStr = this.getInputValue();
      if (this.validateInput(inputStr)) {
        this.input.classList.remove("is-invalid");
        this.input.classList.add("is-valid");
      } else {
        this.input.classList.remove("is-valid");
        this.input.classList.add("is-invalid");
      }
    });
  }

  private getInputValue(): string {
    return this.input.value;
  }
}

class nameRace {
  element: HTMLDivElement;
  namec: HTMLUListElement;
  notify: HTMLDivElement;

  constructor(element: HTMLDivElement) {
    this.element = element;
    this.namec = document.querySelector(".list-group")! as HTMLUListElement;
    this.notify = document.querySelector(".notifi")! as HTMLDivElement;

    this.bindEvents();
    this.copyName();
  }

  private bindEvents() {
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
  private copyName() {
    let name = document.querySelectorAll(".list-group-item");
    name.forEach((item: any) => {
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
  protected dataContener: HTMLDivElement;
  private contHolder: HTMLDivElement;
  private btn: HTMLButtonElement;
  private filterItems: any;

  constructor() {
    super(document.querySelector(".form-control")! as HTMLInputElement);
    this.filterItems = this.filterItems;

    this.dataContener = document.querySelector(
      ".contentHolder"
    )! as HTMLDivElement;
    this.contHolder = document.querySelector(".race")! as HTMLDivElement;
    this.input.addEventListener("input", this.filterData.bind(this));
    this.btn = document.querySelector(".butn")! as HTMLButtonElement;
  }

  public filterData() {
    this.dataContener.innerHTML = "";

    const inputText = this.input.value.toLowerCase();

    if (inputText) {
      fetch("car.json")
        .then((response: Response) => {
          return response.json();
        })
        .then((data: any) => {
          this.filterItems = data.filter((item: Car) => {
            return item.name.toLowerCase().includes(inputText);
          });
          if (inputText && this.filterItems) {
            this.filterItems.map((item: Car) => {
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
        .catch((error: Error) => {
          console.error(error);
        });
    }
  }

  private choseDriver(_domElement: any, item: any) {
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
        document.getElementById("notification")!.style.display = "block";

        setTimeout(() => {
          document.getElementById("notification")!.style.display = "none";
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

  private removeCar(cars: any) {
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
const inpt = new inputFilter();
const nameR = new nameRace(document.querySelector(".btnn")! as HTMLDivElement);
