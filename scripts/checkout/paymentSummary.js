import {cart} from '../../data/cart.js'
import {getProduct} from '../../data/products.js'
import{getDeliveryOption} from '../../data/deliveryOptions.js'
import { formatCurrency } from '../utils/money.js'

export function renderPaymentSummary(){
    let productsCostCents = 0
    let shippingCostCents = 0
    const  paymentSummaryElement = document.querySelector('.js-payment-summary') 

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
            <div>Items (3):</div>
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

        <button class="place-order-button button-primary">
        Place your order
        </button>
    `
    paymentSummaryElement.innerHTML = paymentSummaryHTML
}