function photographerFactory(data) {
    const { name, portrait, city, country, tagline, price, id } = data;

    const picture = `assets/photographers/${portrait}`;
    const link = `photographer.html/${id}` ;

    function getUserCardDOM() {
        const article = document.createElement( 'article' );
        const img = document.createElement( 'img' );
        const h2 = document.createElement( 'h2' );
        const location = document.createElement('p');
        const pTagline = document.createElement('p');
        const pPrice = document.createElement('p');
        const a = document.createElement('a');

        img.setAttribute("src", picture);
        article.setAttribute("class", "photographer")
        location.setAttribute("class", "location");
        pTagline.setAttribute("class", "tagline");
        pPrice.setAttribute("class", "price");
        a.setAttribute("href", link)

        h2.textContent = name;
        location.textContent = city + ", " + country;
        pTagline.textContent = tagline;
        pPrice.textContent = price + "€/jour";

        article.appendChild(img);
        article.appendChild(a)
        a.appendChild(img)
        article.appendChild(h2);
        article.appendChild(location);
        article.appendChild(pTagline);
        article.appendChild(pPrice);

        return (article);
    }
    return { name, portrait, city, country, tagline, price, id, getUserCardDOM }
}