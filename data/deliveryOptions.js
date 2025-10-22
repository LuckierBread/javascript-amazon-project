export function getDeliveryOption(deliveryOptionId){
    return deliveryOptions.find(option=>option.id===deliveryOptionId)
}

export const deliveryOptions = [{
    id:0,
    priceCents:0,
    days:1
    },{
    id: 1,
    priceCents:499,
    days: 3
    },{
    id:2,
    priceCents:999,
    days:7
}]