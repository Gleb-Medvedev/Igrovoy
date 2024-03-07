// const header = document.querySelector('.header');
// const main = document.querySelector('.main');

const mainBannerSlider = new Swiper('.swiper', {
    direction: 'horizontal',
    loop: true,
    autoplay: {
      delay: 5000,
    },
    slidesPerView: 1,
    speed: 1000,
    effect: 'fade',
    fadeEffect: {
      crossFade: true
    },

    navigation: {
        nextEl: '.main-banner__headliner-next-btn',
        prevEl: '.main-banner__headliner-prev-btn',
      },

      pagination: {
        el: '.headliner-pagination',
        renderBullet: function(index, className) {
            return '<span class="' + className + ' headliner-pagination__bullet"><svg width="26" height="26" viewBox="0 0 28 28"><circle class="svg__circle" cx="14" cy="14" r="12" stroke-width="2"></circle><circle class="svg__circle-inner" cx="14" cy="14" r="6" stroke-width="2"></circle></svg></span>'
        },
    },
});

{/* <svg width="26" height="26" viewBox="0 0 28 28"><circle class="svg__circle" cx="14" cy="14" r="12" stroke-width="2"></circle><circle class="svg__circle-inner" cx="14" cy="14" r="6" stroke-width="3"></circle></svg> */}

//reseive data from local JSON Server.

//Type "npm run server"

let dataBase; //Глобальная переменная, хранящая данные

async function getDataBase(url, reseivedData) {

  try {
    reseivedData = await fetch(url);
  } catch (err) {
    // alert(`Ошибка базы данных: ${err}\nДля запуска локального сервера используйте "npm run server"`);
    return;
  }

  dataBase = await reseivedData.json();
}

document.addEventListener('DOMContentLoaded', async () => {
  await getDataBase('http://localhost:3000/products');
  dataBase ? console.log(dataBase) : console.log('Ошибка получения данных из базы');
})

//reseive data from local JSON Server -- ENDS

//колхозный лайв поиск

function searchBarToggle(searchBtn) {
  searchBtn.addEventListener('click', () => {
    document.querySelector('.search-popup').classList.toggle('in-view');
    document.querySelector('body').style.overflow = "hidden";

    if (!dataBase) {
      searchInput.placeholder = 'Поиск недоступен! Отсутствуют данные из базы данных! "npm run server" для запуска локального сервера'
    }
  })
}

searchBarToggle(document.querySelector('.bottom-bar__search-bar'));

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


//колхозный лайв поиск -- ENDS

const focusBlock = document.querySelector('.focus-block');

// focusBlock.classList.contains('focused') ? focusBlock.classList.remove('focused') : focusBlock.classList.add('focused');

//ФУНКЦИЯ ВЫЗОВА HEADER CONTACTS

function toggleHeaderContacts (list, listItems) {
  list.classList.toggle('in-view');

  if (list.classList.contains('in-view')) {
    listItems.forEach((el, index) => {
      el.style.transitionDelay = `${(index + 1) * 75}ms`
    })
  } else {
    listItems.forEach((el, index) => {
      el.style.transitionDelay = `${(listItems.length - index) * 75}ms`
    })
  }
}

document.querySelector('.contacts-btn').addEventListener('click', () => {
  toggleHeaderContacts(document.querySelector('.bottom-bar__contacts'), document.querySelectorAll('.contacts__list-item'));
})

//ФУНКЦИЯ ВЫЗОВА HEADER CONTACTS -- ENDS