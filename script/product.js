const page_name = document.getElementById("page_name");
const name = document.getElementById("title");
const poster = document.getElementById("poster");
const videoFrame = document.getElementById("videoFrame");
const minus = document.getElementById("minus");
const plus = document.getElementById("plus");
const week = document.getElementById("week");
const price = document.getElementById("price");

const product = localStorage.getItem("product");
const productInfo = JSON.parse(product);

const IMG_PATH = "https://image.tmdb.org/t/p/w1280/";

const movie_id = productInfo.id;
const API_URL_video = `https://api.themoviedb.org/3/movie/${movie_id}/videos?api_key=225e69e6fd6663b3c629a8ea6adf8d7c`;









importMovieVideo(API_URL_video);
show_product(productInfo);

async function importMovieVideo(url) {
    const data = await fetch(url);
    const jaison = await data.json();
    const firstFourMovies = jaison.results; 
    show_video(firstFourMovies);
    
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

function show_product(jaison) {
    const currentYear = new Date().toISOString().split('T')[0].slice(0, 4);
    const { title, release_date, poster_path } = jaison;
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
    
    poster.style.backgroundImage = `url(${IMG_PATH + poster_path})`;
    name.textContent = title;
    page_name.textContent = title;
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