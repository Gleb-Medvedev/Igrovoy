// const header = document.querySelector('.header');
// const main = document.querySelector('.main');

const mainBannerSlider = new Swiper('.swiper', {
    direction: 'horizontal',
    loop: true,
    autoplay: true,
    slidesPerView: 1,
    spaceBetween: 20,
    allowTouchMove: false,
    speed: 1700,

    navigation: {
        nextEl: '.main-banner__headliner-next-btn',
        prevEl: '.main-banner__headliner-prev-btn',
      },
});

//reseive data from local JSON Server

let dataBase; //Глобальная переменная, хранящая данные

async function getDataBase(url) {
  let reseivedData = await fetch(url);

  dataBase = await reseivedData.json();
}

document.addEventListener('DOMContentLoaded', async () => {
  await getDataBase('http://localhost:3000/products');
  console.log(dataBase);
})

// document.querySelector('.bottom-bar__search-bar').addEventListener('click', () => {
//   document.querySelector('.bottom-bar__search-bar').classList.toggle('active');
// })

// document.querySelector('.bottom-bar__menu-btn').addEventListener('click', () => {
//   document.querySelector('.bottom-bar__menu-btn').classList.toggle('active');
// })

// document.querySelector('.bottom-bar__feedback').addEventListener('click', () => {
//   document.querySelector('.bottom-bar__feedback').classList.toggle('active');
// })




function searchBarToggle(searchBtn) {
  searchBtn.addEventListener('click', () => {
    document.querySelector('.search-popup').classList.toggle('in-view');
    document.querySelector('body').style.overflow = "hidden";
  })
}

searchBarToggle(document.querySelector('.bottom-bar__search-bar'));











//Live Search


// searchInput.addEventListener('input', function () {

//   searchResult.innerHTML = '';

//   let value = searchInput.value.toLowerCase();

//   if (this.value && this.value.length > 2) {

//     for (const result of dataBase) {
//       let name = result.name.toLowerCase();

//       if (name.includes(value)) {
//         const tempSearchResult = document.createElement('li');

//         tempSearchResult.innerText = result.name;

//         searchResult.append(tempSearchResult);
//       } 
//     }
//   }
// })




const startSearch = document.querySelector('.search-popup__input-btn');
const searchInput = document.querySelector('.search-popup__input');
const searchOutput = document.querySelector('.search-popup__output-list');
const clearInput = document.querySelector('.search-popup__input-clear');


function liveSearch() {

  const filteredInputValue = searchInput.value.toLowerCase();

    for (const searchResult of dataBase) {

      const filteredSearchResult = searchResult.name.toLowerCase();
      
      if (filteredSearchResult.includes(filteredInputValue)) {
        const tmpSearchResult = document.createElement('li');
  
        tmpSearchResult.innerText = searchResult.name;
  
        searchOutput.append(tmpSearchResult);
      }
    }
}

searchInput.addEventListener('input', () => {
  searchOutput.innerHTML = '';

  liveSearch();

  if (!searchInput.value) {
    searchOutput.innerHTML = 'Начните вводить текст в поле поиска...';
  } else if (searchInput.value.length > 0 && searchInput.value.length < 3) {
    searchOutput.innerHTML = 'Продолжайте вводить текст в поле поиска...';
  }
});

document.querySelector('.popup-close-btn').addEventListener('click', () => {
  document.querySelector('.search-popup').classList.remove('in-view');
  document.querySelector('body').style.overflow = "";
})