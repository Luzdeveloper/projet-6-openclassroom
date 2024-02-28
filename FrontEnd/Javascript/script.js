const API_URL = "http://localhost:5678/api";

function getApiWorks() {
    return fetch(`${API_URL}/works`)
        .then(response => response.json())
        .then((data) => {
            console.table(data);
            displayWorks(data);
            return data;
        })
        .catch(error => console.error('Error displaying gallery:', error));
}

function getApiCategories() {
    return fetch(`${API_URL}/categories`)
        .then(response => response.json())
        .then((categories) => {
            console.table(categories);
            displayCategories(categories);
        })
        .catch(error => console.error('Error displaying categories:', error));
}

getApiWorks();
getApiCategories();

function displayWorks(works) {
    const gallery = document.querySelector('.gallery');
    gallery.innerHTML = works.map(work => `
      <figure>
        <img src="${work.imageUrl}">
        <figcaption>${work.title}</figcaption>
      </figure>
    `).join('');
}

function displayCategories(categories) {
    const filters = document.querySelector('.filters');
    console.log(categories);

    // Créer le bouton "Tous"
    const allButton = document.createElement('button');
    allButton.innerText = 'Tous';
    allButton.classList.add('filterButton');
    filters.appendChild(allButton);

    allButton.addEventListener('click', function () {
        // Lorsque le bouton "Tous" est cliqué, afficher tous les travaux
        getApiWorks().then(works => {
            console.table(works);
            displayWorks(works);
        });
    });

    // Pour chaque catégorie, créer un bouton et ajouter un écouteur d'événements
    categories.forEach(category => {
        const button = document.createElement('button');
        button.id = category.id;
        button.innerText = category.name;
        button.classList.add('filterButton');
        filters.appendChild(button);

        button.addEventListener('click', function () {
            getApiWorks().then(works => {
                const filteredWorks = works.filter(work => work.categoryId === category.id);
                console.table(filteredWorks);
                displayWorks(filteredWorks);
            });
        });
    });
}

// Fonction Logout 

function logOut(){
    localStorage.removeItem("token")
    console.log("Utilisateur déconnecté")
}

const token = localStorage.getItem("token");
const adminHeader = document.querySelector('.editionMod');
const editionLink = document.querySelector('.elementLink');
const logStatus = document.querySelector('#loginOut');
const filters = document.querySelector('.filters');

//Fonction gestion du mode admin

function gestionModeAdmin() {
    if (token){
        //si le jeton est présent alors le mode admin se lance 

        adminHeader.style.display = "flex";
        editionLink.style.display = "flex";
        filters.style.display = "none";
        logStatus.innerHTML="Logout"
        console.log("Connexion au mode administrateur reussi")
} else {
    //sinon on désactive le mode 

    adminHeader.style.display ="none"; 
    editionLink.style.display ="none";
    filters.style.display ="block";
    logStatus.innerHTML = "Login";
    console.log("Déconnexion du mode administrateur")
}
}

gestionModeAdmin()

const logOutButton = document.querySelector('.logout');
logOutButton?.addEventListener('click', () => {
    logOut()
    window.location.href= "index.html";
})