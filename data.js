
const request = require('request')
const api = require('./api')

class Publisher {
    constructor(id, name, createdAt) {
        this.id = id;
        this.name = name;
        this.createdAt = createdAt;
    }

    static fromObject(jsonObject){
        return new Publisher(
            jsonObject.id, 
            jsonObject.name, 
            jsonObject.createdAt
        )
    }
    
    items() {
        let self = this;
        self.id
        api.apiPublisher(self.id);
    }

    toTableElem() {
        return "<tr><td>" + this.id + "</td><td>" + this.name + "</td><td>" + this.createdAt + "</td></tr>";
    }
}

class Item {
    constructor(id, name, createdAt, publisherId, price, color, publisher_id, avatar) {
        this.id = id;
        this.name = name;
        this.createdAt = createdAt;
        this.publisherId = publisherId;
        this.price = price;
        this.color = color;
        this.publisher_id = publisher_id;
        this.avatar = avatar;
    }

    static fromObject(jsonObject){
        return new Item(
            jsonObject.id, 
            jsonObject.name, 
            jsonObject.createdAt,
            jsonObject.publisherId,
            jsonObject.price,
            jsonObject.color,
            jsonObject.publisher_id,
            jsonObject.avatar
        )
    }

    publisher() {
        let self = this;
        return new Promise(function(resolve, reject) {
            self.publisherId;
            api.apiPublisher(self.publisherId);
        });
    };

    toTableElem() {
        return "<tr><td>" + this.id + "</td><td>" + this.name + "</td><td>" + this.createdAt + "</td><td>" + this.publisherId + "</td><td>" + this.price + "</td><td>" + this.color + "</td><td>" + this.publisher_id + "</td><td>" + this.avatar + "</td></tr>";
    }
}

module.exports = {
    Item,
    Publisher 
}
    