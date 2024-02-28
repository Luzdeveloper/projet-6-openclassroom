const API_BASE_URL = "http://localhost:5678/api";

async function logIn() {
    const email = document.querySelector('#email').value;
    const password = document.querySelector('#password').value;

    // Vérification si email et mot de passe sont vides
    if (!email || !password) {
        alert("Veuillez fournir à la fois l'email et le mot de passe.");
        return;
    }

    const data = {
        email: email,
        password: password
    };

    try {
        const response = await fetch(`${API_BASE_URL}/users/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error("Email ou mot de passe incorrect.");
        }

        const responseData = await response.json();
        localStorage.setItem("token", responseData.token);
        window.location.href = "index.html"; // Redirige l'utilisateur vers la page d'accueil après la connexion réussie
    } catch (error) {
        alert(error.message);
    }
}

document.querySelector('#loginForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Empêche le formulaire de soumettre les données normalement
    logIn(); // Appelle la fonction logIn() pour gérer l'authentification
});