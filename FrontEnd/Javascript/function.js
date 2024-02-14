export function displayWorks(container, works){
    container.innerHTML = works.map(work => `
        <figure>
            <img src="${work.imageUrl}">
            <figcaption>${work.title}</figcaption>
            </figure>`
        ).join('')
}

export function displayCategories(container, categories){
    container.innerHTML = categories.map(categorie => `
        <button id= "${categorie.name}">${categorie.name}</button>
        `

        ).join('')
}