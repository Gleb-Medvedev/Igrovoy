// Main Banner Slider

const mainBannerSlider = new Swiper('.headliner-slider', {
    direction: 'horizontal',
    loop: true,
    grabCursor: true,
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

// Advantages Slider

const advantagesSlider = new Swiper('.advantages-slider', {
  spaceBetween: 20,
  loop: true,
  speed: 2000,
  grabCursor: true,
  watchSlidesProgress: true,
  autoplay: {
    delay: 8000
  },
  breakpoints: {
    0: {
      slidesPerView: 1,
      slidesPerGroup: 1,
      autoplay: {
        delay: 4000
      },
    },
    580: {
      slidesPerView: 2,
      slidesPerGroup: 2,
      autoplay: {
        delay: 8000
      },
    },
    901: {
      slidesPerView: 3,
      slidesPerGroup: 3,
      autoplay: {
        delay: 8000
      },
    },
  },

  on: {
    slideChange: function () {
      this.visibleSlides.forEach((slide, index) => {
        slide.querySelector('.advantages__card_pseudo').style.animation =
        `changePseudoWidth ${this.params.autoplay.delay}ms ease-out ${this.params.speed + (index * 400)}ms 1 forwards`;

        // slide.querySelector('.advantages__card').style.animation = 
        // `activeSlideBorderColor ${this.params.autoplay.delay}ms ease-in-out ${this.params.speed + (index * 400)}ms 1 forwards`;

        slide.querySelector('.advantages__card-description').style.animation = 
        `descriptionAppearance ${this.params.autoplay.delay}ms ease-out ${this.params.speed + (index * 400)}ms 1 forwards`;
      })
    },
  },
})

const joinSectionSlider = new Swiper('.join-us-slider', {
  direction: 'horizontal',
    loop: true,
    grabCursor: false,
    // autoplay: {
    //   delay: 8000,
    // },
    slidesPerView: 1,
    speed: 1000,
});

//reseive data from local JSON Server.

//Type "npm run server"

let dataBase; //Глобальная переменная, хранящая данные

function getDataBase() {
  document.addEventListener('DOMContentLoaded', async(url) => {
    try {
      url = await fetch('http://localhost:3000/products');
    } catch(err) {
      console.log(err);
      return
    }
    dataBase = await url.json();
    RenderLatestProducts(document.querySelector('.latest-products'));
  })
}

getDataBase();

//Latest Products Section 

function RenderLatestProducts(destination, tmp) {
  for (const product of dataBase) {
    tmp = document.createElement('div');
    tmp.classList.add('latest-products__item', 'product');

    tmp.insertAdjacentHTML('beforeend', 
      `
      <div class="product-top">
          <a href="#" class="product-top__img-link" title="${product.name}">
              <img class="product-top__img thief-color" src="./assets/images/minecraft.jpg" alt="Изображение товара: ${product.name}" crossorigin="anonymous">
          </a>    
      </div>
      <div class="product-body">
          <a href="#" class="product-body__title-link" title="${product.name}">
              <span class="product-body__title-inner">${product.name}</span>
          </a>
          <div class="product-info" title="Количество товара">
              ${product.quantity >= 1 ? product.quantity.textContent = 'В наличии' : product.quantity.textContent = 'Нет в наличии!'}
          </div>
          <div class="product-body__btn-container" title="Добавить ${product.name} в корзину!">
              <button class="product-body__btn-inner">В корзину!</button>
          </div>
      </div> 
      `
    )
    destination.append(tmp);
    // const test = tmp.querySelector('.thief-color');
    // const wrapp = tmp.closest('.latest-products__item');
    // console.log(test);
    // console.log(wrapp);
    // ChangeBg(test, wrapp);
  }
}

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

function toggleHeaderContacts(list, listItems) {
  list.classList.toggle('in-view');

  if (list.classList.contains('in-view')) {
    listItems.forEach((el, index) => {
      el.style.transitionDelay = `${(index + 1) * 75}ms`;
    })
  } else {
    listItems.forEach((el, index) => {
      el.style.transitionDelay = `${(listItems.length - index) * 75}ms`;
    })
  }
}

document.querySelector('.contacts-btn').addEventListener('click', () => {
  toggleHeaderContacts(document.querySelector('.bottom-bar__contacts'), document.querySelectorAll('.contacts__list-item'));
})

//ФУНКЦИЯ ВЫЗОВА HEADER CONTACTS -- ENDS




function ToggleHeaderAction(arr) {
  arr.forEach(action => {
    action.addEventListener('click', () => {
      arr.forEach(el => {
        if (el !== action) {
          el.classList.remove('active');
        }
      })
      action.classList.toggle('active');
    })
  })
}

ToggleHeaderAction(document.querySelectorAll('.header-action'));