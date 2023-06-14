const new_movies = document.getElementById("movie-list");
const searchIcon = document.getElementById("search-icon");
const searchBar = document.querySelector(".search-bar");
const container = document.querySelector("container");


const searched = localStorage.getItem("searched");
const searchedInfo = JSON.parse(searched);

const IMG_PATH = "https://image.tmdb.org/t/p/w1280/";
const apiKey = '225e69e6fd6663b3c629a8ea6adf8d7c';

const maxLength = 280;
let isSearchBarVisible = false;

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
      const comic_inf = document.createElement("div");
      const { id ,title, overview, poster_path } = movie;
  
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
    });
  }

  function searcher(query, mediaType = 'movie') {
    const dziritadi = `https://api.themoviedb.org/3/search/${mediaType}`;
    const bolo = `${dziritadi}?api_key=${apiKey}&query=${query}`;
  
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

  function searchMovies() {
    const input = document.getElementById('search-input');
  
    const query = input.value;
  
    searcher(query)
      .then(results => {
        if (results.length > 0) {
          console.log('Search results:', results);
          localStorage.setItem("searched", JSON.stringify(results));
          window.location = "./explore.html";
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

  searchIcon.addEventListener("click", () => {
    if (isSearchBarVisible) {
      searchBar.style.display = "none";
      isSearchBarVisible = false;
    } else {
      searchBar.style.display = "flex";
      isSearchBarVisible = true;
    }
  });
