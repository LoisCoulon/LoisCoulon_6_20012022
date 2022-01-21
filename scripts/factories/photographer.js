function photographerFactory(data) {
    const { name, portrait, city, country, tagline, price } = data;

    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        const article = document.createElement( 'article' );
        const img = document.createElement( 'img' );
        const h2 = document.createElement( 'h2' );
        const location = document.createElement('p');
        const pTagline = document.createElement('p');
        const pPrice = document.createElement('p');

        img.setAttribute("src", picture);
        location.setAttribute("class", "location");
        pTagline.setAttribute("class", "tagline");
        pPrice.setAttribute("class", "price");

        h2.textContent = name;
        location.textContent = city + ", " + country;
        pTagline.textContent = tagline;
        pPrice.textContent = price + "€/jour";

        article.appendChild(img);
        article.appendChild(h2);
        article.appendChild(location);
        article.appendChild(pTagline);
        article.appendChild(pPrice);

        return (article);
    }
    return { name, portrait, city, country, tagline, price, getUserCardDOM }
}