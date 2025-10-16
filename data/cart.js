export const cart = [];

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
            productId: productId,
            quantity: 1
        })
    }
}