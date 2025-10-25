class Car{
    brand;
    model;
    speed = 0;

    constructor(item){
        this.brand = item.brand
        this.model = item.model
        this.speed = itemm.speed
    }

    displayInfo(){
        console.log(`${this.brand}, ${this.model}`)
    }

    go(){
        if(this.speed<=200)
        this.speed +=5
    }

    brake(){
        if(this.speed>=0){
            this.speed-=5
        }
    }
}

car1 = new Car({brand: 'chev', model: 'volt',speed:196})
car2 = new Car({brand: 'ford', model: 'mustang',speed:4})