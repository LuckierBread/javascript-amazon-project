import {cart, updateDeliveryOption, getCartQuantity, updateCartQuantity, removeFromCart} from '../../data/cart.js'
import {getProduct} from '../../data/products.js'
import {formatCurrency} from '../utils/money.js'
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js'
import {deliveryOptions, getDeliveryOption} from '../../data/deliveryOptions.js'
import{renderPaymentSummary} from './paymentSummary.js'
import { renderCheckoutHeader } from './checkoutHeader.js'

export function renderOrderSummary(){
    let productListHTML = ''
    const orderSummaryElement = document.querySelector(".js-order-summary")

    //Generate HTML for each product container
    cart.forEach((cartItem)=>{
    const product = getProduct(cartItem.id)
    let dateString = dayjs()
    const deliveryOption = getDeliveryOption(cartItem.deliveryOptionId)
    dateString = dateString.add(deliveryOption.days,'day')

    renderCheckoutHeader()

    productListHTML+=`
    <div class="cart-item-container js-cart-item-container-${product.id}">
            <div class="delivery-date">
            Delivery date: ${dateString.format('dddd, MMMM D')}
            </div>

            <div class="cart-item-details-grid">
            <img class="product-image"
                src="${product.image}">

            <div class="cart-item-details">
                <div class="product-name">
                ${product.name}
                </div>
                <div class="product-price">
                ${formatCurrency(product.priceCents)}
                </div>
                <div class="product-quantity">
                <span>
                    Quantity: <span class="quantity-label js-quantity-label-${product.id}"
                    data-product-id="${product.id}">
                    ${cartItem.quantity}
                    </span>
                </span>
                <span class="update-quantity-link link-primary js-update-quantity-link js-update-${product.id}" 
                data-product-id="${product.id}">
                    Update
                </span>
                <input class="quantity-input js-quantity-input js-quantity-input-${product.id}"
                data-product-id="${product.id}">
                <span class="save-quantity-link js-save-quantity-link link-primary" 
                data-product-id="${product.id}">Save
                </span>
                <span class="delete-quantity-link link-primary js-delete-link"
                data-product-id="${product.id}">
                    Delete
                </span>
                </div>
            </div>

            <div class="delivery-options">
                <div class="delivery-options-title">
                Choose a delivery option:
                </div>
                ${deliveryOptionsHTML(product.id,cartItem)}
            </div>
            </div>
        </div>
      `
  })

  orderSummaryElement.innerHTML = productListHTML

  //Delete button, removes order from cart.
  document.querySelectorAll('.js-delete-link')
  .forEach((link)=>{
      link.addEventListener('click',()=>{
          const productId = link.dataset.productId
          removeFromCart(productId)
          renderCheckoutHeader()
          renderOrderSummary()  
          renderPaymentSummary()
      })
  })

  //adds listener to update link that shows the quantity input and save link
  document.querySelectorAll('.js-update-quantity-link')
  .forEach((link)=>{
    link.addEventListener('click',()=>{
      const productId = link.dataset.productId
      const cartItemContainer = document.querySelector(`.js-cart-item-container-${productId}`)
      cartItemContainer.classList.add('is-editing-quantity')
    })
  })

  //adds listener to save link to update the cart quantity and return to defult state
  document.querySelectorAll('.js-save-quantity-link')
  .forEach((link)=>{
    link.addEventListener('click',()=>saveChanges(link))
    })

  document.querySelectorAll('.js-quantity-input')
  .forEach((element)=>{
    element.addEventListener('keydown',(event)=>{
      if(event.key==='Enter') saveChanges(element)
    })
  })

  document.querySelectorAll('.js-delivery-option')
  .forEach((element)=>{
    element.addEventListener('click',()=>{
      const{productId, deliveryOptionId} = element.dataset
      updateDeliveryOption(productId,Number(deliveryOptionId))
      renderOrderSummary()
      renderPaymentSummary()
    })
  })
}

//generates HTML for the devlivery options in each product container
function deliveryOptionsHTML(productId,cartItem){
  let today= dayjs()
  let deliveryHTML = ''

  deliveryOptions.forEach((option)=>{
    const priceString = option.priceCents===0
    ?'FREE '
    :formatCurrency(option.priceCents)+' - '

    const isChecked = option.id === cartItem.deliveryOptionId

    deliveryHTML += `
    <div class="delivery-option js-delivery-option"
    data-product-id="${productId}"
    data-delivery-option-id="${option.id}">
      <input type="radio"
      ${isChecked?'checked':''}
        class="delivery-option-input"
        name="delivery-option-${productId}">
      <div>
        <div class="delivery-option-date">
          ${today.add(option.days,'day').format('dddd, MMMM D')}
        </div>
        <div class="delivery-option-price">
          ${priceString}Shipping
        </div>
      </div>
    </div>`
  })
  return deliveryHTML
}

function saveChanges(link){
  const productId = link.dataset.productId
  const cartItemContainer = document.querySelector(`.js-cart-item-container-${productId}`)
  cartItemContainer.classList.remove('is-editing-quantity')

  const inputElement = document.querySelector(`.js-quantity-input-${productId}`)
  const newValue = parseInt(inputElement.value)
  updateCartQuantity(productId, newValue)

  const quantityElement = document.querySelector(`.js-quantity-label-${productId}`)
  quantityElement.innerHTML = newValue
  renderCheckoutHeader()
  renderPaymentSummary()
}

renderOrderSummary()