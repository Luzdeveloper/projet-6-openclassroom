import { API_URL } from "./config.js"
import { displayCategories, displayWorks } from "./function.js"


const gallery = document.querySelector('.gallery');
const filters = document.querySelector('.filters')

export function getApiWorks(){
    fetch(`${API_URL}/works`)
        .then(response => response.json())
        .then((works) => {
            console.log("Gallerie : ", works)
            displayWorks(gallery, works)
        })
        .catch(error => console.error('erreur affichage gallerie:', error))
}

export function getApiCategories() {
    fetch (`${API_URL}/categories`)
        .then(response => response.json())
        .then((categories) => {
            console.log("Categorie:" , categories)
            displayCategories(filters , [{id:0 , name:'Tous'}, ...categories])
        })
        .catch(error => console.error('Erreur affichage catégories:', error))
        
}