import{renderOrderSummary} from '../../scripts/checkout/orderSummary.js'
import { loadFromStorage } from '../../data/cart.js'
import { loadProductsFetch } from '../../data/products.js';

describe('test suite: renderOderSummary',()=>{
    const productid1 = "e43638ce-6aa0-4b85-b27f-e1d07eb678c6"
    const productId2 = "15b6fc6f-327a-4ec4-896f-486349e85a3d"

    beforeAll((done)=>{
        loadProductsFetch().then(()=>{
            done()
        })
    })
})

beforeEach(()=>{
    
})

describe('test suite: orderSummary.js',()=>{
    it('display the cart',()=>{
        // document.querySelector('.js-test-container').innerHTML= `
        // <div class="js-order-summary"></div>`
        
        const testContainer = document.querySelector('.js-test-container');
        console.log('Test container result:', testContainer);
        console.log('All divs:', document.querySelectorAll('div'));

        spyOn(localStorage,'getItem').and.callFake(()=>{
            return JSON.stringify([{
                id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
                quantity: 2,
                deliveryOptionId:1
            },{
                id: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
                quantity: 1,
                deliveryOptionId:0
            }])
        })
        loadFromStorage()
        renderOrderSummary()

        expect(
            document.querySelectorAll('.js-cart-item-container').length
        ).toEqual(2)
    })
})