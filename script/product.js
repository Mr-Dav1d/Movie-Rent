const page_name = document.getElementById("page_name");
const namei = document.getElementById("title");
const poster = document.getElementById("poster");
const videoFrame = document.getElementById("videoFrame");
const minus = document.getElementById("minus");
const plus = document.getElementById("plus");
const week = document.getElementById("week");
const price = document.getElementById("price");
const genre = document.getElementById("genre");
const date = document.getElementById("date");
const language = document.getElementById("language");
const buy = document.getElementById("buy");
const score = document.getElementById("score");
const user_score = document.getElementById("user_score");
const play_trailer = document.getElementById("play_trailer");
const description = document.getElementById("description");
const searchIcon = document.getElementById("search-icon");
const searchBar = document.getElementById("search");
const input = document.getElementById("input");
const cast = document.getElementById("cast");
const menuIcon = document.querySelector('.menu-icon');
const dropdownContent = document.querySelector('.dropdown-content');
const logo = document.getElementById('logo');
const new_movies = document.getElementById("movie-list");
const seeFull = document.getElementById("seeFull");
const moveLeftBtn = document.getElementById('move-left');
const moveRightBtn = document.getElementById('move-right');
const clickers = document.getElementById('clickers');



const product = localStorage.getItem("product");
const productInfo = JSON.parse(product);

const apiKey = '225e69e6fd6663b3c629a8ea6adf8d7c';
const IMG_PATH = "https://image.tmdb.org/t/p/w1280/";
const genre_url = 'https://api.themoviedb.org/3/genre/movie/list?api_key=225e69e6fd6663b3c629a8ea6adf8d7c'

const movie_id = productInfo.id;
const API_URL_video = `https://api.themoviedb.org/3/movie/${movie_id}/videos?api_key=225e69e6fd6663b3c629a8ea6adf8d7c`;
let media_typee = "";


const genreNames = [];
let isSearchBarVisible = false;
let isDropVisible = false;
let isCastBarVisible = false;




importMovieVideo(API_URL_video);



async function importCast(url){
    const data = await fetch(url);
    const data2 = await fetch(data.url);
    const jaison_cast = await data2.json();
    return jaison_cast.cast;
}

async function importGenre(url, movie_genre) {
    const data = await fetch(url);
    const data2 = await fetch(data.url);
    const jaison = await data2.json();
    genre_getter(jaison, movie_genre);
    show_product(productInfo, genreNames);
    
}

async function importMovieVideo(url) {
    const data = await fetch(url);
    const jaison = await data.json();
    const video = jaison.results; 
    if(productInfo.genre_ids){
      importGenre(genre_url, productInfo.genre_ids);
    }
    else{
      const genreIds = productInfo.genres.map(genre => genre.id);
      importGenre(genre_url, genreIds);
    }
    
    show_video(video);
    
}

async function importCastFull() {
  let API_CAST = "";
  API_CAST = `https://api.themoviedb.org/3/movie/${movie_id}/credits?api_key=${apiKey}`;
  if(media_typee === "tv"){
    API_CAST = `https://api.themoviedb.org/3/tv/${movie_id}/credits?api_key=${apiKey}`;
  }
  if(media_typee === "movie"){
    API_CAST = `https://api.themoviedb.org/3/movie/${movie_id}/credits?api_key=${apiKey}`;
  }
  const data = await fetch(API_CAST);
  const data2 = await fetch(data.url);
  const jaison_cast = await data2.json();
  show_cast(jaison_cast.cast);
  
}





function genre_getter(list, genreIds){
    const genre_lst = list.genres;
    for (const genreId of genreIds) {
      for (const genre of genre_lst) {
        if (genre.id === genreId) {
          genreNames.push(genre.name);
          break;
        }
      }
    }
}

async function show_product(jaison, genreNames) {
    const currentYear = new Date().toISOString().split('T')[0].slice(0, 4);
    const { id,title, release_date, poster_path, original_language, backdrop_path, vote_average, overview, media_type, first_air_date, name} = jaison;
    media_typee = media_type;
    let API_CAST = "";
    API_CAST = `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${apiKey}`;
    if(media_type === "tv"){
      API_CAST = `https://api.themoviedb.org/3/tv/${id}/credits?api_key=${apiKey}`;
    }
    if(media_type === "movie"){
      API_CAST = `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${apiKey}`;
    }
    const castData = await importCast(API_CAST);
    const casti = castData.slice(0, 6);
    let index = 0;

    casti.forEach((each) => {
      index += 1;
      const comic_inf = document.createElement("li");
      comic_inf.classList.add("flex_centerer");
      comic_inf.innerHTML = `
          <img src=${IMG_PATH + each.profile_path}>
          <div class="char flex_centerer">
            <h3>${each.name}</h3>
            <h4>${each.character}</h4>
          </div>
      `;
      comic_inf.addEventListener("click", () => {
        localStorage.setItem("person", JSON.stringify(each.id));
        window.location = "./person.html";
      });

      cast.appendChild(comic_inf);
    });


    if(media_type === "tv"){
      const first_air_dat = parseInt(first_air_date.slice(0, 4), 10)
        if(currentYear === first_air_date.slice(0, 4)){
          price.textContent = "10";
      }
      if(first_air_dat < 2023 && first_air_dat > 2000 ){
          price.textContent = "8";
      }

      if(first_air_dat < 2001){
          price.textContent = "5";
      }
      poster.innerHTML = ` <img src=${IMG_PATH + poster_path} alt="Movie 3"> `;
      date.textContent = first_air_date;
      namei.textContent = name;
      page_name.textContent = name;

      let genre_string = "";
      genreNames.forEach((each) => {
          genre_string += "<li>" + each + ", </li>";
      });
      genre.innerHTML = genre_string;

      language.innerHTML = original_language;

      const picture_banner = IMG_PATH + backdrop_path;
      buy.style.backgroundImage = `url(${picture_banner})`;

      score.textContent = vote_average.toFixed(1);
      if (vote_average < 5) {
          user_score.classList.add("low");
      } else if (vote_average >= 5 && vote_average < 8) {
          user_score.classList.add("medium");
      } else {
          user_score.classList.add("high");
      }

      description.innerText = overview;
    }
    else if(media_type === "person"){
      console.log("thats person")
    }
    else{
      const release_date_int = parseInt(release_date.slice(0, 4), 10)
        if(currentYear === release_date.slice(0, 4)){
          price.textContent = "10";
      }
        if(release_date_int < 2023 && release_date_int > 2000 ){
            price.textContent = "8";
        }

        if(release_date_int < 2001){
            price.textContent = "5";
        }
        poster.innerHTML = ` <img src=${IMG_PATH + poster_path} alt="Movie 3"> `;
        date.textContent = release_date;
        namei.textContent = title;
        page_name.textContent = title;

        let genre_string = "";
        genreNames.forEach((each) => {
            genre_string += "<li>" + each + ", </li>";
        });
        genre.innerHTML = genre_string;

        language.innerHTML = original_language;

        const picture_banner = IMG_PATH + backdrop_path;
        buy.style.backgroundImage = `url(${picture_banner})`;

        score.textContent = vote_average.toFixed(1);
        if (vote_average < 5) {
            user_score.classList.add("low");
        } else if (vote_average >= 5 && vote_average < 8) {
            user_score.classList.add("medium");
        } else {
            user_score.classList.add("high");
        }

        description.innerText = overview;
    }


    
  }





function show_video(jaison){
    let key_one;
    jaison.forEach((movie) => {
        const { name, key } = movie;
        if (name.includes("trailer") || name.includes("Trailer")){
            key_one = key;
            
        }
      });
    videoFrame.src = "https://www.youtube.com/embed/" + key_one + "?autoplay=1";
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



  function show_cast(jaison) {
    new_movies.innerHTML = "";
  
    jaison.forEach((each) => {
      const comic_inf = document.createElement("div");
  
      comic_inf.classList.add("actor-card");
  
      comic_inf.innerHTML = `
        <div class="poster">
          <img src="${IMG_PATH + each.profile_path}" alt="Movie 3">
        </div>
        <div class="text">
            <h3 class="name">${each.name}</h3>
            <p class="desc">${each.character}</p>
        </div>
      `;
      if (each.profile_path === null) {
        console.log('not enough info');
      }else{
        new_movies.appendChild(comic_inf);
      }
  
      comic_inf.addEventListener("click", () => {
        localStorage.setItem("person", JSON.stringify(each.id));
        window.location = "./person.html";
      });
    });
  }





// clicks

minus.addEventListener("click", function() {
    const content_week = week.innerText;
    const intValue_week = parseInt(content_week, 10);

    const content_price = price.innerText;
    const intValue_price = parseInt(content_price, 10);
    if(intValue_week > 1){
        week.textContent = intValue_week - 1;
        price.textContent = intValue_price - (intValue_price / intValue_week);
    }
});

plus.addEventListener("click", function() {
    const content_week = week.innerText;
    const intValue_week = parseInt(content_week, 10);

    const content_price = price.innerText;
    const intValue_price = parseInt(content_price, 10);
    if(intValue_week < 100){
        week.textContent = intValue_week + 1;
        price.textContent = intValue_price + (intValue_price / intValue_week);
    }
});

play_trailer.addEventListener("click", function() {
    const targetSection = videoFrame;
    targetSection.scrollIntoView({ behavior: "smooth" });
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
  if (isCastBarVisible) {
    new_movies.style.display = "none";
    clickers.style.display = "none";
    isCastBarVisible = false;
  } else {
    new_movies.style.display = "flex";
    clickers.style.display = "flex";
    isCastBarVisible = true;
  }
  importCastFull();
});

moveLeftBtn.addEventListener('click', () => {
  new_movies.scrollBy({ left: -700, behavior: 'smooth' }); 
});

moveRightBtn.addEventListener('click', () => {
  new_movies.scrollBy({ left: 700, behavior: 'smooth' }); 
});

