const new_movies = document.getElementById("movie-list");
const searchIcon = document.getElementById("search-icon");
const searchBar = document.getElementById("search");
const container = document.querySelector("container");
const input = document.getElementById("input");
const menuIcon = document.querySelector('.menu-icon');
const dropdownContent = document.querySelector('.dropdown-content');
const movie = document.getElementById("movie");
const tv = document.getElementById("tv");
const person = document.getElementById("person");
const logo = document.getElementById('logo');



const searched = localStorage.getItem("searched");
const searchedInfo = JSON.parse(searched);

const IMG_PATH = "https://image.tmdb.org/t/p/w1280/";
const apiKey = '225e69e6fd6663b3c629a8ea6adf8d7c';

const maxLength = 280;
let isSearchBarVisible = false;
let isDropVisible = false;

if (!searchedInfo || searchedInfo.length === 0) {
  const specialDiv = document.createElement("div");
  specialDiv.classList.add("none");
  specialDiv.innerHTML = `
  <img src="../img/flash.gif" alt="Movie 3">
  <img src="../img/joker.gif" alt="Movie 3">
`;
  new_movies.style.backgroundColor = "#11111100";
  new_movies.appendChild(specialDiv);
} else {
  show_movie(searchedInfo);
}

function show_movie(jaison) {
    new_movies.innerHTML = "";
  
    jaison.forEach((movie) => {
      
      const { id ,title, overview, poster_path, media_type, name, known_for_department, profile_path } = movie;


      if(media_type === "tv"){
        const comic_inf = document.createElement("div");
        comic_inf.classList.add("movie-card");
  
        let truncatedDescription = overview.substring(0, maxLength) + " ...";

        comic_inf.innerHTML = `
          <div class="poster">
            <img src="${IMG_PATH + poster_path}" alt="Movie 3">
          </div>
          <div class="text">
              <h3 class="name">${name}</h3>
              <p class="desc">${truncatedDescription}</p>
          </div>
        `;
        if (poster_path === null) {
          console.log('not enough info for this movie: ', movie);
        }else{
          new_movies.appendChild(comic_inf);
        }
        
    
        comic_inf.addEventListener("click", () => {
          localStorage.setItem("product", JSON.stringify(movie));
          window.location = "./product.html";
        });
      }
      else if(media_type === "person"){
        const comic_inf = document.createElement("div");
        comic_inf.classList.add("movie-card");

        comic_inf.innerHTML = `
          <div class="poster">
            <img src="${IMG_PATH + profile_path}" alt="Movie 3">
          </div>
          <div class="text">
              <h3 class="name">${name}</h3>
              <p class="desc">known for: ${known_for_department}</p>
          </div>
        `;
        if (profile_path === null) {
          console.log('not enough info for this movie: ', movie);
        }else{
          new_movies.appendChild(comic_inf);
        }
        
    
        comic_inf.addEventListener("click", () => {
          localStorage.setItem("person", JSON.stringify(id));
          window.location = "./person.html";
        });
      }
      else{
        const comic_inf = document.createElement("div");
        comic_inf.classList.add("movie-card");
  
        let truncatedDescription = overview.substring(0, maxLength) + " ...";

        comic_inf.innerHTML = `
          <div class="poster">
            <img src="${IMG_PATH + poster_path}" alt="Movie 3">
          </div>
          <div class="text">
              <h3 class="name">${title}</h3>
              <p class="desc">${truncatedDescription}</p>
          </div>
        `;
        if (poster_path === null) {
          console.log('not enough info for this movie: ', movie);
        }else{
          new_movies.appendChild(comic_inf);
        }
        
    
        comic_inf.addEventListener("click", () => {
          localStorage.setItem("product", JSON.stringify(movie));
          window.location = "./product.html";
        });

        window.addEventListener('beforeunload', function() {
          localStorage.removeItem('searched');
        });
      }
  
      
  
      
    });
  }

  function show_only(jaison, type){
    new_movies.innerHTML = "";
  
    jaison.forEach((movie) => {
      const { id ,title, overview, poster_path, media_type, name, profile_path, known_for_department } = movie;


      if(media_type === "tv" && type === "tv"){
        const comic_inf = document.createElement("div");
        console.log(movie);
        comic_inf.classList.add("movie-card");
  
        let truncatedDescription = overview.substring(0, maxLength) + " ...";

        comic_inf.innerHTML = `
          <div class="poster">
            <img src="${IMG_PATH + poster_path}" alt="Movie 3">
          </div>
          <div class="text">
              <h3 class="name">${name}</h3>
              <p class="desc">${truncatedDescription}</p>
          </div>
        `;

        if (poster_path === null) {
          console.log('not enough info for this movie: ', movie);
        }else{
          new_movies.appendChild(comic_inf);
        }
        
    
        comic_inf.addEventListener("click", () => {
          localStorage.setItem("product", JSON.stringify(movie));
          window.location = "./product.html";
        });
      }
      else if(media_type === "movie" && type === "movie"){
        const comic_inf = document.createElement("div");
        comic_inf.classList.add("movie-card");
  
        let truncatedDescription = overview.substring(0, maxLength) + " ...";

        comic_inf.innerHTML = `
          <div class="poster">
            <img src="${IMG_PATH + poster_path}" alt="Movie 3">
          </div>
          <div class="text">
              <h3 class="name">${title}</h3>
              <p class="desc">${truncatedDescription}</p>
          </div>
        `;
        
        if (poster_path === null || poster_path === undefined) {
          console.log(poster_path);
          console.log('not enough info for this movie: ', movie);
        }else{
          new_movies.appendChild(comic_inf);
        }
        
    
        comic_inf.addEventListener("click", () => {
          localStorage.setItem("product", JSON.stringify(movie));
          window.location = "./product.html";
        });
      }
      else if(media_type === "person" && type === "person"){
        const comic_inf = document.createElement("div");
        comic_inf.classList.add("movie-card");

        comic_inf.innerHTML = `
          <div class="poster">
            <img src="${IMG_PATH + profile_path}" alt="Movie 3">
          </div>
          <div class="text">
              <h3 class="name">${name}</h3>
              <p class="desc">known for: ${known_for_department}</p>
          </div>
        `;
        if (profile_path === null) {
          console.log('not enough info for this movie: ', movie);
        }else{
          new_movies.appendChild(comic_inf);
        }
        
    
        comic_inf.addEventListener("click", () => {
          localStorage.setItem("person", JSON.stringify(id));
          window.location = "./person.html";
        });
      }
      
    });

    if(new_movies.innerHTML === ""){
      const specialDiv = document.createElement("div");
      specialDiv.classList.add("none");
      specialDiv.innerHTML = `
      <img src="../img/flash.gif" alt="Movie 3">
      <img src="../img/joker.gif" alt="Movie 3">
      `;
      new_movies.style.backgroundColor = "#11111100";
      new_movies.appendChild(specialDiv);
    }

    window.addEventListener('beforeunload', function() {
      localStorage.removeItem('searched');
    });

  }

  function searcher(query, mediaType = 'multi') {
    const dziritadi = `https://api.themoviedb.org/3/search/${mediaType}`;
    const bolo = `${dziritadi}?api_key=${apiKey}&query=${encodeURIComponent(query)}`;
  
    return fetch(bolo)
      .then(response => response.json())
      .then(data => {
        const results = data.results || [];
        return results;
      })
      .catch(error => {
        console.error('search error: ', error);
        return [];
      });
  }

  function createPopup(message) {
    const popup = document.createElement('div');
    popup.id = 'popup';
    popup.textContent = message;
  
    document.body.appendChild(popup);
  
    setTimeout(() => {
      popup.remove();
    }, 3000); 
  }

  function searchMovies() {
    const input = document.getElementById('input');
  
    const query = input.value;
  
    searcher(query)
      .then(results => {
        if (results.length > 0) {
          show_movie(results);
        } else {
          createPopup('Nothing found');
        }
      })
      .catch(error => {
        console.error('Error occurred:', error);
        createPopup('Error occurred');
      });
  }


 


  // clicks


  searchBar.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
      searchMovies();
    }
  });

  movie.addEventListener('click', () => {
    if (searchedInfo === null) {
      console.log(searchedInfo);
    }else{
      show_only(searchedInfo, "movie");
    }
  });

  tv.addEventListener('click', () => {
    if (searchedInfo === null) {
      console.log(searchedInfo);
    }else{
      show_only(searchedInfo, "tv");
    }
  });

  person.addEventListener('click', () => {
    if (searchedInfo === null) {
      console.log(searchedInfo);
    }else{
      show_only(searchedInfo, "person");
    }
  });

  menuIcon.addEventListener('click', function() {
    dropdownContent.classList.toggle('show');
    if (isDropVisible) {
      searchBar.style.marginTop = "0px";
      isDropVisible = false;
    } else {
      searchBar.style.marginTop = "43px";
      isDropVisible = true;
    }
    
  });

  logo.addEventListener('click', function() {
    window.location = "../index.html";
});