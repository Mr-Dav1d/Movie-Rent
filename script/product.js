const page_name = document.getElementById("page_name");
const name = document.getElementById("title");
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


const product = localStorage.getItem("product");
const productInfo = JSON.parse(product);

const IMG_PATH = "https://image.tmdb.org/t/p/w1280/";
const genre_url = 'https://api.themoviedb.org/3/genre/movie/list?api_key=225e69e6fd6663b3c629a8ea6adf8d7c'

const movie_id = productInfo.id;
const API_URL_video = `https://api.themoviedb.org/3/movie/${movie_id}/videos?api_key=225e69e6fd6663b3c629a8ea6adf8d7c`;


const genreNames = [];









importMovieVideo(API_URL_video);

async function importGenre(url, movie_genre) {
    const data = await fetch(url);
    const data2 = await fetch(data.url);
    const jaison = await data2.json();
    genre_getter(jaison, movie_genre);
    show_product(productInfo, genreNames);
    console.log(productInfo)
    
}

async function importMovieVideo(url) {
    const data = await fetch(url);
    const jaison = await data.json();
    const video = jaison.results; 
    importGenre(genre_url, productInfo.genre_ids);
    show_video(video);
    
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

function show_product(jaison, genreNames) {
    const currentYear = new Date().toISOString().split('T')[0].slice(0, 4);
    const { title, release_date, poster_path, original_language, backdrop_path, vote_average, overview } = jaison;
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
    name.textContent = title;
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
    if (score < 5.0) {
        user_score.classList.add("low");
    } else if (score >= 5.0 && score < 8.0) {
        user_score.classList.add("medium");
    } else {
        user_score.classList.add("high");
    }
    console.log(productInfo);

    description.innerText = overview;
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


