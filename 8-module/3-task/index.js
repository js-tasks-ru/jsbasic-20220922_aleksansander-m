export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;
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

    cartItem.count = cartItem.count + amount;

    if (cartItem.count == 0) {
      this.cartItems.splice(cartItemIndex, 1);

    }

    this.onProductUpdate(cartItem);

  }

  isEmpty() {
    return this.cartItems.length == 0;
  }

  getTotalCount() {
    return this.cartItems.reduce((sum, item) => sum + item.count, 0)
  }

  getTotalPrice() {
    return this.cartItems.reduce((sum, item) => sum + item.count * item.product.price, 0)
  }

  onProductUpdate(cartItem) {
    // реализуем в следующей задаче

    this.cartIcon.update(this);
  }
}

