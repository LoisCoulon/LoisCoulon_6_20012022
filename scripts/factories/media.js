function photoFactory(data) {  // eslint-disable-line no-unused-vars
	const { title, photographerId, image, likes, date, price, id, video } = data
	
	function getPhotos() {

		const article = document.createElement('article')
		const h2 = document.createElement('h2')
		const div = document.createElement('div')
		const nbLike = document.createElement('span')
		const heart = document.createElement('em')
		const like = document.createElement("div")

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

		if (image) {
			const img = document.createElement('img')
			img.setAttribute("src", picture)
			img.setAttribute("alt", title)
			img.setAttribute("data-id", id)
			img.setAttribute("class", "media-content")
			article.appendChild(img)
		} else {
			const vid = document.createElement('video')
			const track = document.createElement('track')
			const source = document.createElement('source')
			vid.setAttribute("alt", title)
			vid.setAttribute("class", "media-content")
			source.setAttribute("src", picture)
			source.setAttribute("type", "video/mp4")
			track.setAttribute("kind", "subtitles")
			track.setAttribute("src", "")
			vid.setAttribute("data-id", id)
			vid.appendChild(track)
			vid.appendChild(source)
			article.appendChild(vid)
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

	return { title, photographerId, image, likes, date, price, id, getPhotos }
}