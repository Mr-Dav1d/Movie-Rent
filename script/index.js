const new_movies = document.getElementById("movie-list");
const soon_movies = document.getElementById("soon-list");
const divElement = document.getElementById("hero");
const left = document.getElementById("left_btn");
const right = document.getElementById("right_btn");
const circles = document.querySelectorAll('.circle');

const API_URL_POP = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=225e69e6fd6663b3c629a8ea6adf8d7c&page=1";
const IMG_PATH = "https://image.tmdb.org/t/p/w1280/";
const SEARCH_API = 'https://api.themoviedb.org/3/search/movie?api_key=225e69e6fd6663b3c629a8ea6adf8d7c&query="';


const apiKey = '225e69e6fd6663b3c629a8ea6adf8d7c';
const currentDate = new Date().toISOString().split('T')[0];
const API_URL_SOON = `https://api.themoviedb.org/3/movie/upcoming?api_key=${apiKey}&primary_release_date.gte=${currentDate}`;

const maxLength = 300;
const top_banner_list = [];
let index = 0;
let bannerTimeout;

importMovieLatest(API_URL_POP);
importMovieSoon(API_URL_SOON)
importBanner(API_URL_POP);

async function importMovieLatest(url) {
  const data = await fetch(url);
  const jaison = await data.json();
  const firstFourMovies = jaison.results.slice(0, 4); // Get only the first 4 movies
  show_movie(firstFourMovies);
  
}

async function importMovieSoon(url){
    const data = await fetch(url);
    const jaison = await data.json();
    const firstFourMovies = jaison.results.slice(0, 4);
    show_soon(firstFourMovies);
}

async function importBanner(url){
    const data = await fetch(url);
    const jaison = await data.json();
    show_banner(jaison.results);
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

            index++;
            bannerTimeout = setTimeout(setBanner, 5000);
      }
    }
  
    setBanner();
  }

function updateCircleColors() {
circles.forEach((circle, circleIndex) => {
    if (circleIndex === index) {
    circle.classList.add('active');
    } else {
    circle.classList.remove('active');
    }
});
}



function show_movie(jaison) {
  new_movies.innerHTML = "";

  jaison.forEach((movie) => {
    const comic_inf = document.createElement("div");
    const { title, overview, poster_path } = movie;

    comic_inf.classList.add("movie-card");

    let truncatedDescription = overview.substring(0, maxLength) + " ...";

    comic_inf.innerHTML = `
      <img src="${IMG_PATH + poster_path}" alt="Movie 3">
      <div class="text">
          <h3>${title}</h3>
          <p>${truncatedDescription}</p>
      </div>
      <a href="#" class="btn">Rent Now</a>
    `;

    new_movies.appendChild(comic_inf);
  });
  const picture_banner = IMG_PATH + jaison[0].backdrop_path;
  divElement.style.backgroundImage = `url(${picture_banner})`;
}

function show_soon(jaison) {
    soon_movies.innerHTML = "";
  
    jaison.forEach((movie) => {
        console.log(movie);
      const comic_inf = document.createElement("div");
      const { title, overview, poster_path } = movie;
  
      comic_inf.classList.add("movie-card");
  
      let truncatedDescription = overview.substring(0, maxLength) + " ...";
  
      comic_inf.innerHTML = `
        <img src="${IMG_PATH + poster_path}" alt="Movie 3">
        <div class="text">
            <h3>${title}</h3>
            <p>${truncatedDescription}</p>
        </div>
        <a href="#" class="btn">Rent Soon</a>
      `;
  
      soon_movies.appendChild(comic_inf);
    });
    const picture_banner = IMG_PATH + jaison[0].backdrop_path;
    divElement.style.backgroundImage = `url(${picture_banner})`;
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
    clearTimeout(bannerTimeout); 
    importBanner(API_URL_POP);
  });
  
right.addEventListener("click", function() {
    clearTimeout(bannerTimeout); 
    importBanner(API_URL_POP);
});
