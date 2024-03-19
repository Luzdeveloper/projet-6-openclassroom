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
