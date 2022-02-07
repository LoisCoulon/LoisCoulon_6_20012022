// Récupération des données du fichier photographers.json
async function getMedia() {
	return fetch("./data/photographers.json")
		.then(function (response) {
			return response.json()
		})
		.then(function (data) {
			return data
		})
		.catch(function (err) {
			console.log(err)
		})
}

// Récupère l'id liée à l'url
function getUrlId() {
	const queryString = window.location.search
	const urlParams = new URLSearchParams(queryString);
	const urlId = urlParams.get('id');
	return urlId
}

// display the photographer infos
async function displayPhotographer(photographers) {
	const photoHeader = document.querySelector(".photograph-header")

	photographers.forEach((photographer) => {
		const photographerModel = photographerFactory(photographer)
		const photographerDOM = photographerModel.getPhotographerDOM()
		photoHeader.appendChild(photographerDOM)
	})
	
}


async function displayMedia(medias) {
	const cards = document.querySelector(".cards")

	medias.forEach((media) => {
		const photographerModel = photoFactory(media)
		const photoDOM = photographerModel.getPhotos()
		cards.appendChild(photoDOM)
	})
}

async function init() {
	// Récupère les datas des photographes
	const { media } = await getMedia()
	const {photographers} = await getMedia()

	displayMedia(media) 
	displayPhotographer(photographers)
}

init()
