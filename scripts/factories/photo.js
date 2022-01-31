function photoFactory(data) {
	const { title, photographerId, image, likes, date, price, id, video } = data
	
	function getPhotos() {

		const article = document.createElement('article')
		const img = document.createElement('img')
		const h2 = document.createElement('h2')
		const div = document.createElement('div')
		const nbLike = document.createElement('span')
		const heart = document.createElement('i')

		let name = ""
		if(photographerId === 82) {
			name = "Tracy"
		} else if (photographerId === 243) {
			name = "Mimi"
		} else if (photographerId === 930) {
			name = "Ellie-Rose"
		} else if (photographerId === 527) {
			name = "Nabeel"
		} else if (photographerId === 925) {
			name = "Rhode"
		} else if (photographerId === 195) {
			name = "Marcel"
		}
	
		const picture = `assets/images/${name}/${image ? image : video}`

		img.setAttribute("src", picture)
		img.setAttribute("alt", title)
		heart.setAttribute("class", "fas fa-heart")

		h2.textContent = title
		nbLike.textContent = likes

		article.appendChild(img)
		article.appendChild(h2)
		article.appendChild(div)
		div.appendChild(nbLike)
		div.appendChild(heart)

		return article		

	}

	return { title, photographerId, image, likes, date, price, id, name, getPhotos }
}