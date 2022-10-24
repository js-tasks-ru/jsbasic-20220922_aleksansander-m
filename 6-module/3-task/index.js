import createElement from '../../assets/lib/create-element.js';

export default class Carousel {
  constructor(slides) {
    
    this.slides = slides;

    let elem = createElement(makeElemenText(slides));
    this.elem = elem;

    elem.dataset.stepN = 1;


    






















    
    let plusBtns = elem.querySelectorAll('.carousel__button');

    for (const btn of plusBtns) {
      
      btn.addEventListener('click', event =>{
        
        let productAddEvent = new CustomEvent('product-add', {
          detail: btn.dataset.id,
          bubbles: true, 
        });
        elem.dispatchEvent(productAddEvent);
      });
    }

    elem.addEventListener('product-add', event =>{
      console.log(event.detail);
    })
    
  





    










































    function makeElemenText(slides) {
    
      let n = 1;

      let sText = slides.map(slide => `
      
      <!--Верстка ${n++}-ого слайда-->
      <div class="carousel__slide" data-id="${slide.id}">
        <img src="/assets/images/carousel/${slide.image}" class="carousel__img" alt="slide">
        <div class="carousel__caption">
          <span class="carousel__price">€${slide.price}</span>
          <div class="carousel__title">${slide.name}</div>
          <button type="button" class="carousel__button" data-id = "${slide.id}">
            <img src="/assets/images/icons/plus-icon.svg" alt="icon">
          </button>
        </div>
      </div>
      
      `).join('');
  
      sText = `
      <!--Корневой элемент карусели-->
      <div class="carousel">
      <!--Кнопки переключения-->
      <div class="carousel__arrow carousel__arrow_right">
        <img src="/assets/images/icons/angle-icon.svg" alt="icon">
      </div>
      <div class="carousel__arrow carousel__arrow_left">
        <img src="/assets/images/icons/angle-left-icon.svg" alt="icon">
      </div>
  
      <div class="carousel__inner">
  
      ${sText}
  
      </div>
      </div>
      `; 
      
      return sText;


    }


  }
}
