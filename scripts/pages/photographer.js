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
  const totalLikes = document.querySelector(".total-likes p");
  let likes = 0;

  medias.forEach(function (media) {
    likes += media.likes;
  });
  totalLikes.textContent = likes;
}

// Affiche les éléments du photographe
async function displayPhotographer(photographers) {
  const photoHeader = document.querySelector(".photograph-header");
  const insert = document.querySelector(".insert");
  const contact = document.getElementById("modalTitle");
  const modal = document.querySelector(".modal");
  const photographerModel = photographerFactory(photographers); // eslint-disable-line no-undef
  const { info, img, pPrice } = photographerModel.getPhotographerDOM();

  photoHeader.appendChild(info);
  photoHeader.appendChild(img);
  insert.appendChild(pPrice);
  modal.setAttribute("aria-label", "Contact Me " + photographers.name);
  modal.setAttribute("aria-labelledby", "modalTitle");
  contact.innerHTML = "Contactez-moi <br />" + photographers.name;
}

// Affiche les éléments de la section media
async function displayMedia(medias) {
  const cards = document.querySelector(".cards");
  medias.forEach((media) => {
    const photographerModel = mediaFactory(media); // eslint-disable-line no-undef
    const mediaDOM = photographerModel.getMediaDOM();
    cards.appendChild(mediaDOM);
  });
}

// Affiche la lightbox
function displayLightbox(media) {
  let lightbox = new Lightbox(media); // eslint-disable-line no-undef
  document.querySelectorAll(".cards .media .media-content").forEach((media) => {
    media.addEventListener("click", (e) => {
      lightbox.show(e.currentTarget.dataset.id);
    });
  });
}

// fonction de like/dislike des photos
function likeButton() {
  const hearts = document.querySelectorAll(".like .fas");
  const totalLike = document.querySelector(".total-likes p");
  let totalCount = Number(totalLike.textContent);

  hearts.forEach((heart) => {
    heart.addEventListener("click", function () {
      const like = heart.previousSibling;
      let countLike = Number(like.textContent);

      if (heart.classList.contains("liked")) {
        heart.classList.remove("liked");
        countLike -= 1;
        totalCount -= 1;
        totalLike.textContent = totalCount;
        like.textContent = countLike;
      } else {
        heart.classList.add("liked");
        countLike += 1;
        totalCount += 1;
        totalLike.textContent = totalCount;
        like.textContent = countLike;
      }
    });
  });
}

// Tri les photos de la date la plus récente à la plus ancienne
const sortByDate = (a, b) => {
  let nameA = a.date;
  let nameB = b.date;
  return nameB.localeCompare(nameA);
};

// Tri les photos de la plus likée à la moins likée
const sortByLikes = (a, b) => {
  let nameA = a.likes;
  let nameB = b.likes;
  return nameB - nameA;
};

// Tri les photos par ordre alphabétique des titres
const sortByTitle = (a, b) => {
  let nameA = a.title;
  let nameB = b.title;
  return nameA.localeCompare(nameB);
};

// Fonction de filtrage des photos
function onChangeFilter(medias) {
  let form = document.querySelector(".custom-options");
  form.addEventListener("click", (e) => {
    const filter = e.target.textContent;
    const article = document.querySelectorAll(".media");
    let sortFunction;
    if (filter === "Date") {
      sortFunction = sortByDate;
    } else if (filter === "Popularité") {
      sortFunction = sortByLikes;
    } else if (filter === "Titre") {
      sortFunction = sortByTitle;
    } else {
      console.error();
    }

    const sortedMedia = medias.sort(sortFunction);

    article.forEach((article) => {
      article.remove();
    });

    displayMedia(sortedMedia);
    displaySumOfLikes(sortedMedia);
    displayLightbox(sortedMedia);
    likeButton();
  });
}

//Gestion de la listbox de tri
document
  .querySelector(".select-wrapper")
  .addEventListener("click", function (e) {
    e.preventDefault();
    this.querySelector(".select").classList.toggle("open");
  });
for (const option of document.querySelectorAll(".custom-option")) {
  option.addEventListener("click", function () {
    if (!this.classList.contains("selected")) {
      this.parentNode
        .querySelector(".custom-option.selected")
        .setAttribute("aria-selected", "false");
      this.parentNode
        .querySelector(".custom-option.selected")
        .classList.remove("selected");
      this.classList.add("selected");
      this.setAttribute("aria-selected", "true");
      this.closest(".select").querySelector(
        ".select__trigger span"
      ).textContent = this.textContent;
    }
  });
}
window.addEventListener("click", function (e) {
  const select = document.querySelector(".select");
  if (!select.contains(e.target)) {
    select.classList.remove("open");
  }
});

document
  .querySelector(".select-wrapper")
  .addEventListener("click", function () {
    this.querySelector(".select").classList.toggle("open");
  });
for (const dropdown of document.querySelectorAll(".select-wrapper")) {
  dropdown.addEventListener("click", function () {
    this.querySelector(".select").classList.toggle("open");
  });
}

window.addEventListener("click", function (e) {
  const select = document.querySelector(".select");
  if (!select.contains(e.target)) {
    select.classList.remove("open");
  }
});

window.addEventListener("click", function (e) {
  for (const select of document.querySelectorAll(".select")) {
    if (!select.contains(e.target)) {
      select.classList.remove("open");
    }
  }
});

async function init() {
  // Récupère les datas des photographes
  const { media, photographers } = await getMedia();
  const id = getUrlId();

  // On récupère le photographe à afficher sur la page
  const photographer = photographers.find((element) => element.id === id);

  // On récupère les médias à afficher sur la page
  const mediaFiltered = media.filter(
    (element) => element.photographerId === id
  );

  //On filtre l'ordre d'apparition des médias par défaut
  const filter = document.querySelector(".select__trigger span");

  if (filter.textContent === "Popularité") {
    mediaFiltered.sort(sortByLikes);
  } else if (filter.textContent === "Date") {
    mediaFiltered.sort(sortByDate);
  } else {
    mediaFiltered.sort(sortByTitle);
  }

  displayMedia(mediaFiltered);
  displayPhotographer(photographer);
  displaySumOfLikes(mediaFiltered);
  displayLightbox(mediaFiltered);
  likeButton();
  onChangeFilter(mediaFiltered);
}

init();
