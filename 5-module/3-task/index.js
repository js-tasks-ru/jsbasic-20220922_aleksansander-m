let stepN = 0;

function initCarousel() {

  let arrowRight = document.querySelector('.carousel__arrow_right');
  let arrowLeft  = document.querySelector('.carousel__arrow_left');

  arrowRight.addEventListener('click', swichImage);
  
  arrowLeft.addEventListener('click', swichImage);

  setArowsVisibility();

}

function swichImage(event) {

  let carouselInner = document.querySelector('.carousel__inner');

  const offsetWidth = carouselInner.offsetWidth;

  let direction = event.currentTarget.className.endsWith('right') ? 1 : -1;

  stepN = stepN + direction;

  let offsetWidthPx = String ( -stepN * offsetWidth) + 'px';

  carouselInner.style.transform = `translateX(${offsetWidthPx})`;

  
  setArowsVisibility();

}

function setArowsVisibility() {

  let arrowRight = document.querySelector('.carousel__arrow_right');
  let arrowLeft  = document.querySelector('.carousel__arrow_left');

  
  if (stepN <=0) {
    arrowLeft.style.display = 'none';
  }else {
    arrowLeft.style.display = '';
  };

  if (stepN >= 3) {
    arrowRight.style.display = 'none';
  } else{
    arrowRight.style.display = '';  
  }
  
}