import {cart, getCartQuantity} from '../../data/cart.js'
import {getProduct} from '../../data/products.js'
import{getDeliveryOption} from '../../data/deliveryOptions.js'
import { formatCurrency } from '../utils/money.js'
import { addOrder } from '../../data/orders.js'

export function renderPaymentSummary(){
    let productsCostCents = 0
    let shippingCostCents = 0
    const  paymentSummaryElement = document.querySelector('.js-payment-summary') 
    const cartQuantity = getCartQuantity()

    cart.forEach(cartItem => {
        const product = getProduct(cartItem.id)
        const deliveryOption = getDeliveryOption(cartItem.deliveryOptionId)

        productsCostCents +=product.priceCents*cartItem.quantity
        shippingCostCents += deliveryOption.priceCents
    })
    const totalBeforeTaxCents = shippingCostCents+productsCostCents
    const taxCents = totalBeforeTaxCents*0.1
    const totalAfterTaxCents = totalBeforeTaxCents + taxCents

    const paymentSummaryHTML =`
        <div class="payment-summary-title">
        Order Summary
        </div>

        <div class="payment-summary-row">
            <div>Items (${cartQuantity}):</div>
            <div class="payment-summary-money">
                ${formatCurrency(productsCostCents)}
            </div>
        </div>

        <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">
                ${formatCurrency(shippingCostCents)}
            </div>
        </div>

        <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">
                ${formatCurrency(totalBeforeTaxCents)}
            </div>
        </div>

        <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">
                ${formatCurrency(taxCents)}
            </div>
        </div>

        <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">
                ${formatCurrency(totalAfterTaxCents)}
            </div>
        </div>

        <button class="place-order-button button-primary
        js-place-order">
        Place your order
        </button>
    `
    paymentSummaryElement.innerHTML = paymentSummaryHTML

    document.querySelector('.js-place-order')
    .addEventListener('click',async ()=>{
        const cartForBackend = cart.map((cartItem)=>({
            productId:cartItem.id,
            quantity: cartItem.quantity,
            deliveryOptionId:cartItem.deliveryOptionId
        }))
        console.log(cartForBackend)
        try{
            const response = await fetch('https://supersimplebackend.dev/orders',{
                method:'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    cart: cartForBackend
                })
            })
            const order = await response.json()
            addOrder(order)
        }catch(error){
            console.log("something went wrong")
        }

        window.location.href = 'orders.html'
    })
}