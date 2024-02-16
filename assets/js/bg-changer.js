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

      image.closest('div').style.backgroundColor = 
         'rgb(' + R + 
            ',' + G + 
            ',' + B + ')';
   })
}

document.addEventListener('DOMContentLoaded', () => {
   changeBgColor(document.querySelectorAll('.thief-color'));
})