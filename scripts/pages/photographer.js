// Récupération des données du fichier photographers.json
async function getMedia() {
  return fetch("./data/photographers.json")
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      return data;
    })
    .catch(function (err) {
      console.log(err);
    });
}

// Récupère l'id liée à l'url
function getUrlId() {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const urlId = urlParams.get("id");
  return Number(urlId);
}

//Affiche la somme des likes
function displaySumOfLikes(medias) {
  const totalLikes = document.querySelector(".total-likes p")
  let likes = 0
  const id = getUrlId();

  medias.forEach(function(media) {
    if(media.photographerId === id) {
      likes += media.likes
    }
  })
  totalLikes.textContent = likes
}

// Affiche les éléments du photographe
async function displayPhotographer(photographers) {
  const photoHeader = document.querySelector(".photograph-header");
  const insert = document.querySelector(".insert")
  const contact = document.getElementById("modalTitle")
  const modal = document.querySelector(".modal")

  const id = getUrlId();
  const photographer = photographers.find(
    (photographer) => photographer.id === id
  );
  if (photographer) {
    const photographerModel = photographerFactory(photographer);  // eslint-disable-line no-undef
    const { info, img, pPrice, contactName } = photographerModel.getPhotographerDOM();
    photoHeader.appendChild(info);
    photoHeader.appendChild(img);
    insert.appendChild(pPrice)
    modal.setAttribute("aria-label", "Contact Me " + contactName)
    modal.setAttribute("aria-labelledby", "modalTitle")
    contact.innerHTML = "Contactez-moi <br />" + contactName
  }
}

// Affiche les éléments de la section media
async function displayMedia(medias) {
  const cards = document.querySelector(".cards");
  const id = getUrlId();
  medias.forEach((media) => {    
    if (media.photographerId === id) {
      const photographerModel = mediaFactory(media);  // eslint-disable-line no-undef
      const mediaDOM = photographerModel.getMediaDOM();
      cards.appendChild(mediaDOM);
    }
  });

}

// Affiche la lightbox
function displayLightbox(media) {

  let lightbox = new Lightbox(media)  // eslint-disable-line no-undef
  document.querySelectorAll(".cards .media .media-content").forEach(media => {
    media.addEventListener("click", (e) => {
      lightbox.show(e.currentTarget.dataset.id)
    })
  })

}

// fonction de like/dislike des photos 
function likeButton() {
  const hearts = document.querySelectorAll(".like .fas")
  const totalLike = document.querySelector(".total-likes p")
  let totalCount = Number(totalLike.textContent)

  hearts.forEach(heart => {

    heart.addEventListener("click", function() {
      const like = heart.previousSibling
      let countLike = Number(like.textContent)

      if (heart.classList.contains("liked")) {
        heart.classList.remove("liked")
        countLike -= 1
        totalCount -=1
        totalLike.textContent = totalCount
        like.textContent = countLike
      } else {
        heart.classList.add("liked")
        countLike += 1
        totalCount +=1    
        totalLike.textContent = totalCount
        like.textContent = countLike  
      }
    })
  });  
}

// Tri les photos de la date la plus récente à la plus ancienne
const sortByDate = (a, b) => {
  let nameA = a.date
  let nameB = b.date
  return nameB.localeCompare(nameA)
};

// Tri les photos de la plus likée à la moins likée
const sortByLikes = (a, b) => {
  let nameA = a.likes
  let nameB = b.likes
  return nameB - nameA
}; 

// Tri les photos par ordre alphabétique des titres
const sortByTitle = (a, b) => {
  let nameA = a.title
  let nameB = b.title
  return nameA.localeCompare(nameB)
}; 

// Fonction de filtrage des photos
function onChangeFilter(medias) {
  let form = document.querySelector('.filter-form')
  form.addEventListener('change', e => {
      const filter = e.target.value
      const article = document.querySelectorAll(".media")
      let sortFunction

      if (filter === "Date") {
        sortFunction = sortByDate
      } else if (filter === "Popularité") {
        sortFunction = sortByLikes
      } else {
        sortFunction = sortByTitle
      }

      const sortedMedia = medias.sort(sortFunction)

      article.forEach(article => {
        article.remove()
      })

      displayMedia(sortedMedia)
      displaySumOfLikes(sortedMedia)
      displayLightbox(sortedMedia)
      likeButton()  
  })
}


async function init() {
  // Récupère les datas des photographes
  const { media, photographers } = await getMedia();
  const id = getUrlId()
  const newMedias = []
  const newPhotographers = []

  // On récupère le photographe à afficher sur la page
  for (let index = 0; index < photographers.length; index++) {
    if(photographers[index].id === id) {
      newPhotographers.push(photographers[index])
    }
  }

  // On récupère les médias à afficher sur la page
  const filter = document.getElementById("filter")
  for (let index = 0; index < media.length; index++) {
    if(media[index].photographerId === id) {
      newMedias.push(media[index])
      if(filter.value === "Popularité") {
        newMedias.sort(sortByLikes)
      } else if (filter.value === "Date") {
        newMedias.sort(sortByDate)
      } else {
        newMedias.sort(sortByTitle)
      }
    }
  }


  displayMedia(newMedias);
  displayPhotographer(newPhotographers);
  displaySumOfLikes(newMedias)
  displayLightbox(newMedias)
  likeButton()  
  onChangeFilter(newMedias)
}

init();
