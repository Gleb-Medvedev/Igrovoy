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

//reseive data from local JSON Server.

//Type "npm run server"

let dataBase; //Глобальная переменная, хранящая данные

async function getDataBase(url, reseivedData) {

  try {
    reseivedData = await fetch(url);
  } catch (err) {
    alert(`Ошибка базы данных: ${err}\nДля запуска локального сервера используйте "npm run server"`);
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
  focusBlock.classList.add('focused');

  if (list.classList.contains('in-view')) {
    listItems.forEach((el, index) => {
      setTimeout(function () {
        el.classList.add('visible');
      }, index * 150)
    })
  } else {
    focusBlock.classList.remove('focused');
    listItems.forEach((el, index) => {
      setTimeout(function () {
        el.classList.remove('visible');
      }, ((listItems.length - 1) - index) * 150)
    })



  }
  //проверка наличия класса "in-view" для Header__contacts
  //Нужно для удаления класса "visible" для элементов списка при очень быстром клике кнопки отображения всего списка
  setTimeout(function () {
    if (!list.classList.contains('in-view') && listItems[listItems.length - 1].classList.contains('visible')) {
      setTimeout(function () {
        listItems.forEach(el => {
          el.classList.remove('visible');
        })
      }, listItems.length * 150)
    } else if (list.classList.contains('in-view') && !listItems[listItems.length - 1].classList.contains('visible')) {
      setTimeout(function () {
        listItems.forEach(el => {
          el.classList.add('visible');
        })
      }, listItems.length * 150)
    }
  }, listItems.length * 150)
  //проверка наличия класса для Header__contacts -- ENDS
}

document.querySelector('.contacts-btn').addEventListener('click', () => {
  toggleHeaderContacts(document.querySelector('.bottom-bar__contacts'), document.querySelectorAll('.contacts__list-item'));
})

//ФУНКЦИЯ ВЫЗОВА HEADER CONTACTS -- ENDS