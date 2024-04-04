const API_URL = "http://localhost:5678/api";

function getApiWorks() {
  return fetch(`${API_URL}/works`)
    .then((response) => response.json())
    .then((data) => {
      displayWorks(data);
      displayWorksInModal(data);
      return data;
    })
    .catch((error) => console.error("Error displaying gallery:", error));
}

function getApiCategories() {
  return fetch(`${API_URL}/categories`)
    .then((response) => response.json())
    .then((categories) => {
      //   console.table(categories);
      displayCategories(categories);
    })
    .catch((error) => console.error("Error displaying categories:", error));
}

getApiWorks();
getApiCategories();

function displayWorks(works) {
  const gallery = document.querySelector(".gallery");
  gallery.innerHTML = works
    .map(
      (work) => `
      <figure>
        <img src="${work.imageUrl}">
        <figcaption>${work.title}</figcaption>
      </figure>
    `
    )
    .join("");
}

function displayCategories(categories) {
  const filters = document.querySelector(".filters");

  // Créer le bouton "Tous"
  const allButton = document.createElement("button");
  allButton.innerText = "Tous";
  allButton.classList.add("filterButton");
  filters.appendChild(allButton);

  allButton.addEventListener("click", function () {
    // Lorsque le bouton "Tous" est cliqué, afficher tous les travaux
    // Supprimer la classe "active" de tous les boutons
    const activeButtons = document.querySelectorAll(".filterButton.active");
    activeButtons.forEach((activeButton) => {
      activeButton.classList.remove("active");
    });

    // Ajouter la classe "active" au bouton "Tous"
    allButton.classList.add("active");

    getApiWorks().then((works) => {
      console.table(works);
      displayWorks(works);
    });
  });

  // Pour chaque catégorie, créer un bouton et ajouter un écouteur d'événements
  categories.forEach((category) => {
    const button = document.createElement("button");
    button.id = category.id;
    button.innerText = category.name;
    button.classList.add("filterButton");
    filters.appendChild(button);

    button.addEventListener("click", function () {
      // Supprimer la classe "active" de tous les boutons
      const activeButtons = document.querySelectorAll(".filterButton.active");
      activeButtons.forEach((activeButton) => {
        activeButton.classList.remove("active");
      });

      // Ajouter la classe "active" au bouton sélectionné
      button.classList.add("active");

      getApiWorks().then((works) => {
        const filteredWorks = works.filter(
          (work) => work.categoryId === category.id
        );
        console.table(filteredWorks);
        displayWorks(filteredWorks);
      });
    });
  });
}

// Fonction Logout

function logOut() {
  localStorage.removeItem("token");
  console.log("Utilisateur déconnecté");
}

const token = localStorage.getItem("token");
const adminHeader = document.querySelector(".editionMod");
const editionLink = document.querySelector(".elementLink");
const logStatus = document.querySelector("#loginOut");
const filters = document.querySelector(".filters");

//Fonction gestion du mode admin

function gestionModeAdmin() {
  const loginLink = document.getElementById("LoginOut");

  // Mettre à jour le lien de connexion/logout
  function updateLoginStatus() {
    if (localStorage.getItem("token")) {
      // Si l'utilisateur est connecté
      loginLink.innerHTML = "Logout";
    } else {
      // Si l'utilisateur n'est pas connecté
      loginLink.innerHTML = "Login";
    }
  }

  //Ajout de l'évènement au click
  loginLink.addEventListener("click", function () {
    if (localStorage.getItem("token")) {
      // Si l'utilisateur est connecté, déconnectez-le
      logOut();
    } else {
      // Si l'utilisateur n'est pas connecté, redirigez-le vers la page de connexion
      window.location.href = "login.html";
    }
  });

  // Appeler la fonction pour mettre à jour le statut de connexion au chargement de la page
  updateLoginStatus();

  if (localStorage.getItem("token")) {
    //si le jeton est présent alors le mode admin se lance
    adminHeader.style.display = "flex";
    editionLink.style.display = "flex";
    filters.style.display = "none";
  } else {
    //sinon on désactive le mode
    adminHeader.style.display = "none";
    editionLink.style.display = "none";
    filters.style.display = "flex";
    console.log("Déconnexion du mode administrateur");
  }
}

gestionModeAdmin();

const logOutButton = document.querySelector(".loginOut");
logOutButton?.addEventListener("click", () => {
  logOut();
  window.location.href = "index.html";
});

//Fonction modale

//Récupération de tous les travaux qui sont dans l'API

async function getAllWorks() {
  console.log("Récupération des works et categories");
  const worksPromise = fetch(`${API_URL}/works`).then((response) =>
    response.json()
  );
  const categoriesPromise = fetch(`${API_URL}/categories`).then((response) =>
    response.json()
  );

  try {
    console.log("Récupérations des travaux en cours");
    const [works, categories] = await Promise.all([
      worksPromise,
      categoriesPromise,
    ]);
    console.log("récupération réussi");
    console.table(works);
    console.table(categories);
    return { works, categories };
  } catch (error) {
    console.error("Erreur lors de la récupération :", error);
    throw error;
  }
}

function displayWorksInModal(works) {
  const gallery = document.querySelector(".galleryPreview");
  gallery.innerHTML = works
    .map(
      (work) => `
      <figure>
        <img src="${work.imageUrl}">
        <i class="fa-regular fa-trash-can poubsupp" data-id="${work.id}"></i>
      </figure>
    `
    )
    .join("");

  const deleteButtons = document.querySelectorAll(
    ".galleryPreview i.fa-trash-can"
  );
  deleteButtons.forEach((button) => {
    button.addEventListener("click", async () => {
      const id = button.dataset.id;
      console.log(`Suppression de l'image avec l'id ${id}`);
      await deleteWorkInModal(id);
      console.log("Image supprimée");
      getAllWorks().then(({ works }) => {
        console.log("Mise à jour des images");
        displayWorksInModal(works);
        displayWorks(works);
      });
    });
  });
}
//fonctioon delete

async function deleteWorkInModal(id) {
  console.log(`Suppression de la photo avec l'id ${id}`);
  const token = localStorage.getItem("token");

  try {
    const response = await fetch(`${API_URL}/works/${id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.ok) {
      document.getElementById(id).parentNode.remove();
    } else {
      console.error("Échec de la suppression");
    }
  } catch (error) {
    console.error(error);
  }
}

//fonction add works

async function addWork(event) {
  const token = localStorage.getItem("token");

  const imageInput = document.querySelector("#new-pictures");
  const titleInput = document.querySelector("#imgTitle");
  const categorySelect = document.querySelector("#imgCat");

  const formDAta = new FormData();
  formDAta.append("image", imageInput.files[0]);
  formDAta.append("title", titleInput.value);
  formDAta.append("category", categorySelect.value);

  try {
    const response = await fetch(`${API_URL}/works`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: formDAta,
    });
    if (response.ok) {
      console.log("Travail ajouté avec succés");
      const works = await getAllWorks();
      console.log("Liste des travaux mis a jour:", works);
      displayWorks(works);
    } else {
      console.error("Echec de l ajout du travail");
    }
  } catch (error) {
    console.error("Erreur de l'ajout:", error);
  }
}

const addPhotoForm = document.querySelector(".submitBtn");
addPhotoForm.addEventListener("click", function (event) {
  event.preventDefault();
  addWork();
});

const addPhotoButton = document.querySelector(".addPhoto-btn");
addPhotoButton.addEventListener("click", () => {
  const fileInput = document.querySelector("#new-pictures");
  fileInput.click();
});

addPhotoForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const formData = new FormData(event.target);
  await addWork(formData);
});

//affichage de la miniature modale post

const submit = document.querySelector(".submitBtn");
const newPicturesBtn = document.getElementById("new-pictures");
const imgPreview = document.getElementById("imagePreview");
const logoImg = document.querySelector(".logoImage");
const buttonAdd = document.querySelector(".addPhoto-btn");
const formatImg = document.querySelector(".formatImg");

newPicturesBtn.addEventListener("change", function (event) {
  getImgData(event);
});

function getImgData(event) {
  const files = event.target.files;

  if (files.length > 0) {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(files[0]);

    fileReader.addEventListener("load", function () {
      formatImg.style.display = "none";
      buttonAdd.style.display = "none";
      logoImg.style.display = "none";
      imgPreview.style.display = "flex";
      imgPreview.innerHTML = `<img src="${this.result}" alt="Preview"/>`;
    });
  }
}

// gere la navigation des menus

document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", (event) => {
    const sectionId = event.target.dataset.sectionId;
    const section = document.getElementById(sectionId);

    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  });
});
