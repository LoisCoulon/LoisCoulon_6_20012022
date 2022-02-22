function mediaFactory(data) { // eslint-disable-line no-unused-vars
  const { title, photographerId, image, likes, date, price, id, video } = data;

  function getMediaDOM() {
    const article = document.createElement("article");
    const h2 = document.createElement("h2");
    const div = document.createElement("div");
    const nbLike = document.createElement("span");
    const heart = document.createElement("em");
    const like = document.createElement("div");

    const picture = `assets/images/${photographerId}/${image ? image : video}`;

    if (image) {
      const img = new Img("image", picture, title, id, "media-content"); // eslint-disable-line no-undef
      img.create();
      img.element.setAttribute("tabindex", "0")
      article.appendChild(img.element);
    } else {
      const vid = new Video("video", picture, title, id, "media-content"); // eslint-disable-line no-undef
      vid.create();
      vid.element.setAttribute("tabindex", "0")
      article.appendChild(vid.element);
    }

    heart.setAttribute("class", "fas fa-heart");
    div.setAttribute("class", "card-info");
    like.setAttribute("class", "like");
    nbLike.setAttribute("class", "nb-like");
    article.setAttribute("class", "media");
    nbLike.setAttribute("role", "text");
    nbLike.setAttribute("aria-label", "nombre de likes");
    heart.setAttribute("aria-label", "cliquer pour liker la photo");
    article.setAttribute("aria-haspopup", "true");

    h2.textContent = title;
    nbLike.textContent = likes;

    article.appendChild(div);
    div.appendChild(h2);
    div.appendChild(like);
    like.appendChild(nbLike);
    like.appendChild(heart);

    return article;
  }

  return { title, photographerId, image, likes, date, price, id, getMediaDOM };
}
