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

    /*********************** PHOTOGRAPHER PAGE HEADER **************************/

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

    /*********************** PHOTOGRAPHER CONTACT MODAL *************************/ 

        const modalHeader = document.getElementById('contactHeader')
        const modalName = document.createElement('h2')
        modalName.textContent = artist.name
        modalHeader.appendChild(modalName)

        const submit = document.getElementById('submit')
        submit.addEventListener('click', (e) =>{
            e.preventDefault()
        
            const formInput = {
                firstName: document.getElementById('prenom').value,
                lastName: document.getElementById('nom').value,
                email: document.getElementById('email').value,
                message: document.getElementById('message').value,
              }
              
              console.log(formInput)
              
            closeModal()
        })

    /*************************************************************************/

    /*********************** PHOTOGRAPHER PAGE MAIN *************************/    

        /*** MEDIA ARRAY SORTING FUNCTION ***/

            /* DATE SORTING */
            function sortByDates(a,b){
                return new Date(a.date).valueOf() - new Date(b.date).valueOf()
            };

            /* ALPHABETICAL SORTING */ 
            function sortByLetters(a,b){
                if(a.title.toLowerCase() < b.title.toLowerCase()
                )return -1
            };

            /* LIKE SORTING */
            function sortByLikes(a,b){
                return b.likes - a.likes
            };

            photographerArt.sort(sortByLikes)                                       //sort by like first because it is the 1st option on the select

        /*** SWITCH CASE ***/

            const options = document.getElementById('sort')
            options.addEventListener('change', () => {

                const option = document.getElementById('sort').value
                switch(option){

                    /* LIKE SORTING */
                    case("popularity"):                                                                             
                        photographerArt.sort(sortByLikes)
                    break;

                    /* ALPHABETICAL SORTING */    
                    case("title"):                                                                          
                        photographerArt.sort(sortByLetters)
                    break;
                    
                    /* DATE SORTING */
                    case("date"):                                                                       
                        photographerArt.sort(sortByDates)
                    break;
                }
                console.log(photographerArt)
            })
            
        /*** MEDIA TEMPLATE ***/

            photographerArt.forEach(media => {
                console.log(media)      

                const dom = document.getElementById('photographerMedia')
                const mediaArt = `assets/Medias/${artist.name}/${media.image}`;                        //récupération des medias
                let mediaTitle = media.image
                console.log(media.image)
                const divCard = document.createElement('div')
                divCard.setAttribute('id', 'artCard')

                const img = document.createElement( 'img' );
                img.setAttribute('src', mediaArt)
                img.setAttribute('alt', media.title)

                const h2 = document.createElement( 'h2' );
                h2.textContent = media.title;

                
                const p = document.createElement('p')
                p.textContent = media.likes
                const likeIcon = document.createElement('img')
                likeIcon.setAttribute('src',"assets/icons/heart-solid.svg")
                
                dom.appendChild(divCard)
                divCard.appendChild(img)
                divCard.appendChild(h2)
                divCard.appendChild(p)
                divCard.appendChild(likeIcon)

            });

        /*** STICKY FOOTER ***/   
            
            /** LIKE CALCUL **/

                /** Put likes in one array **/
                const likes = []
                photographerArt.forEach(media => {             
                    likes.push(media.likes)                 
                }); 
                /** Addition of all likes **/
                let sum = 0
                likes.forEach(num =>{
                    sum += num;
                })
                
            /** FOOTER **/

                const footer = document.getElementById('footer')

                const divF = document.createElement('div')
                divF.setAttribute('id', 'divFooter')
                
                const divLike = document.createElement('div')
                divLike.setAttribute('class','divLike')
                const likesDom = document.createElement('p')
                likesDom.textContent = sum
                likesDom.setAttribute('class','likesNumber')
                const likeIcon = document.createElement('img')
                likeIcon.setAttribute('src',"assets/icons/heart-solid.svg") // font Awesome heart : <i class="fa-solid fa-heart"></i>

                const priceDom = document.createElement('p')
                priceDom.textContent = artist.price +'€/jour'
                priceDom.setAttribute('class', 'priceDomFooter')

                footer.appendChild(divF)
                divF.appendChild(divLike)
                divLike.appendChild(likesDom)
                divLike.appendChild(likeIcon)
                divF.appendChild(priceDom)
        /*************************************************************************/        
    return photographer, photographerArt  
}
getPhotographerData()