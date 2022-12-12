import createElement from '../../assets/lib/create-element.js';
import escapeHtml from '../../assets/lib/escape-html.js';

import Modal from '../../7-module/2-task/index.js';

export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;

    this.addEventListeners();
  }

  addProduct(product) {

    if (!product) {
      return;
    }

    let cartItem = this.cartItems.find(item => {
      return item.product != undefined & item.product.id == product.id;
    });

    if (cartItem == undefined) {
      this.cartItems.push({ product: product, count: 1 });
    } else {
      cartItem.count = cartItem.count + 1;
    }

    this.onProductUpdate(cartItem);
  }

  updateProductCount(productId, amount) {

    let cartItemIndex = this.cartItems.findIndex(item => {
      return item.product.id == productId;
    });

    let cartItem = this.cartItems[cartItemIndex];

    if (cartItem == undefined) {
      return;
    }

    cartItem.count = cartItem.count + amount;

    if (cartItem.count == 0) {
      this.cartItems.splice(cartItemIndex, 1);
    }

    this.onProductUpdate(cartItem);
  }

  isEmpty() {
    return this.cartItems.length == 0
  }

  getTotalCount() {
    return this.cartItems.reduce((sum, item) => sum + item.count, 0)
  }

  getTotalPrice() {
    return this.cartItems.reduce((sum, item) => sum + item.count * item.product.price, 0)
  }

  renderProduct(product, count) {
    return createElement(`
    <div class="cart-product" data-product-id="${product.id
      }">
      <div class="cart-product__img">
        <img src="/assets/images/products/${product.image}" alt="product">
      </div>
      <div class="cart-product__info">
        <div class="cart-product__title">${escapeHtml(product.name)}</div>
        <div class="cart-product__price-wrap">
          <div class="cart-counter">
            <button type="button" class="cart-counter__button cart-counter__button_minus">
              <img src="/assets/images/icons/square-minus-icon.svg" alt="minus">
            </button>
            <span class="cart-counter__count">${count}</span>
            <button type="button" class="cart-counter__button cart-counter__button_plus">
              <img src="/assets/images/icons/square-plus-icon.svg" alt="plus">
            </button>
          </div>
          <div class="cart-product__price">€${product.price.toFixed(2)}</div>
        </div>
      </div>
    </div>`);
  }

  renderOrderForm() {
    return createElement(`<form class="cart-form">
      <h5 class="cart-form__title">Delivery</h5>
      <div class="cart-form__group cart-form__group_row">
        <input name="name" type="text" class="cart-form__input" placeholder="Name" required value="Santa Claus">
        <input name="email" type="email" class="cart-form__input" placeholder="Email" required value="john@gmail.com">
        <input name="tel" type="tel" class="cart-form__input" placeholder="Phone" required value="+1234567">
      </div>
      <div class="cart-form__group">
        <input name="address" type="text" class="cart-form__input" placeholder="Address" required value="North, Lapland, Snow Home">
      </div>
      <div class="cart-buttons">
        <div class="cart-buttons__buttons btn-group">
          <div class="cart-buttons__info">
            <span class="cart-buttons__info-text">total</span>
            <span class="cart-buttons__info-price">€${this.getTotalPrice().toFixed(2)}</span>
          </div>
          <button type="submit" class="cart-buttons__button btn-group__button button">order</button>
        </div>
      </div>
    </form>`);
  }

  renderModal() {

    let modal = new Modal();

    let body = document.createElement('div');
    this.cartItems.forEach(item => {
      body.appendChild(this.renderProduct(item.product, item.count));
    });

    body.append(this.renderOrderForm());

    body.addEventListener('click', event => {

      let btn = event.target.closest('.cart-counter__button');

      if (btn === null) {
        return;
      }

      let productId = btn.closest('.cart-product').dataset.productId;
      let amount = 0;
      if (btn.classList.contains('cart-counter__button_minus')) {
        amount = -1;
      } else if (btn.classList.contains('cart-counter__button_plus')) {
        amount = 1;
      } else return;

      this.updateProductCount(productId, amount);

    })

    body.querySelector('.cart-form').addEventListener('submit', event => {
      this.onSubmit(event);
    });

    modal.setTitle('Your order');
    modal.setBody(body);
    modal.open();

    this.modalBody = body;
    this.modal = modal;
  }


  onProductUpdate(cartItem) {

    this.cartIcon.update(this);

    if (this.cartItems.length == 0) {
      this.modal.close();
    }

    if (cartItem == undefined) {
      return;
    }

    let productId = cartItem.product.id;
    let modalBody = this.modalBody;
    if (modalBody == undefined) {
      return;
    }

    let productCount = modalBody.querySelector(`[data-product-id="${productId}"] .cart-counter__count`);
    let productPrice = modalBody.querySelector(`[data-product-id="${productId}"] .cart-product__price`);
    let infoPrice = modalBody.querySelector(`.cart-buttons__info-price`);

    productCount.innerHTML = cartItem.count;

    productPrice.innerHTML = '€' + (cartItem.count * cartItem.product.price).toFixed(2);

    infoPrice.innerHTML = '€' + this.getTotalPrice().toFixed(2);

  }

 
  onSubmit(event) {

    event.preventDefault();

    let btn = this.modalBody.querySelector('.cart-buttons__button');
    btn.classList.add('is-loading');

    let handleReponse = response => {

      if (response.ok) {

        this.cartItems = [];

        this.modal.setTitle('Success!');
        this.modalBody = createElement(`
        <div class="modal__body-inner">
        <p>
        Order successful! Your order is being cooked :) <br>
        We’ll notify you about delivery time shortly.<br>
        <img src="/assets/images/delivery.gif">
        </p>
        </div>
        `);
        this.modal.setBody(this.modalBody);

      }
    };
    let formData = new FormData(this.modalBody.querySelector('.cart-form'));

    fetch('https://httpbin.org/post', {
      method: 'POST',
      body: formData
    }).then(handleReponse);


  };

  addEventListeners() {
    this.cartIcon.elem.onclick = () => this.renderModal();
  }
}

