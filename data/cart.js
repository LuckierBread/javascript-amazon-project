export const cart = [{
        id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
        quantity:5,
    },
    {
        id: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
        quantity:3
    }];

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