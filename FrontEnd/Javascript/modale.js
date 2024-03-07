const API_URL = "http://localhost:5678/api";

// affichez modal
const modifierBtns = document.querySelectorAll('.modif')
modifierBtns.forEach(function(btn) {
  btn.addEventListener('click', function() {
    const modal = this.parentElement.querySelector('.modalDelete');
    modal.style.display = 'block';
    const addPhotoBtn = modal.querySelector('.addPhotobtn');
    addPhotoBtn.addEventListener('click', function() {
      modal.style.display = 'none';
      const addModal = document.querySelector('.addModal');
      addModal.style.display = 'block';
      const backBtn = addModal.querySelector('.back-arrow');
      backBtn.addEventListener('click', function() {
        addModal.style.display = 'none';
        modal.style.display = 'block';
      });
    });

    // Ajoutez un écouteur d'événements sur le bouton de fermeture du modal
    const closeBtns = modal.querySelectorAll('.crossIcon, .closeCross');
    closeBtns.forEach(function(closeBtn) {
      closeBtn.addEventListener('click', function() {
        modal.style.display = 'none';
      });
    });

    // Ajoutez un écouteur d'événements sur le document pour masquer le modal lorsque vous cliquez en dehors du modal
    document.addEventListener('click', function(event) {
      if (event.target === modal) {
        modal.style.display = 'none';
      }
    });
  });
});
