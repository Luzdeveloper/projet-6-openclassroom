fetch("http://localhost:5678/api/works")
.then(response => response.json())
.then((json) => console.log(json))

fetch("http://localhost:5678/api/categories")
.then(response => response.json())
.then((json) => console.log(json))