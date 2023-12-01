//Mettre le code JavaScript lié à la page photographer.html

/*********************************************************************/
/****** RECOVERY OF THE PHOTOGRAPHER ID IN THE URL WITH PARAMS ******/
/*******************************************************************/

 async function getPhotographerData(){

    const photographerId = window.location.search
    const UrlParams = new URLSearchParams(photographerId)
    const id = UrlParams.get("id")
    
        const Data = await fetch(`../../data/photographers.json`);
        const photographersData = await Data.json(); //datas des photographes en JSON
 
        const photographer = photographersData.photographers.filter(function(data){
            return data.id == id
        });

        const photographerArt = photographersData.media.filter(function(data){
            return data.photographerId == id
        })

        console.log(photographer[0])
        console.log(photographerArt)

            const artist = photographer[0]
            const picture = `assets/photographers/${artist.portrait}`; 
            
            const photographHeaderDom = document.querySelector(".photograph-header")

            const div = document.createElement('div')

            const h2 = document.createElement('h2')
            h2.textContent = artist.name

            const h3 = document.createElement('h3');
            h3.textContent = artist.city + ', ' + artist.country
    
            const p = document.createElement('p')
            p.textContent = artist.tagline

            const img = document.createElement( 'img' );
            img.setAttribute("src", picture);
            img.setAttribute('aria-label', artist.name + ' profile picture') 

            photographHeaderDom.appendChild(div)
            div.appendChild(h2)
            div.appendChild(h3)
            div.appendChild(p)
            photographHeaderDom.appendChild(img)
    
        return photographer, photographerArt
    }
    getPhotographerData()

    