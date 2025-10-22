import { getCartQuantity } from "../../data/cart.js";

export function renderCheckoutHeader(){
    const cartCount = getCartQuantity();
    document.querySelector(".js-cart-quantity").innerHTML = `${String(cartCount)} items`;
}