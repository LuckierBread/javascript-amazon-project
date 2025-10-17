export let cart = getFromStorage()||[]

export function addToCart(productId) {
    let itemInCart = false

    cart.forEach(item=>{
        if(item.productId === productId){
            item.quantity++;
            itemInCart = true;
        }
    })

    if(!itemInCart){
        cart.push({
            id: productId,
            quantity: 1
        })
    }
    saveToStorage()
}

export function removeFromCart(productId){
    cart = cart.filter((item)=> item.id!==productId)
    saveToStorage()
}

function saveToStorage(){
    localStorage.setItem('cart',JSON.stringify(cart))
}
function getFromStorage(){
    return JSON.parse(localStorage.getItem('cart'))
}