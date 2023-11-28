function photographerTemplate(data) {
    const { name, portrait, city, country, tagline, price, id } = data;

    const picture = `assets/photographers/${portrait}`;
    const Name = `${name}`;
    
    function getUserCardDOM() {

        const article = document.createElement( 'article' );
        const link = document.createElement('a');
        link.setAttribute('href', `photographer.html?id=${id}`);
        link.setAttribute('aria-label', Name)
        const img = document.createElement( 'img' );
        img.setAttribute("src", picture);
        const h2 = document.createElement( 'h2' );
        h2.textContent = name;
        article.appendChild(link);
        link.appendChild(img);
        link.appendChild(h2);
        
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