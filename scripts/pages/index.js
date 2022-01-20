    //Récupération des données du fichier photographers.json
    fetch("./data/photographers.json")
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        appendData(data.photographers);
    })
    .catch(function (err) {
        console.log(err)
    });

    //Création du contenu html à partir des données JSON
    function appendData(data) {
        const photographersSection = document.querySelector(".photographer_section");
        for (let i = 0; i < data.length; i++) {
            const article = document.createElement( 'article' );

            const img = document.createElement( 'img' );
            img.setAttribute("src", "./assets/photographers/" + data[i].portrait);

            const h2 = document.createElement( 'h2' );
            h2.textContent = data[i].name;

            const location = document.createElement('p');
            location.textContent = data[i].city + ", " + data[i].country;
            location.setAttribute("class", "location");

            const tagline = document.createElement('p');
            tagline.textContent = data[i].tagline;
            tagline.setAttribute("class", "tagline");

            const price = document.createElement('p');
            price.textContent = data[i].price + "€/jour";
            price.setAttribute("class", "price");

            article.appendChild(img);
            article.appendChild(h2);
            article.appendChild(location);
            article.appendChild(tagline);
            article.appendChild(price);
            photographersSection.appendChild(article);
        }
        return data;
    }
    
    // async function getPhotographers() {
    //     // Penser à remplacer par les données récupérées dans le json
    //     const photographers = [
    //         {
    //             "name": "Ma data test",
    //             "id": 1,
    //             "city": "Paris",
    //             "country": "France",
    //             "tagline": "Ceci est ma data test",
    //             "price": 400,
    //             "portrait": "account.png"
    //         },
    //         {
    //             "name": "Autre data test",
    //             "id": 2,
    //             "city": "Londres",
    //             "country": "UK",
    //             "tagline": "Ceci est ma data test 2",
    //             "price": 500,
    //             "portrait": "account.png"
    //         },
    //     ]
    //     // et bien retourner le tableau photographers seulement une fois
    //     return ({
    //         photographers: [...photographers, ...photographers, ...photographers]})
    // }

    // async function displayData(photographers) {
    //     const photographersSection = document.querySelector(".photographer_section");

    //     photographers.forEach((photographer) => {
    //         const photographerModel = photographerFactory(photographer);
    //         const userCardDOM = photographerModel.getUserCardDOM();
    //         photographersSection.appendChild(userCardDOM);
    //     });
    // };

    // async function init() {
    //     // Récupère les datas des photographes
    //     const { photographers } = await getPhotographers();
    //     displayData(photographers);
    // };
    
    // init();
    