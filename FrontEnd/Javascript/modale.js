const API_URL = "http://localhost:5678/api";

const modifierBtn = document.querySelector(".modif");
const modal = document.querySelector(".modalDelete");
const modalContainer = document.querySelector(".modalContainer");
const modalContainerAdd = document.querySelector(".modalContainerAdd");
const crossIcons = document.querySelectorAll(".crossIcon");

const addPhotoBtn = modal.querySelector(".addPhotobtn");
const addPhotoBtn2 = modal.querySelector(".addPhoto-btn");

const addModal = document.querySelector(".addModal");
const addPhotoForm = modal.querySelector("#addphotoform");

const backBtn = addModal.querySelector(".back-arrow");

// affichez modal
modifierBtn.addEventListener("click", function (event) {
  event.stopPropagation();
  modal.style.display = "block";
});

addPhotoBtn.addEventListener("click", function () {
  modal.style.display = "none";
  addModal.style.display = "block";
});

backBtn.addEventListener("click", function () {
  modal.style.display = "block";
  addModal.style.display = "none";
});

// Fermetures modales clic document

modalContainer.addEventListener("click", function (event) {
  event.stopPropagation();
});
modalContainerAdd.addEventListener("click", function (event) {
  event.stopPropagation();
});

document.addEventListener("click", function () {
  modal.style.display = "none";
  addModal.style.display = "none";
});

crossIcons.forEach((crossIcon) => {
  crossIcon.addEventListener("click", function () {
    modal.style.display = "none";
    addModal.style.display = "none";
  });
});

document.getElementById("addphotoForm").addEventListener("input", function () {
  var isFormValid = true;

  // vérifier chaque champ du formulaire
  var inputs = this.querySelectorAll("input, select, textarea");
  for (var i = 0; i < inputs.length; i++) {
    if (!inputs[i].checkValidity()) {
      isFormValid = false;
      break;
    }
  }

  // vérifier si un fichier a été sélectionné
  var fileInput = document.getElementById("new-pictures");
  if (!fileInput.files.length) {
    isFormValid = false;
  }

  // activer/désactiver le bouton de soumission en fonction de la validité du formulaire
  document.getElementById("submitBtn").disabled = !isFormValid;
});
