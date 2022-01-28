// Récupération des données du fichier photographers.json
async function getPhotographer() {
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
  
// display the photographer
async function displayPhotographer(photographer) {
	const photographHeader = document.querySelector(".photograph-header")

	const photographerModel = photographerFactory(photographer)
	const photographerDOM = photographerModel.getPhotographerDOM()
	photographHeader.appendChild(photographerDOM)
}

async function init() {
	const { photographerData } = await getPhotographer()
	displayPhotographer(photographerData)
}
init()