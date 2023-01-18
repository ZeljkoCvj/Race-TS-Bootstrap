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
  close: HTMLDivElement;
  constructor(element: HTMLDivElement) {
    this.element = element;
    this.namec = document.querySelector(".list-group")! as HTMLUListElement;
    this.notify = document.querySelector(".notifi")! as HTMLDivElement;
    this.close = document.querySelector(".ml-2")! as HTMLDivElement;
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
      this.namec.style.visibility = "visible";
    });
  }
  private copyName() {
    let name = document.querySelectorAll(".list-group-item");
    name.forEach((item: any) => {
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
  private dataContener: HTMLDivElement;
  private divEl: HTMLDivElement;
  private filterItems: any;

  constructor() {
    super(document.querySelector(".form-control")! as HTMLInputElement);
    this.filterItems = this.filterItems;
    this.dataContener = document.querySelector(".content")! as HTMLDivElement;
    this.divEl = document.querySelector(
      ".align-self-center"
    )! as HTMLDivElement;
    this.input.addEventListener("input", this.filterData.bind(this));
  }

  private filterData() {
    const inputText = this.input.value.toLowerCase();
    this.dataContener.innerHTML = "";

    fetch("car.json")
      .then((Response) => Response.json())
      .then((data) => {
        this.filterItems = data.filter(
          (item: {
            name: string;
            picture: string;
            brzina: number;
            opis: string;
          }) => item.name.toLowerCase().includes(inputText)
        );
      });

    this.filterItems.map((item: any) => {
      // console.log(item.name);
    });
  }
}

const inpt = new inputFilter();
const nameR = new nameRace(document.querySelector(".btnn")! as HTMLDivElement);
