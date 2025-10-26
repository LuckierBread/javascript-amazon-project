import {renderOrderSummary} from './checkout/orderSummary.js'
import {renderPaymentSummary} from './checkout/paymentSummary.js'
import { loadProductsFetch } from '../data/products.js'
import { loadCart } from '../data/cart.js'


async function loadPage(){
    try{
        await loadProductsFetch()
        await loadCart()
    } 
    catch(error){
        console.log('ops intercepted the package')
    }
    renderOrderSummary()
    renderPaymentSummary()
}
loadPage()

// Promise.all([
//     loadProductsFetch(),

//     new Promise((resolve)=>{
//         loadCart(()=>{
//             resolve()
//         })
//     })

// ]).then(()=>{
//     renderOrderSummary()
//     renderPaymentSummary() 
// })