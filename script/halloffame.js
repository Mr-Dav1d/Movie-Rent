const searchIcon = document.getElementById("search-icon");
const searchBar = document.getElementById("search");
const input = document.getElementById("input");
const menuIcon = document.querySelector('.menu-icon');
const dropdownContent = document.querySelector('.dropdown-content');
const logo = document.getElementById('logo');
const new_movies = document.getElementById("movie-list");

const IMG_PATH = "https://image.tmdb.org/t/p/w1280/";
const apiKey = '225e69e6fd6663b3c629a8ea6adf8d7c';


const maxLength = 280;
let index = 0;
let isSearchBarVisible = false;
let isDropVisible = false;

const HOF_list = [
    {
      id: 335984,
      name: "Blade Runner 2049",
      type: "movie"
    },
    {
      id: 155,
      name: "The Dark Knight",
      type: "movie"
    },
    {
      id: 558,
      name: "Spider-Man 2",
      type: "movie"
    },
    {
      id: 577922,
      name: "Tenet",
      type: "movie"
    },
    {
      id: 489,
      name: "Good Will Hunting",
      type: "movie"
    },
    {
      id: 101,
      name: "Léon: The Professional",
      type: "movie"
    },
    {
      id: 122,
      name: "The Lord of the Rings: The Return of the King",
      type: "movie"
    },
    {
      id: 170,
      name: "28 Days Later",
      type: "movie"
    },
    {
      id: 1895,
      name: "Star Wars: Episode III - Revenge of the Sith",
      type: "movie"
    },
    {
      id: 263115,
      name: "Logan",
      type: "movie"
    },
    {
      id: 103663,
      name: "The Hunt",
      type: "movie"
    },
    {
      id: 77338,
      name: "The Intouchables",
      type: "movie"
    },
    {
      id: 185,
      name: "A Clockwork Orange",
      type: "movie"
    },
    {
      id: 165,
      name: "Back to the Future Part II",
      type: "movie"
    },
    {
      id: 78,
      name: "Blade Runner",
      type: "movie"
    },
    {
      id: 36557,
      name: "Casino Royale",
      type: "movie"
    },
    {
      id: 46298,
      name: "Hunter x Hunter",
      type: "tv"
    },
    {
      id: 62699,
      name: "The Young Pope",
      type: "tv"
    },
    {
      id: 70453,
      name: "Sharp Objects",
      type: "tv"
    },
    {
      id: 76479,
      name: "The Boys",
      type: "tv"
    },
    {
      id: 60059,
      name: "Better Call Saul",
      type: "tv"
    },
    {
      id: 1405,
      name: "Dexter",
      type: "tv"
    },
    {
      id: 40008,
      name: "Hannibal",
      type: "tv"
    },
    {
      id: 61223,
      name: "Akame ga Kill!",
      type: "tv"
    },
    {
      id: 61459,
      name: "Parasyte",
      type: "tv"
    },
    {
      id: 42589,
      name: "Another",
      type: "tv"
    }

  ];

  HoF(HOF_list);


async function search_info(url, type) {
    const data = await fetch(url);
    const jaison = await data.json();
    searched_shower(jaison, type)
}

function searched_shower(jaison, type){
  if(type === "tv"){
    const { overview, poster_path, name} = jaison;
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
      localStorage.setItem("product", JSON.stringify(jaison));
      localStorage.setItem("type", JSON.stringify("tv"));
      window.location = "./product.html";
    });
  }
  else{
    const { title, overview, poster_path} = jaison;
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
    
    if (poster_path === null || poster_path === undefined) {
      console.log('not enough info');
    }else{
      new_movies.appendChild(comic_inf);
    }
    

    comic_inf.addEventListener("click", () => {
      localStorage.setItem("product", JSON.stringify(jaison));
      localStorage.setItem("type", JSON.stringify("movie"));
      window.location = "./product.html";
    });
  }
}

function HoF(jason){
    new_movies.innerHTML = "";
    jason.forEach(element => {
      if(element.type === "tv"){
        const type = element.type;
        const tv_url = `https://api.themoviedb.org/3/${type}/${element.id}?api_key=${apiKey}`;
        search_info(tv_url , type);
      }
      else{
        const type = element.type;
        const movie_url =  `https://api.themoviedb.org/3/${type}/${element.id}?api_key=${apiKey}`;
        search_info(movie_url, type);
      }
      
    });
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


  //clicks


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
      const input = document.getElementById('input');
      const query = input.value;
      localStorage.setItem("searched_word", JSON.stringify(query));
      window.location = "./explore.html";
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
      window.location = "../index.html";
  });