function photographerTemplate(data) {
    const { name, portrait } = data;

    const picture = `assets/photographers/${portrait}`;
    const photographerName = `${name}`

    function getUserCardDOM() {

        const article = document.createElement( 'article' );
        const link = document.createElement('a');
        link.setAttribute('href', '#');
        link.setAttribute('aria-label', photographerName)
        const img = document.createElement( 'img' );
        img.setAttribute("src", picture)
        const h2 = document.createElement( 'h2' );
        h2.textContent = name;
        article.appendChild(link);
        link.appendChild(img);
        link.appendChild(h2);
        return (article);

    }
    return { name, picture, getUserCardDOM}
}