class Img { 
    constructor(type, src, alt, dataId, classname) {
        this.type = type
        this.src = src
        this.alt = alt
        this.dataId = dataId
        this.classname = classname
        this.create(this.element)
    }
    create() {
        this.element = document.createElement('img')
        this.element.setAttribute('src', this.src)
        this.element.setAttribute("alt", this.alt)
        this.element.setAttribute("data-id", this.dataId)
        this.element.setAttribute("class", this.classname)
        return this.element
    }
 }