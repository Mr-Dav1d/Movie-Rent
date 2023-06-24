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
const explore = document.getElementById('explore');
const index = document.getElementById('index');
const explore1 = document.getElementById('explore1');
const index1 = document.getElementById('index1');
const where_num = document.getElementById('where_num');
const prev_page = document.getElementById('prev_page');
const next_page = document.getElementById('next_page');

const searched_word = localStorage.getItem("searched_word");


const IMG_PATH = "https://image.tmdb.org/t/p/w1280/";
const apiKey = '225e69e6fd6663b3c629a8ea6adf8d7c';

const maxLength = 280;
let isSearchBarVisible = false;
let isDropVisible = false;
let page_num = 1;
let page_limit = 0;
let mediaType = "multi";


if(searched_word){
  searchMovies();
}else{
  const specialDiv = document.createElement("div");
  specialDiv.classList.add("none");
  specialDiv.innerHTML = `
  <img src="../img/flash.gif" alt="Movie 3">
`;
  new_movies.style.backgroundColor = "#11111100";
  new_movies.appendChild(specialDiv);
}


function show_movie(jaison) {
    new_movies.innerHTML = "";
    console.log(jaison);
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
          console.log('not enough info');
        }else{
          new_movies.appendChild(comic_inf);
        }
        
        
    
        comic_inf.addEventListener("click", () => {
          localStorage.setItem("product", JSON.stringify(movie));
          localStorage.removeItem('searched_word');
          localStorage.removeItem('searched');
          window.location = "./product.html";
        });
      }
      else if(media_type === "person" || mediaType === "person"){
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
          console.log('not enough info');
        }else{
          new_movies.appendChild(comic_inf);
        }
        
    
        comic_inf.addEventListener("click", () => {
          localStorage.setItem("person", JSON.stringify(id));
          localStorage.removeItem('searched_word');
          localStorage.removeItem('searched');
          window.location = "./person.html";
        });
      }
      else{
        const comic_inf = document.createElement("div");
        comic_inf.classList.add("movie-card");
        let truncatedDescription;
        if(overview){
          truncatedDescription = overview.substring(0, maxLength) + " ...";
        }else{
          truncatedDescription = "";
        }
        
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
          console.log('not enough info');
        }else{
          new_movies.appendChild(comic_inf);
        }
        
    
        comic_inf.addEventListener("click", () => {
          localStorage.setItem("product", JSON.stringify(movie));
          localStorage.removeItem('searched_word');
          localStorage.removeItem('searched');
          window.location = "./product.html";
        });
      }
  
      
  
      
    });
  }

  
  function searcher(searched_word) {
    const dziritadi = `https://api.themoviedb.org/3/search/${mediaType}`;
    const bolo = `${dziritadi}?api_key=${apiKey}&query=${encodeURIComponent(searched_word)}&page=${page_num}`;
  
    return fetch(bolo)
      .then(response => response.json())
      .then(data => {
        const results = data.results || [];
        page_limit = data.total_pages;
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
    searcher(searched_word)
      .then(results => {
        if (results.length > 0) {
          localStorage.setItem("searched", JSON.stringify(results));
          show_movie(JSON.parse(JSON.stringify(results)));
        } else {
          createPopup('Nothing found');
          const specialDiv = document.createElement("div");
          specialDiv.classList.add("none");
          specialDiv.innerHTML = `
          <img src="../img/flash.gif" alt="Movie 3">
        `;
          new_movies.style.backgroundColor = "#11111100";
          new_movies.appendChild(specialDiv);
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
      const input = document.getElementById('input');
      const query = input.value;
      
      localStorage.setItem("searched_word", JSON.stringify(query));
      location.reload();
    }
  });

  movie.addEventListener('click', () => {
    new_movies.innerHTML = "";
    mediaType = "movie";
    searchMovies();
  });

  tv.addEventListener('click', () => {
    new_movies.innerHTML = "";
    mediaType = "tv";
    searchMovies();
  });

  person.addEventListener('click', () => {
    new_movies.innerHTML = "";
    mediaType = "person";
    searchMovies();
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

index.addEventListener("click", function(event) {
  event.preventDefault();
  localStorage.removeItem('searched_word');
  localStorage.removeItem('searched');
  window.location = "../index.html";
});

explore.addEventListener("click", function(event) {
  event.preventDefault();

  localStorage.removeItem('searched_word');
  localStorage.removeItem('searched');
  window.location = "./explore.html";
});

index1.addEventListener("click", function(event) {
  event.preventDefault();
  localStorage.removeItem('searched_word');
  localStorage.removeItem('searched');
  window.location = "../index.html";
});

explore1.addEventListener("click", function(event) {
  event.preventDefault();

  localStorage.removeItem('searched_word');
  localStorage.removeItem('searched');
  window.location = "./explore.html";
});

prev_page.addEventListener("click", function(event) {
  if(page_num <= 1){
    console.log("enough champ");
  }else{
    page_num -= 1;
    where_num.textContent = page_num;
  }
  const targetSection = searchBar;
  targetSection.scrollIntoView();
  searchMovies();
});

next_page.addEventListener("click", function(event) {
  if(page_num >= page_limit){
    console.log("enough champ");
  }else{
    page_num += 1;
    where_num.textContent = page_num;
    const targetSection = searchBar;
    targetSection.scrollIntoView();
    searchMovies();
  }
  
  
});