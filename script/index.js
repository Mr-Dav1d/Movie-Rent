const new_movies = document.getElementById("movie-list");
const soon_movies = document.getElementById("soon-list");
const divElement = document.getElementById("hero");
const left = document.getElementById("left_btn");
const right = document.getElementById("right_btn");
const circles = document.querySelectorAll('.circle');
const searchIcon = document.getElementById("search-icon");
const searchBar = document.getElementById("search");
const input = document.getElementById("input");
const moveLeftBtn = document.getElementById('move-left');
const moveRightBtn = document.getElementById('move-right');
const soonLeftBtn = document.getElementById('soon-left');
const soonRightBtn = document.getElementById('soon-right');
const menuIcon = document.querySelector('.menu-icon');
const dropdownContent = document.querySelector('.dropdown-content');
const logo = document.getElementById('logo');
const hero_click = document.getElementById('hero_click');
const new_full = document.getElementById('new');


const API_URL_POP = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=225e69e6fd6663b3c629a8ea6adf8d7c&page=1";
const IMG_PATH = "https://image.tmdb.org/t/p/w1280/";


const apiKey = '225e69e6fd6663b3c629a8ea6adf8d7c';
const currentDate = new Date().toISOString().split('T')[0];
const API_URL_SOON = `https://api.themoviedb.org/3/movie/upcoming?api_key=${apiKey}&primary_release_date.gte=${currentDate}`;

const maxLength = 280;
const top_banner_list = [];
let index = 0;
let bannerTimeout;
let isSearchBarVisible = false;
let isDropVisible = false;
let wid;




importMovieLatest(API_URL_POP);
importMovieSoon(API_URL_SOON)
importBanner(API_URL_POP);

async function importMovieLatest(url) {
  const data = await fetch(url);
  const jaison = await data.json();
  const firstFourMovies = jaison.results; 
  show_movie(firstFourMovies);
  
}

async function importMovieSoon(url){
    const data = await fetch(url);
    const jaison = await data.json();
    const firstFourMovies = jaison.results;
    show_soon(firstFourMovies);
}

async function importBanner(url){
    const data = await fetch(url);
    const jaison = await data.json();
    show_banner(jaison.results);
}

async function banner_movie(id){
  const link = `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}`;
  const data = await fetch(link);
  const jaison = await data.json();
  localStorage.setItem("product", JSON.stringify(jaison));
  window.location = "./pages/product.html";
}






function popular_list(jaison) {
  jaison.forEach((movie) => {
    const { backdrop_path } = movie;
    if (top_banner_list.length < 5) {
        top_banner_list.push(backdrop_path);
    }
  });
  return top_banner_list;
}

function show_banner(jaison) {
    popular_list(jaison);
    let id = "";
    
  
    function setBanner() {
      if (index === top_banner_list.length){
            index = 0;
      }
      if (index < top_banner_list.length) {
            const picture_banner = IMG_PATH + top_banner_list[index];
            divElement.style.backgroundImage = `url(${picture_banner})`;

            circles.forEach((circle, circleIndex) => {
                if (circleIndex === index) {
                  circle.classList.add('active');
                } else {
                  circle.classList.remove('active');
                }
              });
            let id = jaison[index].id;
            index++;
            bannerTimeout = setTimeout(setBanner, 5000);
      }
    }
    hero_click.addEventListener("click", () => {
      banner_movie(jaison[index-1].id);
    });
  
    setBanner();
  }



function show_movie(jaison) {
  new_movies.innerHTML = "";

  jaison.slice(0, 10).forEach((movie) => {
    const comic_inf = document.createElement("div");
    const { id ,title, overview, poster_path } = movie;

    comic_inf.classList.add("movie-card");

    let truncatedDescription = overview.substring(0, maxLength) + " ...";

    comic_inf.innerHTML = `
      <div class="poster flex_centerer">
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
      window.location = "./pages/product.html";
    });
  });
  new_full.addEventListener('click', function() {
    localStorage.setItem("searched", JSON.stringify(jaison));
    window.location = "./pages/explore.html";
  });
  const containerWidth = document.querySelector('.movie-card').clientWidth;
  wid = containerWidth;
}

function show_soon(jaison) {
    soon_movies.innerHTML = "";
  
    jaison.slice(0, 10).forEach((movie) => {
      const comic_inf = document.createElement("div");
      const { title, overview, poster_path, release_date } = movie;
  
      comic_inf.classList.add("movie-card");
  
      let truncatedDescription = overview.substring(0, maxLength) + " ...";
  
      comic_inf.innerHTML = `
        <div class="poster">
          <img src="${IMG_PATH + poster_path}" alt="Movie 3"> 
        </div>
        
        <div id="text" class="text">
            <h3 class="name">${title}</h3>
            <p class="desc">${truncatedDescription}</p>
        </div>
      `;
      
      if (poster_path === null) {
        console.log('not enough info for this movie: ', movie);
      }else{
        soon_movies.appendChild(comic_inf);
      }
      comic_inf.addEventListener("click", () => {
        localStorage.setItem("product", JSON.stringify(movie));
        window.location = "./pages/product.html";
      });
    });
    const containerWidth = document.querySelector('.movie-card').clientWidth;
    wid = containerWidth;
  }








// clicks


circles.forEach(circle => {
    circle.addEventListener('click', () => {
        clearTimeout(bannerTimeout); 
        importBanner(API_URL_POP);
        index = circle.id;
    });
});

left.addEventListener("click", function() {
  if(index === 1){
    index = 4
  }else{
    index = index - 2
  }
    clearTimeout(bannerTimeout); 
    importBanner(API_URL_POP);
  });
  
right.addEventListener("click", function() {
    clearTimeout(bannerTimeout); 
    importBanner(API_URL_POP);
});


searchIcon.addEventListener("click", () => {
  if (isSearchBarVisible) {
    searchBar.style.display = "none";
    isSearchBarVisible = false;
  } else {
    searchBar.style.display = "flex";
    isSearchBarVisible = true;
  }
});


moveLeftBtn.addEventListener('click', () => {
  const itemWidth = wid; 
  const containerWidth = new_movies.clientWidth;
  const scrollAmount = Math.floor(containerWidth / itemWidth) * itemWidth / 2;
  
  new_movies.scrollBy({ left: -scrollAmount, behavior: 'smooth' }); 
});

moveRightBtn.addEventListener('click', () => {
  const itemWidth = wid;
  const containerWidth = new_movies.clientWidth;
  const scrollAmount = Math.floor(containerWidth / itemWidth) * itemWidth / 2; 
  
  new_movies.scrollBy({ left: scrollAmount, behavior: 'smooth' });
});


soonLeftBtn.addEventListener('click', () => {
  const itemWidth = wid; 
  const containerWidth = soon_movies.clientWidth;
  const scrollAmount = Math.floor(containerWidth / itemWidth) * itemWidth / 2;
  
  soon_movies.scrollBy({ left: -scrollAmount, behavior: 'smooth' }); 
});

soonRightBtn.addEventListener('click', () => {
  const itemWidth = wid;
  const containerWidth = soon_movies.clientWidth;
  const scrollAmount = Math.floor(containerWidth / itemWidth) * itemWidth / 2; 
  
  soon_movies.scrollBy({ left: scrollAmount, behavior: 'smooth' });
});


searchBar.addEventListener('keypress', function(event) {
  if (event.key === 'Enter') {
    const input = document.getElementById('input');
    const query = input.value;
    localStorage.setItem("searched_word", JSON.stringify(query));
    window.location = "./pages/explore.html";
  }
});

menuIcon.addEventListener('click', function() {
  dropdownContent.classList.toggle('show');
  if (isDropVisible) {
    divElement.style.marginTop = "0px";
    isDropVisible = false;
  } else {
    divElement.style.marginTop = "28px";
    isDropVisible = true;
  }
  
});


logo.addEventListener('click', function() {
    window.location = "#";
});