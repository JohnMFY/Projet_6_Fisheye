    
/***********************************************************************/
  async function getPhotographers() {
    const Data = await fetch('../../data/photographers.json');
    const DataJson = await Data.json();
    return DataJson
    console.log(DataJson.photographers)
    console.log(DataJson.media)
  } 

    async function displayData(photographers) {
        const photographersSection = document.querySelector(".photographer_section");

        photographers.forEach((photographer) => {
            const photographerModel = photographerTemplate(photographer);
            const userCardDOM = photographerModel.getUserCardDOM();
            photographersSection.appendChild(userCardDOM);
        });
    }   

    async function init() {
        // Récupère les datas des photographes
        const { photographers } = await getPhotographers();
        displayData(photographers);
    }

    init()