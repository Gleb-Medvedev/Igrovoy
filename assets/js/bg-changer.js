const colorThief = new ColorThief();

function changeBgColor(images) {

   if (!images.length) {
      console.log('Нет объектов для применения "Color-thief"');
      return;
   }

   images.forEach(async (image, R, G, B) => {

      await colorThief.getColor(image);

      R = colorThief.getColor(image)[0];
      G = colorThief.getColor(image)[1];
      B = colorThief.getColor(image)[2];

      image.closest('.latest-products__item').style.backgroundColor = 
         'rgb(' + R + 
            ',' + G + 
            ',' + B + ')';
   })   
}

document.addEventListener('DOMContentLoaded', () => {
   changeBgColor(document.querySelectorAll('.thief-color'));
})

// document.querySelector('.test').addEventListener('click', () => {
//    changeBgColor(document.querySelectorAll('.thief-color'));
//    console.log('Клик');
// })





// function ChangeBg(arr) {
//    arr.forEach(async (image, R, G, B) => {
//       await colorThief.getColor(image);

//       R = colorThief.getColor(image)[0];
//       G = colorThief.getColor(image)[1];
//       B = colorThief.getColor(image)[2];

//       image.closest('.latest-products__item').style.backgroundColor = 
//             'rgb(' + R + 
//                ',' + G + 
//                ',' + B + ')';
//    })
// }





// async function ChangeBg(img, wrapper, R, G, B) {
//    await colorThief.getColor(img);
   

//    R = colorThief.getColor(img)[0];
//    G = colorThief.getColor(img)[1];
//    B = colorThief.getColor(img)[2];

//    wrapper.style.backgroundColor = 
//       'rgb(' + R + 
//          ',' + G + 
//          ',' + B + ')'; 
// }