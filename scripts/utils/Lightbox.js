class Lightbox {
    constructor (listElement) {
        this.currentElement = null;
        this.listElement = listElement
        this.manageEvent()
    }

    show(id) {
        
        this.currentElement = this.getElementById(id)
        this.display()

    }

    next() {
        let list = []

        for (let i = 0; i < this.listElement.length; i++) {
            if (this.listElement[i].photographerId === getUrlId()) {
                list.push(this.listElement[i])
            }
        }

        let index = list.findIndex(element => element.id === this.currentElement.id)
        if (index == list.length -1) {
            this.currentElement = list[0]
        } else {
            this.currentElement = list[index+1]
        }


        this.display()
    }

    previous() {
        let list = []

        for (let i = 0; i < this.listElement.length; i++) {
            if (this.listElement[i].photographerId === getUrlId()) {
                list.push(this.listElement[i])
            }
        }

        let index = list.findIndex(element => element.id === this.currentElement.id)
        if (index == 0) {
            this.currentElement = list[list.length - 1]
        } else {
            this.currentElement = list[index-1]
        }


        this.display()

    }

    manageEvent() {
        document.querySelector("#lightbox .next").addEventListener("click", () => {
            this.next()
        })
        document.querySelector("#lightbox .previous").addEventListener("click", () => {
            this.previous()
        })
        document.querySelector("#lightbox .close").addEventListener("click", () => {
            this.close()
        })
        document.querySelector("#lightbox").addEventListener("click", (e) => {
            if (e.target === e.currentTarget)
            this.close()
        })
        document.addEventListener("keyup", (e) => {
            switch(e.key) {
                case "ArrowRight":
                    this.next()
                    break
                case "ArrowLeft":
                    this.previous()
                    break
                case "Escape":
                    this.close()
                    break
            }
        })
    }

    close() {
        document.querySelector("#lightbox").classList.remove("show")
    }

    getElementById(id) {
        return this.listElement.find(element => element.id == id)
    }

    display() {
        let photographerId = this.currentElement.photographerId
        let name = ""
		if(photographerId === 82) {
			name = "Tracy/"
		} else if (photographerId === 243) {
			name = "Mimi/"
		} else if (photographerId === 930) {
			name = "Ellie-Rose/"
		} else if (photographerId === 527) {
			name = "Nabeel/"
		} else if (photographerId === 925) {
			name = "Rhode/"
		} else if (photographerId === 195) {
			name = "Marcel/"
		}

        let image = document.querySelector("#lightbox .content .picture")
        let movie = document.querySelector("#lightbox .content .movie")

        if (this.currentElement.image) {
            image.style.display = "block"
            movie.style.display = "none"
            image.src = "assets/images/" + name + this.currentElement.image
            image.alt = this.currentElement.title
        } else {
            image.style.display = "none"
            movie.style.display = "block"
            movie.src = "assets/images/" + name + this.currentElement.video
            movie.setAttribute("controls", "controls")
            movie.ariaLabel = this.currentElement.title
        }
        document.querySelector('#lightbox').classList.add("show")

        document.querySelector(".title").textContent = this.currentElement.title
    }
}