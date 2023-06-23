const page_name = document.getElementById("page_name");
const namei = document.getElementById("title");
const poster = document.getElementById("poster");
const videoFrame = document.getElementById("videoFrame");
const minus = document.getElementById("minus");
const plus = document.getElementById("plus");
const add_cart = document.getElementById("add_cart");
const week = document.getElementById("week");
const value = document.getElementById("value");
const price = document.getElementById("price");
const other_rent_div = document.getElementById("other_rent");
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
const moveLeftBtn1 = document.getElementById('move-left1');
const moveRightBtn1 = document.getElementById('move-right1');
const clickers = document.getElementById('clickers');
const titles = document.getElementById('titles');
const movie_list_rec = document.getElementById('movie-list-rec');
const recomend = document.getElementById('recomend');
const trailer = document.getElementById('trailer');
const titles2 = document.getElementById('titles2');
let wid;



const product = localStorage.getItem("product");
const productInfo = JSON.parse(product);

const apiKey = '225e69e6fd6663b3c629a8ea6adf8d7c';
const IMG_PATH = "https://image.tmdb.org/t/p/w1280/";
const genre_url = 'https://api.themoviedb.org/3/genre/movie/list?api_key=225e69e6fd6663b3c629a8ea6adf8d7c'

const movie_id = productInfo.id;

let media_typee = "";
if(productInfo.media_type === "" || typeof productInfo.media_type === "undefined"){
  const tpy = localStorage.getItem("type");
  localStorage.removeItem("type")
  const tp = JSON.parse(tpy);
  media_typee = tp;
}
else{
  media_typee = productInfo.media_type;
}

const API_URL_OTHER_RENT = `https://api.themoviedb.org/3/movie/${movie_id}/watch/providers?api_key=225e69e6fd6663b3c629a8ea6adf8d7c`;


const genreNames = [];
const maxLength = 280;
let isSearchBarVisible = false;
let isDropVisible = false;
let isCastBarVisible = false;


importMovieVideo();
other_rent(API_URL_OTHER_RENT);



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
    importRec();
    
}

async function importMovieVideo() {
    let API_URL_video = "";
    API_URL_video = `https://api.themoviedb.org/3/movie/${movie_id}/videos?api_key=225e69e6fd6663b3c629a8ea6adf8d7c`;
    if(media_typee === "tv"){
      API_URL_video = `https://api.themoviedb.org/3/tv/${movie_id}/videos?api_key=225e69e6fd6663b3c629a8ea6adf8d7c`;
    }
    const data = await fetch(API_URL_video);
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
  const data = await fetch(API_CAST);
  const data2 = await fetch(data.url);
  const jaison_cast = await data2.json();
  show_cast(jaison_cast.cast);
  
}

async function other_rent(url){
  const data = await fetch(url);
  const data2 = await fetch(data.url);
  const jaison_other = await data2.json();
  const jaison = jaison_other.results.US.rent;
  const link_tmdb = jaison_other.results.US.link;
  show_other_rent(jaison, link_tmdb);

}

async function importRec() {
  let API_URL_REC = "";
  API_URL_REC = `https://api.themoviedb.org/3/movie/${movie_id}/recommendations?api_key=225e69e6fd6663b3c629a8ea6adf8d7c`;
  if(media_typee === "tv"){
    API_URL_REC = `https://api.themoviedb.org/3/tv/${movie_id}/recommendations?api_key=225e69e6fd6663b3c629a8ea6adf8d7c`;
  }
  const data = await fetch(API_URL_REC);
  const data2 = await fetch(data.url);
  const jaison = await data2.json();
  show_rec(jaison.results);
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
    let API_CAST = "";
    API_CAST = `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${apiKey}`;
    if(media_typee === "tv"){
      API_CAST = `https://api.themoviedb.org/3/tv/${id}/credits?api_key=${apiKey}`;
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


    if(media_typee === "tv"){
      const first_air_dat = parseInt(first_air_date.slice(0, 4), 10)
      const date1 = new Date(first_air_date);
      const date2 = new Date(new Date().toISOString().split('T')[0]);
        if(currentYear === first_air_date.slice(0, 4)){
          price.textContent = "10";
      }
      if(first_air_dat < 2023 && first_air_dat > 2000 ){
          price.textContent = "8";
      }

      if(first_air_dat < 2001){
          price.textContent = "5";
      }
      if (date2 < date1) {
        value.textContent = "";
        price.textContent = "Coming Soon";
        plus.disabled = true;
        minus.disabled = true;
        add_cart.disabled = true;
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
      const date1 = new Date(release_date);
      const date2 = new Date(new Date().toISOString().split('T')[0]);
        if(currentYear === release_date.slice(0, 4)){
          price.textContent = "10";
      }
        if(release_date_int < 2023 && release_date_int > 2000 ){
            price.textContent = "8";
        }

        if(release_date_int < 2001){
            price.textContent = "5";
        }
        if (date2 < date1) {
          value.textContent = "";
          price.textContent = "Coming Soon";
          plus.disabled = true;
          minus.disabled = true;
          add_cart.disabled = true;
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
  if(typeof jaison == 'undefined' || jaison.length === 0){
    trailer.style.display = "none";
  }
  else{
    let key_one;
    jaison.forEach((movie) => {
        const { name, key } = movie;
        if (name.includes("trailer") || name.includes("Trailer") || name.includes("teaser") || name.includes("Teaser")){
            key_one = key;
            
        }
      });
    videoFrame.src = "https://www.youtube.com/embed/" + key_one + "?autoplay=1";
  }
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


  function show_other_rent(jaison, redirecter){
    const jaison2 = jaison.slice(0, 8);
    other_rent_div.innerHTML = "";

    jaison2.forEach((each) => {
      const comic_inf = document.createElement("div");

      comic_inf.classList.add("logo_box");
      comic_inf.classList.add("flex_centerer");

      comic_inf.innerHTML = `
        <img src="${IMG_PATH + each.logo_path}" alt="Movie 3">
      `;
      if (each.logo_path === null) {
        console.log('not enough info');
      }else{
        other_rent_div.appendChild(comic_inf);
      }

      comic_inf.addEventListener("click", () => {
        window.location = `${redirecter}`;
      });
    });
  }


  function show_rec(jaison){
    movie_list_rec.innerHTML = "";
    if(typeof jaison == 'undefined' || jaison.length === 0){
      recomend.style.display = "none";
      titles2.style.display = "none";
    }
    else{
   
      jaison.forEach((each) => {
        let titl = each.title;
        if(media_typee === "tv"){
          titl = each.name;
        }
        const comic_inf = document.createElement("div");
  
        let truncatedDescription = each.overview.substring(0, maxLength) + " ...";
    
        comic_inf.classList.add("actor-card");
    
        comic_inf.innerHTML = `
          <div class="poster">
            <img src="${IMG_PATH + each.poster_path}" alt="Movie 3">
          </div>
          <div class="text">
              <h3 class="name">${titl}</h3>
              <p class="desc">${truncatedDescription}</p>
          </div>
        `;
        if (each.poster_path === null) {
          console.log('not enough info');
        }else{
          movie_list_rec.appendChild(comic_inf);
        }
    
        comic_inf.addEventListener("click", () => {
          localStorage.setItem("product", JSON.stringify(each));
          window.location = "./product.html";
        });
      });
      const containerWidth = document.querySelector('.actor-card').clientWidth;
      wid = containerWidth;
    }
    
    
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
    titles.style.display = "none";
    isCastBarVisible = false;
  } else {
    new_movies.style.display = "flex";
    clickers.style.display = "flex";
    titles.style.display = "flex";
    isCastBarVisible = true;
  }
  importCastFull();
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

moveLeftBtn1.addEventListener('click', () => {
  const itemWidth = wid; 
  const containerWidth = movie_list_rec.clientWidth;
  const scrollAmount = Math.floor(containerWidth / itemWidth) * itemWidth / 2;
  
  movie_list_rec.scrollBy({ left: -scrollAmount, behavior: 'smooth' }); 
});

moveRightBtn1.addEventListener('click', () => {
  const itemWidth = wid;
  const containerWidth = movie_list_rec.clientWidth;
  const scrollAmount = Math.floor(containerWidth / itemWidth) * itemWidth / 2; 
  
  movie_list_rec.scrollBy({ left: scrollAmount, behavior: 'smooth' });
});

