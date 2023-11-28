/**************************************************************************/
/********************* TEMPLATE PHOTOGRAPHER *****************************/
/************************************************************************/

function photographerTemplate(data) {
    const { name, portrait, city, country, tagline, price, id } = data;     //récupération des datas
    const picture = `assets/photographers/${portrait}`;                    //récupération des photos de profil
    
    function getUserCardDOM() {

        const article = document.createElement( 'article' );

        const link = document.createElement('a');
        link.setAttribute('href', `photographer.html?id=${id}`);    //PhotographerId est passé dans l'URL pour récupération des datas sur page du photographe
        link.setAttribute('aria-label', name)

        const img = document.createElement( 'img' );
        img.setAttribute("src", picture);

        const h2 = document.createElement( 'h2' );
        h2.textContent = name;

        article.appendChild(link);
        link.appendChild(h2);                              // h2 est inclus dans le <a></a> comme prévue au meeting
        link.appendChild(img);                            // img est inclus dans le <a></a> comme prévue au meeting
                                                  
        const div = document.createElement('div');

        const h3 = document.createElement('h3');
        h3.textContent = city + ', ' +country

        const h4 = document.createElement('h4')
        h4.textContent = tagline

        const p = document.createElement('p')
        p.textContent = price+'€/jour'

        article.appendChild(div)
        div.appendChild(h3)
        div.appendChild(h4)
        div.appendChild(p)

        return (article);

    }
    return { name, picture, getUserCardDOM}
}