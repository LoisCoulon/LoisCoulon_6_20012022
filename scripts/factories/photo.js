function photoFactory(data) {
	const { title, photographerId, image, likes, date, price, id } = data
	
	function getPhotos() {

		const article = document.createElement('article')
		const img = document.createElement('img')
		const h2 = document.createElement('h2')
		const div = document.createElement('div')
		const nbLike = document.createElement('span')
		const heart = document.createElement('i')

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

	return { title, photographerId, image, likes, date, price, id, getPhotos }
}