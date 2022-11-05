import createElement from '../../assets/lib/create-element.js';

export default class RibbonMenu {
  constructor(categories) {
    this.categories = categories;
    
    let elem = makeRibbon();
    this.elem = elem;

    

    let arrowLeft = elem.querySelector('.ribbon__arrow_left');
    let arrowRight = elem.querySelector('.ribbon__arrow_right');
    let ribbonInner = elem.querySelector('.ribbon__inner');

    elem.addEventListener('click', ribbonListener);
    ribbonInner.addEventListener('scroll', setArrowVisibility);
    ribbonInner.addEventListener('click', setCurrentCategory);

    arrowLeft.classList.remove('ribbon__arrow_visible');
    arrowRight.classList.add('ribbon__arrow_visible');

    function setCurrentCategory(event) {
     
      event.preventDefault(); 

      let newCat = event.target;
      let oldCat = elem.querySelector('.ribbon__item_active');
      
      if (! (oldCat === null)) {
        oldCat.classList.remove('ribbon__item_active');
      }

      newCat.classList.add('ribbon__item_active');
      
      let setEvent = new CustomEvent('ribbon-select', { 
        detail: newCat.dataset.id, 
        bubbles: true 
      });

      elem.dispatchEvent(setEvent);

    }


    function setArrowVisibility(event) {

      let scrollLeft = ribbonInner.scrollLeft;
      let scrollRight = ribbonInner.scrollWidth 
        - scrollLeft 
        - ribbonInner.clientWidth;

      if (scrollRight < 1) {
        arrowRight.classList.remove('ribbon__arrow_visible');   
      } else {
        arrowRight.classList.add('ribbon__arrow_visible'); 
      };

      
      if (scrollLeft < 1) {
        arrowLeft.classList.remove('ribbon__arrow_visible');   
      } else {
        arrowLeft.classList.add('ribbon__arrow_visible');   
      }

    }


    function ribbonListener(event) {

      let direction = 0;
      let offset = 350;

      if (event.target.closest('.ribbon__arrow_left') == arrowLeft) {
        direction = -1;
      } else if (event.target.closest('.ribbon__arrow_right') == arrowRight) {
        direction = 1;
      } else {
        return;
      }

      ribbonInner.scrollBy(direction * offset, 0);

    };


    /*--------------------------------------------------*/

    function makeRibbon() {

      let textHref = categories.map(item =>{
        return `<a href="#" class="ribbon__item" data-id="${item.id}">${item.name}</a>`;
      }).join('');
      
      let textRibbon = `
      <div class="ribbon">
      <!--Кнопка прокрутки влево-->
      <button class="ribbon__arrow ribbon__arrow_left ribbon__arrow_visible">
        <img src="/assets/images/icons/angle-icon.svg" alt="icon">
      </button>
  
      <!--Ссылки на категории-->
      <nav class="ribbon__inner">
      ${textHref}
      </nav>

      <!--Кнопка прокрутки вправо-->
      <button class="ribbon__arrow ribbon__arrow_right">
        <img src="/assets/images/icons/angle-icon.svg" alt="icon">
      </button>
      </div>
      `;

      return createElement (textRibbon);
    }
  }
}
