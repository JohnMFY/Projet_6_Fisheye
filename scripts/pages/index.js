/****************************************************************************/    
/***************** INTEGRATION OF PHOTOGRAPHERS IN THE DOM *****************/
/**************************************************************************/

  async function getPhotographers() {
    const Data = await fetch('../../data/photographers.json');
    const DataJson = await Data.json();                                                       //datas des photographes en JSON
    return DataJson
  } 

    async function displayData(photographers) {
        const photographersSection = document.querySelector(".photographer_section");

        photographers.forEach((photographer) => {                                      // Loop for each pour que chaque data d'un photographe sois affiché avec le photographerTemplate(photographer.js)
            const photographerModel = photographerTemplate(photographer);
            const userCardDOM = photographerModel.getUserCardDOM();
            photographersSection.appendChild(userCardDOM);                           // Intégre le model à un élément du DOM
        });
    }   

    async function init() {
        // Récupère les datas des photographes
        const { photographers } = await getPhotographers();
        displayData(photographers);                                             // affiche le model
    }

    init()
/****************************************************************/