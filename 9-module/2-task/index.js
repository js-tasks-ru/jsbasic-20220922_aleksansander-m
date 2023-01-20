import Carousel from '../../6-module/3-task/index.js';
import slides from '../../6-module/3-task/slides.js';

import RibbonMenu from '../../7-module/1-task/index.js';
import categories from '../../7-module/1-task/categories.js';

import StepSlider from '../../7-module/4-task/index.js';
import ProductsGrid from '../../8-module/2-task/index.js';

import CartIcon from '../../8-module/1-task/index.js';
import Cart from '../../8-module/4-task/index.js';

export default class Main {

  constructor() {
    
  }

  async render() {
    
    let reponse = await fetch('products.json');

    let productsJson = await reponse.json();

   
    let productsArray = productsJson;//JSON.parse(productsJson);
    
    
    this.carousel = new Carousel(slides);
    let carouselHolder = document.querySelector("[data-carousel-holder]");
    carouselHolder.appendChild(this.carousel.elem); 

    let ribbonHolder = document.querySelector("[data-ribbon-holder]");
    this.ribbonMenu = new RibbonMenu(categories);
    ribbonHolder.appendChild(this.ribbonMenu.elem);
    
    let sliderHolder = document.querySelector("[data-slider-holder]");
    this.stepSlider = new StepSlider({ steps:5, value: 3});
    sliderHolder.appendChild(this.stepSlider.elem);

    let cartIconHolder = document.querySelector("[data-cart-icon-holder]");
    this.cartIcon = new CartIcon();
    cartIconHolder.appendChild(this.cartIcon.elem);

    this.cart = new Cart(this.cartIcon);

    this.productsGrid = new ProductsGrid(productsArray);
    let productsGridHolder = document.querySelector("[data-products-grid-holder]");

    productsGridHolder.querySelector('.products-grid').remove();
    productsGridHolder.appendChild(this.productsGrid.elem);


    this.productsFilter = {
      noNuts: document.getElementById('nuts-checkbox').checked,
      vegeterianOnly: document.getElementById('vegeterian-checkbox').checked,
      maxSpiciness: this.stepSlider.value,
      category: this.ribbonMenu.value
    };


    this.productsGrid.updateFilter(this.productsFilter); //???

    document.body.addEventListener('product-add', event => {

      this.cart.addProduct(event.detail);

    });

    this.stepSlider.elem.addEventListener('slider-change', event => {
      this.productsFilter.maxSpiciness = event.detail; // значение остроты из события 'slider-change'
      
      this.productsGrid.updateFilter(this.productsFilter);
      
    });

    this.ribbonMenu.elem.addEventListener('ribbon-select', event => {
      this.productsFilter.category = event.detail; // категория из события 'ribbon-select'
      
      this.productsGrid.updateFilter(this.productsFilter);
    });

    
    document.body.addEventListener('change', event => {
      
      let checkboxId = event.target.id;
      let checked = event.target.checked;

      if (checkboxId == 'nuts-checkbox') {
        this.productsFilter.noNuts = checked;
      };

      if (checkboxId == 'vegeterian-checkbox') {
        this.productsFilter.vegeterianOnly = checked;
      };
      this.productsGrid.updateFilter(this.productsFilter);
     ;
    });

  
  }
}
