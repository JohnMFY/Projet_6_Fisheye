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
        })
        const photographerArt = photographersData.media.filter(function(data){
            return data.photographerId == id
        })
        console.log(id)
        console.log(photographer)
        console.log(photographerArt)
        return photographer, photographerArt
    }
    getPhotographerData()