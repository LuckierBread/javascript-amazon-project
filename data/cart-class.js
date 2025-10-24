class Cart{
    cartItems;
    #localStorageKey;

    constructor(localStorageKey) {
        this.#localStorageKey = localStorageKey
        this.#loadFromStorage()
    }

    #loadFromStorage(){
        this.cartItems = JSON.parse(localStorage.getItem(this.localStorageKey))||[
        {
            id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
            quantity: 2,
            deliveryOptionId:1
        },{
            id: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
            quantity: 1,
            deliveryOptionId:0
        }]
    }

    saveToStorage(){
        localStorage.setItem(this.#localStorageKey,JSON.stringify(this.cartItems))
    }

    addToCart(productId) {
        let itemInCart = false

        this.cartItems.forEach(item=>{
            if(item.id === productId){
                item.quantity++;
                itemInCart = true;
            }
        })

        if(!itemInCart){
            this.cartItems.push({
                id: productId,
                quantity: 1,
                deliveryOptionId:0
            })
        }
        this.saveToStorage()
    }

    removeFromCart(productId){
    this.cartItems = this.cartItems.filter((item)=> item.id!==productId);
    this.saveToStorage();
    }

    updateDeliveryOption(productId,newDeliveryOptionId){
        this.cartItems.forEach((cartItem)=>{
            if(cartItem.id === productId){
                cartItem.deliveryOptionId = newDeliveryOptionId
            }
            this.saveToStorage();
        })
    }

    getCartQuantity(){
        let cartCount = 0;
        this.cartItems.forEach(item=>{
            cartCount += item.quantity;
        });
        return cartCount;
    }

    updateCartQuantity(productId,newQuantity){
        this.cartItems.forEach((cartItem)=>{
            if(cartItem.id === productId){
                cartItem.quantity=newQuantity
            }
            this.saveToStorage();
        })
    }
}

const cart = new Cart('cart-oop')
const buisnessCart = new Cart('cart-business')



console.log(cart)
console.log(buisnessCart)
