// // Récupération des données du fichier photographers.json
// async function getPhotographer() {
// 	return fetch("./data/photographers.json")
// 		.then(function (response) {
// 			return response.json()
// 		})
// 		.then(function (data) {
// 			return data
// 		})
// 		.catch(function (err) {
// 			console.log(err)
// 		})
// }
  
// // display the photographer infos
// async function displayPhotographer(photographer) {
// 	const cards = document.querySelector(".cards")

// 	const photographerModel = photographerFactory(photographer)
// 	const photographerDOM = photographerModel.getPhotographerDOM()
// 	cards.appendChild(photographerDOM)
// }

// //display the photos 
// async function displayMedia(media) {
// 	const cards = document.querySelector(".cards")

// 	media.foreach((photo) => {
// 		const mediaModel = photoFactory(photo)
// 		const photoDOM = mediaModel.getPhotos()
// 		cards.appendChild(photoDOM)
// 	})
// }


// async function init() {
// 	const { photographerData } = await getPhotographer()
// 	displayPhotographer(photographerData)
// 	displayMedia(photographerData)
// }
// init()

// Récupération des données du fichier photographers.json
async function getMedia() {
	return fetch("./data/photographers.json")
		.then(function (response) {
			return response.json()
		})
		.then(function (data) {
			console.log(data)
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

	displayMedia(media) 
}

init()
