const API_BASE_URL = "http://localhost:5678/api";

// Fonction asynchrone pour gérer la connexion de l'utilisateur
async function logIn() {
    // Récupération de l'email et du mot de passe depuis le formulaire HTML
    const email = document.querySelector('#email').value;
    const password = document.querySelector('#password').value;

    // Vérification si l'email et le mot de passe sont fournis
    if (!email || !password) {
        alert("Veuillez fournir à la fois l'email et le mot de passe.");
        return;
    }

    // Création de l'objet contenant l'email et le mot de passe
    const data = {
        email: email,
        password: password
    };

    try {
        // Envoi de la requête POST au serveur avec les données JSON
        const response = await fetch(`${API_BASE_URL}/users/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        // Vérification si la réponse du serveur est valide
        if (!response.ok) {
            throw new Error("Email ou mot de passe incorrect.");
        }

        // Récupération des données JSON de la réponse
        const responseData = await response.json();
        // Stockage du jeton (token) dans le stockage local du navigateur
        localStorage.setItem("token", responseData.token);
        // Redirection de l'utilisateur vers "index.html" après une connexion réussie
        window.location.href = "index.html"; 
    } catch (error) {
        // Gestion des erreurs : affichage d'une alerte avec le message d'erreur
        alert(error.message);
    }
}

// Ajout d'un écouteur d'événement pour le formulaire de connexion
document.querySelector('#loginForm').addEventListener('submit', function(event) {
    // Empêche le comportement par défaut du formulaire (rafraîchissement de la page)
    event.preventDefault(); 
    // Appel de la fonction logIn pour gérer la connexion de l'utilisateur
    logIn();
});