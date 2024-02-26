const header = document.querySelector('.header');
const main = document.querySelector('.main');

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

// document.querySelector('.bottom-bar__search-bar').addEventListener('click', () => {
//   document.querySelector('.bottom-bar__search-bar').classList.toggle('active');
// })

// document.querySelector('.bottom-bar__menu-btn').addEventListener('click', () => {
//   document.querySelector('.bottom-bar__menu-btn').classList.toggle('active');
// })

document.querySelector('.bottom-bar__feedback').addEventListener('click', () => {
  document.querySelector('.bottom-bar__feedback').classList.toggle('active');
})