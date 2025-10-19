import {cart, getCartQuantity, removeFromCart} from '../data/cart.js'
import {products} from '../data/products.js'
import {formatCurrency} from './utils/money.js'
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js'
import {deliveryOptions} from '../data/deliveryOptions.js'

let productListHTML = ''
const orderSummeryElement = document.querySelector(".js-order-summary")

cart.forEach((cartItem)=>{
    let matchingItem

    products.forEach((product)=>{
        if(product.id===cartItem.id)
            matchingItem=product
    })

    productListHTML+=`
    <div class="cart-item-container js-cart-item-container-${matchingItem.id}">
            <div class="delivery-date">
              Delivery date: Tuesday, June 21
            </div>

            <div class="cart-item-details-grid">
              <img class="product-image"
                src="${matchingItem.image}">

              <div class="cart-item-details">
                <div class="product-name">
                  ${matchingItem.name}
                </div>
                <div class="product-price">
                  ${formatCurrency(matchingItem.priceCents)}
                </div>
                <div class="product-quantity">
                  <span>
                    Quantity: <span class="quantity-label">${cartItem.quantity}</span>
                  </span>
                  <span class="update-quantity-link link-primary js-update-quantity-link" data-product-id="${matchingItem.id}">
                    Update
                  </span>
                  <span class="delete-quantity-link link-primary js-delete-link"
                  data-product-id="${matchingItem.id}">
                    Delete
                  </span>
                </div>
              </div>

              <div class="delivery-options">
                <div class="delivery-options-title">
                  Choose a delivery option:
                </div>
                ${deliveryOptionsHTML(matchingItem.id)}
              </div>
            </div>
          </div>
    `
})

function deliveryOptionsHTML(productId){
  let today= dayjs()
  let deliveryHTML = ''

  deliveryOptions.forEach((option)=>{
    const priceString = option.priceCents===0
    ?'FREE Shipping'
    :formatCurrency(option.priceCents)

    deliveryHTML += `
    <div class="delivery-option">
      <input type="radio"
        class="delivery-option-input"
        name="delivery-option-${productId}">
      <div>
        <div class="delivery-option-date">
          ${today.add(option.days,'day').format('dddd, MMMM D')}
        </div>
        <div class="delivery-option-price">
          ${priceString}
        </div>
      </div>
    </div>`
  })
  return deliveryHTML
}

updateCartQuantity()

orderSummeryElement.innerHTML = productListHTML

document.querySelectorAll('.js-delete-link')
.forEach((link)=>{
    link.addEventListener('click',()=>{
        const productId = link.dataset.productId
        removeFromCart(productId)
        document.querySelector(`.js-cart-item-container-${productId}`).remove()
        updateCartQuantity()
    })
})

document.querySelectorAll('.js-update-quantity-link')
.forEach((link)=>{
  link.addEventListener('click',()=>{
    const productId = link.dataset.productId
    console.log(productId)
  })
})

function updateCartQuantity(){ 
  const cartCount = getCartQuantity();
        document.querySelector(".js-cart-quantity").innerHTML = `${String(cartCount)} items`;
}
