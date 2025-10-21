export let cart = getFromStorage()||[
    {
        id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
        quantity: 2,
        deliveryOptionId:1
    },{
        id: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
        quantity: 1,
        deliveryOptionId:0
    }]

export function addToCart(productId) {
    let itemInCart = false

    cart.forEach(item=>{
        if(item.id === productId){
            item.quantity++;
            itemInCart = true;
        }
    })

    if(!itemInCart){
        cart.push({
            id: productId,
            quantity: 1,
            deliveryOptionId:0
        })
    }
    saveToStorage()
}

export function removeFromCart(productId){
    cart = cart.filter((item)=> item.id!==productId);
    saveToStorage();
}

export function getCartQuantity(){
    let cartCount = 0;
    cart.forEach(item=>{
        cartCount += item.quantity;
    });
    return cartCount;
}

export function updateCartQuantity(productId,newQuantity){
    cart.forEach((cartItem)=>{
        if(cartItem.id === productId){
            cartItem.quantity=newQuantity
        }
        saveToStorage();
    })
}

export function updateDeliveryOption(productId,newDeliveryOptionId){
    cart.forEach((cartItem)=>{
        if(cartItem.id === productId){
            cartItem.deliveryOptionId = newDeliveryOptionId
        }
        saveToStorage();
    })
}

function saveToStorage(){
    localStorage.setItem('cart',JSON.stringify(cart))
}
function getFromStorage(){
    return JSON.parse(localStorage.getItem('cart'))
}