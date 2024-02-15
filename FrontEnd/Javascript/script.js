const API_URL="http://localhost:5678/api"

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
    categories.forEach(category => {
      const button = document.createElement('button');
      button.id = category.id;
      button.innerText = category.name;
      button.classList.add('filterButton');
      filters.appendChild(button);
  
      button.addEventListener('click', function() {
        getApiWorks().then(works => {
          const filteredWorks = works.filter(work => work.categoryId === category.id);
          console.table(filteredWorks);
          displayWorks(filteredWorks);
        });
      });
    });
  }






