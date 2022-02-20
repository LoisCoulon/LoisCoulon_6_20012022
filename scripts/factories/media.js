function mediaFactory(data) {  // eslint-disable-line no-unused-vars
	const { title, photographerId, image, likes, date, price, id, video } = data
	
	function getMediaDOM() {

		const article = document.createElement('article')
		const h2 = document.createElement('h2')
		const div = document.createElement('div')
		const nbLike = document.createElement('span')
		const heart = document.createElement('em')
		const like = document.createElement("div")
	
		const picture = `assets/images/${photographerId}/${image ? image : video}`

		if (image) {
			const img = new Img( // eslint-disable-line no-undef
				"image",
				picture,
				title,
				id,
				"media-content",
			)
			img.create()
			article.appendChild(img.element)
		} else {
			const vid = new Video( // eslint-disable-line no-undef
				"video",
				picture,
				title,
				id,
				"media-content"
			)
			vid.create()
			article.appendChild(vid.element)
		}
		
		heart.setAttribute("class", "fas fa-heart")
		div.setAttribute("class", "card-info")
		like.setAttribute("class", "like")
		nbLike.setAttribute("class", "nb-like")
		article.setAttribute("class", "media")
		nbLike.setAttribute("role", "text")
		nbLike.setAttribute("aria-label", "nombre de likes")
		heart.setAttribute("aria-label", "cliquer pour liker la photo")

		h2.textContent = title
		nbLike.textContent = likes

		article.appendChild(div)
		div.appendChild(h2)
		div.appendChild(like)
		like.appendChild(nbLike)
		like.appendChild(heart)

		return article 

	}

	return { title, photographerId, image, likes, date, price, id, getMediaDOM }
}