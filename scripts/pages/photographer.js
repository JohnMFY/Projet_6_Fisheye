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

    /*******************************************************************/

    /*********************** PHOTOGRAPHER PAGE MAIN *************************/    

        /*** MEDIA ARRAY SORTING ***/
        function onChangeEvent(){

            const options = document.getElementById('sort')

            switch(options){

                /* LIKE SORTING */
                case("popularity"):                                                                             
                    function sortByLikes(a,b){
                        return b.likes - a.likes
                    };
                    console.log('Sort by likes : ')
                    console.log( photographerArt.sort(sortByLikes))
                break;

                /* ALPHABETICAL SORTING */    
                case("title"):                                                                          
                    function sortByLetters(a,b){
                        if(a.title.toLowerCase() < b.title.toLowerCase()
                        )return -1
                    };
                    console.log('Sort by alphabet : ')
                    console.log( photographerArt.sort(sortByLetters))
                break;
                
                /* DATE SORTING */
                case("date"):                                                                       
                    function sortByDates(a,b){
                        return new Date(a.date).valueOf() - new Date(b.date).valueOf()
                    };
                    console.log('Sort by dates : ')
                    console.log( photographerArt.sort(sortByDates))
                break;
            }
        }
        
        /*** MEDIA TEMPLATE ***/

/*        function MediaDOM(){

            const article = document.createElement( 'article' );
            const h2 = document.createElement( 'h2' );
            h2.textContent = photographerArt.title;
            <i class="fa-solid fa-heart"></i> //heart icon
        }
*/        
    return photographer, photographerArt  
}
getPhotographerData()