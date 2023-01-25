interface Friend {
  id: number;
  name: string;
}
interface Data {
  speed: number;
  image: string;
}

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

  private getInputValue() {
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
    name.forEach((item) => {
      item.addEventListener("click", () => {
        navigator.clipboard.writeText(item.textContent!);
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
  protected contHolder: HTMLDivElement;
  notification: HTMLDivElement;
  button: HTMLButtonElement;
  carsForRace: Partial<CarResponse>[] = [];

  public filterItems: Partial<CarResponse>[] = [];
  brojac = 0;
  constructor() {
    super(document.querySelector(".form-control")! as HTMLInputElement);
    this.notification = document.querySelector(
      "#notification"
    )! as HTMLDivElement;
    this.dataContener = document.querySelector(
      ".contentHolder"
    )! as HTMLDivElement;
    this.contHolder = document.querySelector(".race")! as HTMLDivElement;
    this.input.addEventListener("input", this.filterData.bind(this));

    this.button = document.querySelector(".butn")! as HTMLButtonElement;
  }

  public filterData() {
    this.dataContener.innerHTML = "";

    const inputText = this.input.value.toLowerCase();

    if (inputText) {
      fetch("car.json")
        .then((response: Response) => {
          return response.json();
        })

        .then((data: Array<Partial<CarResponse>>) => {
          this.filterItems = data.filter((item: Partial<CarResponse>) => {
            return item.name!.toLowerCase().includes(inputText);
          });
          if (inputText && this.filterItems) {
            this.filterItems.map((item: Partial<CarResponse>) => {
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
              this.choseDriver(domElement, item!);
            });
          }
        })
        .catch((error: Error) => {
          console.error(error);
        });
    }
  }

  public choseDriver(domElement: HTMLDivElement, item: Partial<CarResponse>) {
    let cars = document.querySelector(".raceCar")! as HTMLParagraphElement;
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
const nameR = new nameRace(document.querySelector(".btnn")! as HTMLDivElement);
