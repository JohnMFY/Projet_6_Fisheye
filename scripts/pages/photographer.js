//Mettre le code JavaScript lié à la page photographer.html

/*********************************************************************/
/****** RECOVERY OF THE PHOTOGRAPHER ID IN THE URL WITH PARAMS ******/
/*******************************************************************/

async function getPhotographerData(){

    const photographerId = window.location.search;
    const UrlParams = new URLSearchParams(photographerId);
    const id = UrlParams.get("id");
    
        const Data = await fetch(`../../data/photographers.json`);
        const photographersData = await Data.json(); //datas des photographes en JSON
 
        const photographer = photographersData.photographers.filter(function(data){
            return data.id == id
        });

        const photographerArt = photographersData.media.filter(function(data){
            return data.photographerId == id
        });

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
        modalName.setAttribute('aria-label', artist.name);
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
                        document.getElementById('photographerMedia').innerHTML="";                                                                            
                        photographerArt.sort(sortByLikes)
                        domInsertion()
                        likeManagment()
                        lightbox()
                    break;

                    /* ALPHABETICAL SORTING */    
                    case("title"):
                        document.getElementById('photographerMedia').innerHTML="";                                                                            
                        photographerArt.sort(sortByLetters)
                        domInsertion()
                        likeManagment()
                        lightbox()
                    break;
                    
                    /* DATE SORTING */
                    case("date"):
                        document.getElementById('photographerMedia').innerHTML="";                                                                        
                        photographerArt.sort(sortByDates)
                        domInsertion()
                        likeManagment()
                        lightbox()
                    break;
                }

            })
            
    /**************************** MEDIA TEMPLATE ***********************************/
        function domInsertion(){   
            photographerArt.forEach(media => {    

                const dom = document.getElementById('photographerMedia')
                const mediaArt = `assets/Medias/${artist.name}/${media.image}`;                        //récupération des medias
                const mediaArtVideo = `assets/Medias/${artist.name}/${media.video}`; 

                let extMedia = mediaArt.split(".");
                let srcMediaType = extMedia[extMedia.length - 1]

                const divCard = document.createElement('div')
                divCard.setAttribute('id', 'artCard')
                
                const mediaContent = document.createElement( 'img' ); 
                mediaContent.setAttribute('src', mediaArt);
                mediaContent.setAttribute('alt', media.title);
                mediaContent.setAttribute('class','picture');
                mediaContent.setAttribute('title', media.title);
                mediaContent.setAttribute('tabindex', '1');
                mediaContent.setAttribute('aria-label', 'closeup view'+ media.title);

                const mediaContentVideo = document.createElement('video');
                mediaContentVideo.setAttribute('src', mediaArtVideo);
                mediaContentVideo.setAttribute('alt', media.title);
                mediaContentVideo.setAttribute('title', media.title);
                mediaContentVideo.setAttribute('class','picture');
                mediaContentVideo.setAttribute('tabindex', '1');
                mediaContentVideo.setAttribute('aria-label', 'closeup view');
                mediaContentVideo.play();
                mediaContentVideo.loop = true; 

                const divTextCard = document.createElement('div')
                divTextCard.setAttribute('id', 'divTextCard')
                const cardTitle = document.createElement( 'p' );
                cardTitle.textContent = media.title;
                cardTitle.setAttribute("class", "cardTitle")

                const divLike = document.createElement('div')
                divLike.setAttribute('id', 'divLike')
                divLike.setAttribute('class', 'likes')
                divLike.setAttribute('aria-label', 'likes')
                const p = document.createElement('p')
                p.textContent = media.likes
                p.setAttribute('class', 'mediaLikes')
                const likeIcon = document.createElement('img')
                likeIcon.setAttribute('src',"assets/icons/heart-solid-red.svg") 
                
                dom.appendChild(divCard)
                if(srcMediaType == 'jpg'){
                    divCard.appendChild(mediaContent)
                }else{
                    divCard.appendChild(mediaContentVideo)
                }
                divCard.appendChild(divTextCard)
                divTextCard.appendChild(cardTitle)
                divTextCard.appendChild(divLike)
                divLike.appendChild(p)
                divLike.appendChild(likeIcon)
            
            }); 
        }  domInsertion() 

    /**************************** LIKE MANAGMENT ***********************************/
        function likeManagment(){
            let likeDiv = document.querySelectorAll('.likes')
            
            likeDiv.forEach(like =>{

                like.addEventListener('click', () =>{

                    let likeNumber = parseInt(like.children[0].innerHTML)
                    let likeP = like.firstChild

                    const totalLikes = document.getElementById('totalLikes')
                    let totalLikesNum = parseInt(totalLikes.innerHTML)
                                                                                //Only one like possible with the toggle of a class + addtion to the total of likes
                    if(like.classList.contains('liked')){
                        like.classList.remove('liked')
                        let disliked = likeNumber -1 
                        likeP.innerHTML = disliked
                        let totalLikesNumMinus = totalLikesNum -1
                        totalLikes.innerHTML = totalLikesNumMinus
                    }else{   
                        like.classList.add('liked')
                        let liked = likeNumber + 1
                        likeP.innerHTML = liked
                        let totalLikesNumPlus = totalLikesNum +1
                        totalLikes.innerHTML = totalLikesNumPlus
                    }
                
                }) 
            
            })
        }likeManagment()

    /**************************** LIGHTBOX ***********************************/

           
        function lightbox(){  
            
            const lightboxModal = document.getElementById('lightbox_modal')
            const mediaLightbox = document.getElementById('mediaLigthbox')
            const mediaTitleLightbox = document.getElementById('mediaTitleLightbox')
            const nextBtn = document.getElementById('next')
            const previousBtn = document.getElementById('previous')
            const closeBtnLightboxModal = document.getElementById("closeLightbox");

            let mediaDisplayed = document.getElementsByClassName('picture');
            let mediaArray = []
            mediaArray = Array.from(mediaDisplayed)                             //takiing the data from the DOM to push them in an array
            console.log(mediaArray)

            for(let i=0; i<mediaArray.length; i++){                 
            
                mediaArray[i].addEventListener('click', () => {

                    /*** MEDIA INSERTION IN THE LIGHTBOX ***/
                        function mediaLightboxCreation(){  
                            lightboxModal.style.display = "flex";
                        
                            let src = mediaArray[i].src;
                            let title = mediaArray[i].title;

                            let extArray = src.split(".");
                            let srcType = extArray[extArray.length - 1]

                            const picture = document.createElement( 'img' );
                            picture.setAttribute('src', src)
                            picture.setAttribute('title', title)
                            picture.setAttribute('class', 'picture')

                            const video = document.createElement( 'video' );
                            video.setAttribute('src', src)
                            video.setAttribute('title', title)
                            video.setAttribute('class', 'picture')
                            video.play();
                            video.loop = true; 

                            const TitleLightbox = document.createElement('p')
                            TitleLightbox.textContent = title

                            if(srcType == 'jpg'){
                                mediaLightbox.appendChild(picture)
                            }else{
                                mediaLightbox.appendChild(video)
                            }
                            mediaTitleLightbox.appendChild(TitleLightbox)
                            nextBtn.style.display = 'flex'
                            previousBtn.style.display = 'flex'
                        } mediaLightboxCreation()
                    /**************************************************************/ 

                    /***************** LIGHTBOX NAVIGATION ***********************/ 
                        function lightboxNav(){  

                            /** NEXT EVENT LIGHTBOX **/
                                function nextMediaLightbox(){
                                    if (i < mediaArray.length - 1) {
                                        
                                            mediaLightbox.removeChild(mediaLightbox.lastElementChild)
                                            mediaTitleLightbox.removeChild(mediaTitleLightbox.lastElementChild)
                                            i++;
                                            mediaLightboxCreation()
                                    }//if(i = mediaArray.length){ go back to the start of the array : mediaArray[0] }
                                } 
                                nextBtn.addEventListener('click', () => {
                                    nextMediaLightbox()
                                });
                            /***************************/ 

                            /** PREVIOUS EVENT LIGHTBOX **/
                                function previousMediaLigthbox(){
                                    if (i > 0) {
                                        
                                        mediaLightbox.removeChild(mediaLightbox.lastElementChild)
                                        mediaTitleLightbox.removeChild(mediaTitleLightbox.lastElementChild)
                                        i--;
                                        mediaLightboxCreation()
                                    }//if(i = 0){ go back to the end of the array : mediaArray[mediaArray.length] }
                                }
                                previousBtn.addEventListener('click', () => {
                                    previousMediaLigthbox()
                                });   
                            /***************************/ 
                        
                            /** CLOSE EVENT LIGHTBOX **/
                                function closeLightbox(){
                                    const lightboxModal = document.getElementById('lightbox_modal')
                                    const mediaLightbox = document.getElementById('mediaLigthbox')
                                    const mediaTitleLightbox = document.getElementById('mediaTitleLightbox')
                                    mediaLightbox.removeChild(mediaLightbox.lastElementChild);
                                    mediaTitleLightbox.removeChild(mediaTitleLightbox.lastElementChild);
                                    lightboxModal.style.display = "none";
                                } 
                                closeBtnLightboxModal.addEventListener('click', () => {
                                    closeLightbox()
                                })
                            /***************************/ 

                            /** KEY EVENT LIGHTBOX **/
                                window.addEventListener('keydown', Event => { 
                                if(Event.key === 'Escape'){
                                        closeLightbox()
                                    }
                                    if(Event.key === 'ArrowLeft'){
                                        previousMediaLigthbox()
                                    }
                                    if(Event.key === 'ArrowRight'){
                                        nextMediaLightbox()
                                    }
                                    
                                })
                            /***************************/ 

                        } lightboxNav()
                    /******************************************************/ 
                })  
            }

        } lightbox()   
        
    /****************************************************************************/

        /*********************** PHOTOGRAPHER PAGE FOOTER *************************/

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
                likesDom.setAttribute('id','totalLikes')
                const likeIcon = document.createElement('img')
                likeIcon.setAttribute('src',"assets/icons/heart-solid.svg")

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