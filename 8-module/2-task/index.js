import createElement from '../../assets/lib/create-element.js';
import ProductCard from '../../6-module/2-task/index.js';

export default class ProductGrid {
  constructor(products) {
    this.products = products;
    this.filters = {};
    this.elem = renderProductsGrid(products);
  }

  updateFilter(filters) {

    let cards = this.elem.querySelectorAll('.mosForSelect')

    for (const prop in filters) {
      this.filters[prop] = filters[prop];
    }

    for (const card of cards) {

      let displaySet = '';

      let curFilt = this.filters;
      let dataset = card.dataset;

      if (
        (curFilt.category !== undefined & curFilt.category !== '' & curFilt.category !== dataset.category) ||
        (curFilt.vegeterianOnly === true & dataset.vegeterian !== 'true') ||
        (Number(dataset.spiciness) > Number(curFilt.maxSpiciness)) ||
        (curFilt.noNuts === true & dataset.nuts == 'true')
      ) {
        displaySet = 'none';
      }

      card.style.display = displaySet;

      if (displaySet == 'none') {
        card.classList.remove('card');
      } else if (!card.classList.contains('card')) {
        card.classList.add('card');
      }
    }
  }
}


function renderProductsGrid(products) {

  let elem = createElement(`
  <div class="products-grid">
    <div class="products-grid__inner">
    </div>
  </div>
  `);

  let inner = elem.querySelector('.products-grid__inner');
  for (const product of products) {
    let card = new ProductCard(product).elem;
    card.dataset.id = product.id;
    card.dataset.nuts = product.nuts;
    card.dataset.vegeterian = product.vegeterian;
    card.dataset.spiciness = product.spiciness;
    card.dataset.category = product.category;
    card.classList.add('mosForSelect');

    inner.appendChild(card);
  }
  return elem;
};
