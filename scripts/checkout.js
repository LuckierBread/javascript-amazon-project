import {cart, updateDeliveryOption, getCartQuantity, updateCartQuantity, removeFromCart} from '../data/cart.js'
import {products} from '../data/products.js'
import {formatCurrency} from './utils/money.js'
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js'
import {deliveryOptions} from '../data/deliveryOptions.js'


function renderOrderSummery(){
  let productListHTML = ''
  const orderSummeryElement = document.querySelector(".js-order-summary")

  //Generate HTML for each product container
  cart.forEach((cartItem)=>{
      let matchingItem

      products.forEach((product)=>{
          if(product.id===cartItem.id)
              matchingItem=product
      })

      let dateString = dayjs()
      deliveryOptions.forEach((option)=>{
        if(option.id === cartItem.deliveryOptionId) {
          dateString = dateString.add(option.days,'day')
        }
      })

      productListHTML+=`
      <div class="cart-item-container js-cart-item-container-${matchingItem.id}">
              <div class="delivery-date">
                Delivery date: ${dateString.format('dddd, MMMM D')}
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
                      Quantity: <span class="quantity-label js-quantity-label-${matchingItem.id}"
                      data-product-id="${matchingItem.id}">
                      ${cartItem.quantity}
                      </span>
                    </span>
                    <span class="update-quantity-link link-primary js-update-quantity-link js-update-${matchingItem.id}" 
                    data-product-id="${matchingItem.id}">
                      Update
                    </span>
                    <input class="quantity-input js-quantity-input js-quantity-input-${matchingItem.id}"
                    data-product-id="${matchingItem.id}">
                    <span class="save-quantity-link js-save-quantity-link link-primary" 
                    data-product-id="${matchingItem.id}">Save
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
                  ${deliveryOptionsHTML(matchingItem.id,cartItem)}
                </div>
              </div>
            </div>
      `
  })

  updateCartHeaderQuantity()

  orderSummeryElement.innerHTML = productListHTML

  //Delete button, removes order from cart.
  document.querySelectorAll('.js-delete-link')
  .forEach((link)=>{
      link.addEventListener('click',()=>{
          const productId = link.dataset.productId
          removeFromCart(productId)
          document.querySelector(`.js-cart-item-container-${productId}`).remove()
          updateCartHeaderQuantity()
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
      renderOrderSummery()
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
  updateCartHeaderQuantity()
}

function updateCartHeaderQuantity(){
  const cartCount = getCartQuantity();
        document.querySelector(".js-cart-quantity").innerHTML = `${String(cartCount)} items`;
}

renderOrderSummery()