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

// display the photographer infos
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
    const photographerModel = photographerFactory(photographer);
    const { info, img, pPrice, contactName } = photographerModel.getPhotographerDOM();
    photoHeader.appendChild(info);
    photoHeader.appendChild(img);
    insert.appendChild(pPrice)
    modal.setAttribute("aria-label", "Contact Me " + contactName)
    modal.setAttribute("aria-labelledby", "modalTitle")
    contact.innerHTML = "Contactez-moi <br />" + contactName
  }
}

async function displayMedia(medias) {
  const cards = document.querySelector(".cards");
  const id = getUrlId();

  // medias.sort(media => media.title ).forEach((media) => {
  medias.forEach((media) => {
    if (media.photographerId === id) {
      const photographerModel = photoFactory(media);
      const photoDOM = photographerModel.getPhotos();
      cards.appendChild(photoDOM);
    }
  });

}

function displayLightbox(media) {

  let lightbox = new Lightbox(media)
  document.querySelectorAll(".cards .media .media-content").forEach(media => {
    media.addEventListener("click", (e) => {
      lightbox.show(e.currentTarget.dataset.id)
    })
  })

}

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


async function init() {
  // Récupère les datas des photographes
  const { media, photographers } = await getMedia();

  displayMedia(media);
  displayPhotographer(photographers);
  displaySumOfLikes(media)
  displayLightbox(media)
  likeButton()
  
}

init();
