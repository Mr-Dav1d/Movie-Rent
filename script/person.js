const page_name = document.getElementById("page_name");
const searchIcon = document.getElementById("search-icon");
const searchBar = document.getElementById("search");
const input = document.getElementById("input");
const menuIcon = document.querySelector('.menu-icon');
const dropdownContent = document.querySelector('.dropdown-content');
const logo = document.getElementById('logo');
const actor_img = document.getElementById('actor_img');
const info = document.getElementById('info');
const actor_list = document.getElementById('movie-list');
const seeFull = document.getElementById('seeFull');


const searched_p = localStorage.getItem("person");
const actor_id = JSON.parse(searched_p);
const apiKey = '225e69e6fd6663b3c629a8ea6adf8d7c';


const IMG_PATH = "https://image.tmdb.org/t/p/w1280/";
const url_actor_info = `https://api.themoviedb.org/3/person/${actor_id}?api_key=${apiKey}`;
const url_famous_for = `https://api.themoviedb.org/3/person/${actor_id}/combined_credits?api_key=${apiKey}`;



let isSearchBarVisible = false;
let isDropVisible = false;
let isFullVisible = false;
const maxLength_Bio = 1000;
const maxLength = 280;


importActor(url_actor_info);
importFamous(url_famous_for, "less");

async function importActor(url) {
    const data = await fetch(url);
    const jaison = await data.json();
    page_name.textContent = jaison.name;
    showActor(jaison);
  }

async function importFamous(url, sho) {
    const data = await fetch(url);
    const jaison = await data.json();

    const mediaIds = new Set();

    const excludedGenreIds = [35, 10767]; 

    const uniqueMedia = jaison.cast.filter((credit) => {
        if (
        credit.media_type === 'movie' || credit.media_type === 'tv' &&
        credit.genre_ids &&
        !credit.genre_ids.some((genreId) => excludedGenreIds.includes(genreId)) &&
        !mediaIds.has(credit.id)
        ) {
        mediaIds.add(credit.id);
        return true;
        }
        return false;
    });

    const sortedMedia = uniqueMedia.sort((a, b) => b.popularity - a.popularity);
    let topMedia = sortedMedia;

    if(sho === "less"){
      topMedia = sortedMedia.slice(0, 8);
    }
    
    console.log(topMedia);
    showMovies(topMedia);
}


function showMovies(jaison){
    actor_list.innerHTML = "";

    jaison.forEach((movie) => {
        const { id ,title, overview, poster_path, media_type, name, profile_path, known_for_department } = movie;

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
              actor_list.appendChild(comic_inf);
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
              actor_list.appendChild(comic_inf);
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
              actor_list.appendChild(comic_inf);
            }
            
        
            comic_inf.addEventListener("click", () => {
              localStorage.setItem("product", JSON.stringify(movie));
              window.location = "./product.html";
            });
    
          }
      
    });
}




function showActor(jaison){
    const {name, profile_path, place_of_birth, birthday, biography } = jaison;

    let truncatedBio = biography.substring(0, maxLength_Bio) + " ...";

    actor_img.innerHTML = `
        <img src=${IMG_PATH + profile_path}>
    `;

    info.innerHTML = `
        <h1>${name}</h1>
        <div class="birth flex_space_between">
            <p>${birthday}</p>
            <div class="circle"></div>
            <p>${place_of_birth}</p>
        </div>
        <p>${truncatedBio}</p>
        
    `;
}   



function searcher(query, mediaType = 'multi') {
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
          localStorage.setItem("searched", JSON.stringify(results));
          window.location = "./explore.html";
        } else {
          window.location = "./explore.html";
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
  
  searchBar.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
      searchMovies();
    }
  });
  
  menuIcon.addEventListener('click', function() {
    dropdownContent.classList.toggle('show');
  });
  
  logo.addEventListener('click', function() {
    window.location = "../index.html";
  });

  seeFull.addEventListener('click', function() {
    if (isFullVisible) {
      importFamous(url_famous_for, "less");
      seeFull.textContent = "See all";
      isFullVisible = false;
    } else {
      importFamous(url_famous_for, "");
      seeFull.textContent = "See less";
      isFullVisible = true;
    }
  });