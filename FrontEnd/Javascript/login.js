const API_URL = "http://localhost:5678/api";
const storageToken = localStorage.token;

function logApi(event) {
    event.preventDefault(); // Empêche le comportement par défaut du formulaire

    // Récupère les valeurs des champs email et mot de passe du formulaire
    const email = document.querySelector('#email').value;
    const password = document.querySelector('#password').value;
    
    //Data contenant les informations d'identification
    const data = { email, password };
    
    // Envoie une requête POST à l'API avec les données d'identification
    fetch(`${API_URL}/users/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    })
    .then(response => {
        // Vérifie si la réponse est valide
        if (!response.ok) {
            throw new Error("Email ou mot de passe incorrect");
        }
        return response.json();
    })
    .then(dataResponse => {
        // Stocke le token dans le stockage local du navigateur
        localStorage.setItem("token", dataResponse.token);
        // Redirige l'utilisateur vers la page d'acceuil du site
        window.location.href = "index.html";
    })
    .catch(error => {
        // Gère les erreurs en affichant une alerte avec le message d'erreur
        alert(error.message);
    });
}

// Ajoute un gestionnaire d'événement pour le formulaire de connexion
document.querySelector('#login form').addEventListener('submit', logApi);