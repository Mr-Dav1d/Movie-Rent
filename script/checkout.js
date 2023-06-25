const page_name = document.getElementById("page_name");
const poster = document.getElementById("poster");
const title = document.getElementById("title");
const weeks = document.getElementById("weeks");
const cost = document.getElementById("cost");
const movie_list_rec = document.getElementById('movie-list-rec');
const recomend = document.getElementById('recomend');
const titles2 = document.getElementById('titles2');
const moveLeftBtn1 = document.getElementById('move-left1');
const moveRightBtn1 = document.getElementById('move-right1');
const seeFull = document.getElementById('seeFull');


const apiKey = '225e69e6fd6663b3c629a8ea6adf8d7c';
const IMG_PATH = "https://image.tmdb.org/t/p/w1280/";


const buying = localStorage.getItem("buy_Dictionary");
const buyingInfo = JSON.parse(buying);

const media_typee = buyingInfo.media_type;
const maxLength = 280;
let wid;

shower(buyingInfo);
importRec();

async function importRec() {
    let API_URL_REC = "";
    API_URL_REC = `https://api.themoviedb.org/3/movie/${buyingInfo.id}/recommendations?api_key=225e69e6fd6663b3c629a8ea6adf8d7c`;
    if(media_typee === "tv"){
      API_URL_REC = `https://api.themoviedb.org/3/tv/${buyingInfo.id}/recommendations?api_key=225e69e6fd6663b3c629a8ea6adf8d7c`;
    }
    const data = await fetch(API_URL_REC);
    const data2 = await fetch(data.url);
    const jaison = await data2.json();
    show_rec(jaison.results);
}

function shower(buying_info){
    page_name.textContent = buying_info.title;
    poster.innerHTML = `
    <img src=${IMG_PATH + buying_info.poster}>
    `;
    title.textContent = buying_info.title;
    weeks.textContent = buying_info.weeks;
    cost.textContent = buying_info.price + "$";
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
        comic_inf.classList.add("flex_centerer");
    
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


//clicks

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

seeFull.addEventListener('click', () => {
    window.location = "../index.html";
});