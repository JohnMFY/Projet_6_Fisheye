//Mettre le code JavaScript lié à la page photographer.html

/*********************************************************************/
/****** RECOVERY OF THE PHOTOGRAPHER ID IN THE URL WITH PARAMS ******/

    const photographerId = window.location.search
    const UrlParams = new URLSearchParams(photographerId)
    const id = UrlParams.get("id")
    console.log(id)

/*
////// WITH THE ID GET THE PRODUCT DATA IN A ARRAY //////
 async function callPhotographerById(){
    await fetch(`../../data/photographers.json${id}`)
    .then(res => res.json())
    .then((data) => (photographerData = data))  
   console.log(data)
 }
 callPhotographerById()*/