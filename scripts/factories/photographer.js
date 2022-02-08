function photographerFactory(data) {
	const { name, portrait, city, country, tagline, price, id } = data
	const picture = `assets/photographers/${portrait}`
	const link = `photographer.html?id=${id}`

	function getUserCardDOM() {
		const article = document.createElement( "article" )
		const img = document.createElement( "img" )
		const h2 = document.createElement( "h2" )
		const location = document.createElement("p")
		const pTagline = document.createElement("p")
		const pPrice = document.createElement("p")
		const a = document.createElement("a")
		const alt = "photo de profil de " + name

		img.setAttribute("src", picture)
		img.setAttribute("alt", alt)
		article.setAttribute("class", "photographer")
		location.setAttribute("class", "location")
		pTagline.setAttribute("class", "tagline")
		pPrice.setAttribute("class", "price")
		a.setAttribute("href", link)

		h2.textContent = name
		location.textContent = city + ", " + country
		pTagline.textContent = tagline
		pPrice.textContent = price + "€/jour"

		article.appendChild(img)
		article.appendChild(a)
		a.appendChild(img)
		article.appendChild(h2)
		article.appendChild(location)
		article.appendChild(pTagline)
		article.appendChild(pPrice)

		return (article)
	}

	function getPhotographerDOM() {

		const info = document.createElement( "div" )
		const img = document.createElement( "img" )
		const h1 = document.createElement( "h1" )
		const location = document.createElement("p")
		const pTagline = document.createElement("p")
		const alt = "photo de profil de " + name
		const pPrice = document.createElement("p")

		img.setAttribute("src", picture)
		img.setAttribute("alt", alt)
		info.setAttribute("class", "info")
		location.setAttribute("class", "location")
		pTagline.setAttribute("class", "tagline")
		h1.setAttribute("class", "name")
		pPrice.setAttribute("class", "price")

		h1.textContent = name
		location.textContent = city + ", " + country
		pTagline.textContent = tagline
		pPrice.textContent = price + "€/jour"

		info.appendChild(h1)
		info.appendChild(location)
		info.appendChild(pTagline)

		return {info, img, pPrice}

	}	

	return { name, portrait, city, country, tagline, price, id, getUserCardDOM, getPhotographerDOM }
}

