const header = document.querySelector('.header');
const main = document.querySelector('.main');

// function headerInWiew() {
//     window.addEventListener('scroll', () => {
//         main.style.marginTop = header.offsetHeight + "px";

//         if (window.scrollY >= header.offsetHeight) {
//             header.classList.add('header_in-view');
//             main.style.marginTop = header.offsetHeight + "px";
//         } else {
//             header.classList.remove('header_in-view');
//         }
//     })
// }

// headerInWiew();

const swiper = new Swiper('.swiper', {
    direction: 'horizontal',
    loop: true,
    autoplay: true,
    slidesPerView: 1,
    spaceBetween: 20,
    allowTouchMove: false,
    speed: 1700,
});