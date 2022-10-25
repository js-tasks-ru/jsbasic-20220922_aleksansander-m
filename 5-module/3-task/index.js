

function initCarousel() {

  let arrowRight = document.querySelector('.carousel__arrow_right');
  
  //let arrowLeft  = document.querySelector('.carousel__arrow_left');

  //arrowRight.addEventListener('click', swichImage);
  
  //arrowLeft.addEventListener('click', swichImage);
  let elem = document.querySelector('.container');
  
  elem.addEventListener('click', swichImage);
  
  elem.dataset.stepN = 0;

  arrowRight.style.display = 'none';

  setArowsVisibility();

}

function swichImage(event) {

  let elem = document.querySelector('.container');
  
  let stepN = Number(elem.dataset.stepN);

  let carouselInner = document.querySelector('.carousel__inner');

  const offsetWidth = carouselInner.offsetWidth;

  let arrow = event.target.closest('div');

      let direction = 0;
      if ( arrow.className.endsWith('right') ) {
        direction = 1;  
      } else if ( arrow.className.endsWith('left') ){
        direction = -1;   
      } else {
        return;
      }

  stepN = stepN + direction;

  let offsetWidthPx = String ( -stepN * offsetWidth) + 'px';

  carouselInner.style.transform = `translateX(${offsetWidthPx})`;

  elem.dataset.stepN = stepN;

  setArowsVisibility();
}

function setArowsVisibility() {

  let elem = document.querySelector('.container');
  
  let stepN = Number(elem.dataset.stepN);
  
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