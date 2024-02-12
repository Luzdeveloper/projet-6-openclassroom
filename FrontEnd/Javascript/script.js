const API_URL="http://localhost:5678/api"

//affichage de la gallerie et des sous titres


function getApiWorks(){
    fetch(`${API_URL}/works`)
        .then(response => response.json())
        .then((works) => {
            console.log(works)
            displayWorks(works)
        })
        .catch(error => console.error('erreur affichage gallerie:', error))
}

function getApiCategories() {
    fetch (`${API_URL}/categories`)
        .then(response => response.json())
        .then((categories) => console.log(categories))
        .catch(error => console.error('erreur affichage categories', error))
}

function displayWorks(works){
    const container = document.querySelector('.gallery')
    container.innerHTML = works.map(work => `
        <figure>
            <img src="${work.imageUrl}">
            <figcaption>${work.title}</figcaption>
            </figure>`
        ).join('')
}

getApiWorks()
getApiCategories()

