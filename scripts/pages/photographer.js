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

// Affiche les éléments de la section media
async function displayMedia(medias) {
  const cards = document.querySelector(".cards");
  const id = getUrlId();
  onChangeFilter(medias)
  medias.forEach((media) => {    
    if (media.photographerId === id) {
      const photographerModel = photoFactory(media);
      const photoDOM = photographerModel.getPhotos();
      cards.appendChild(photoDOM);
    }
  });

}

// Affiche la lightbox
function displayLightbox(media) {

  let lightbox = new Lightbox(media)
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

// Fonction de filtrage des photos
function onChangeFilter(medias) {
  let form = document.querySelector('.filter-form')
  form.addEventListener('change', e => {
      const filter = e.target.value
      const article = document.querySelectorAll(".media")

      if (filter === "Date") {
        const sortByDate = Object.values(medias).sort(function(a, b) {
          let nameA = a.date
          let nameB = b.date
          if (nameA < nameB) {
            return -1; //nameA comes first
          }
          if (nameA > nameB) {
            return 1; // nameB comes first
          }
          return 0;  // names must be equal
        });
        article.forEach(article => {
          article.remove()
        })
        displayMedia(sortByDate)
        displaySumOfLikes(sortByDate)
        displayLightbox(sortByDate)
        likeButton()  

      } else if (filter === "Popularité") {
        const sortByLikes = Object.values(medias).sort(function(a, b) {
          let nameA = a.likes
          let nameB = b.likes
          if (nameA > nameB) {
            return -1; 
          }
          if (nameA < nameB) {
            return 1; 
          }
          return 0; 
        }); 
        article.forEach(article => {
          article.remove()
        })
        displayMedia(sortByLikes)
        displaySumOfLikes(sortByLikes)
        displayLightbox(sortByLikes)
        likeButton()  

      } else {
        const sortByTitle = Object.values(medias).sort(function(a, b) {
          let nameA = a.title
          let nameB = b.title
          if (nameA < nameB) {
            return -1;
          }
          if (nameA > nameB) {
            return 1;
          }
          return 0; 
        }); 
        article.forEach(article => {
          article.remove()
        })
        displayMedia(sortByTitle)
        displaySumOfLikes(sortByTitle)
        displayLightbox(sortByTitle)
        likeButton()       
      }
  })
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
