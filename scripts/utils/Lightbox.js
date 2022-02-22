class Lightbox {  // eslint-disable-line no-unused-vars
  constructor(listElement) {
    this.currentElement = null;
    this.listElement = listElement;
    this.manageEvent();
  }

  show(id) {
    this.currentElement = this.getElementById(id);
    this.display();
  }

  next() {
    let list = this.listElement;

    let index = list.findIndex(
      (element) => element.id === this.currentElement.id
    );
    if (index === list.length - 1) {
      this.currentElement = list[0];
    } else {
      this.currentElement = list[index + 1];
    }

    this.display();
  }

  previous() {
    let list = this.listElement;

    let index = list.findIndex(
      (element) => element.id === this.currentElement.id
    );
    if (index === 0) {
      this.currentElement = list[list.length - 1];
    } else {
      this.currentElement = list[index - 1];
    }

    this.display();
  }

  manageEvent() {
    document.querySelector("#lightbox .next").addEventListener("click", () => {
      this.next();
    });
    document
      .querySelector("#lightbox .previous")
      .addEventListener("click", () => {
        this.previous();
      });
    document.querySelector("#lightbox .close").addEventListener("click", () => {
      this.close();
    });
    const lightbox = document.querySelector("#lightbox");
    lightbox.addEventListener("click", (e) => {
      if (e.target === e.currentTarget) this.close();
    });
    lightbox.addEventListener("keyup", (e) => {
      switch (e.key) {
        case "ArrowRight":
          this.next();
          break;
        case "ArrowLeft":
          this.previous();
          break;
        case "Escape":
          this.close();
          break;
      }
    });
  }

  close() {
    document.querySelector("#lightbox").classList.remove("show");
  }

  getElementById(id) {
    return this.listElement.find((element) => element.id == id);
  }

  display() {
    let photographerId = this.currentElement.photographerId;

    let image = document.querySelector("#lightbox .content .picture");
    let movie = document.querySelector("#lightbox .content .movie");

    if (this.currentElement.image) {
      image.style.display = "block";
      movie.style.display = "none";
      image.src =
        "assets/images/" + photographerId + "/" + this.currentElement.image;
      image.alt = this.currentElement.title;
    } else {
      image.style.display = "none";
      movie.style.display = "block";
      movie.src =
        "assets/images/" + photographerId + "/" + this.currentElement.video;
      movie.setAttribute("controls", "controls");
      movie.ariaLabel = this.currentElement.title;
    }
    document.querySelector("#lightbox").classList.add("show");

    document.querySelector(".title").textContent = this.currentElement.title;
  }
}
