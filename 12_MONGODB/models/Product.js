const { ObjectID } = require('mongodb');
const conn = require('../db/conn');


class Product {
    constructor (name, price, description, image){
        this.name = name;
        this.price = price,
        this.description = description,
        this.image = image
    }

    async save(){
        const product = conn.db().collection('products').insertOne({
            name: this.name,
            price: this.price,
            description: this.description,
            image: this.image
        });

        return product;
    }

    async updateProduct(id){
        const product = conn.db().collection('products').updateOne({_id:ObjectID(id)}, {$set:this});
        return;
    }

    static getProducts(){
        const products = conn.db().collection('products').find().toArray();

        return products;
    }

    static async getProductByID(id){
        const product = await conn.db().collection('products').findOne({_id: ObjectID(id)});

        return product;
    }

    static async deleteProductByID(id){
        await conn.db().collection('products').deleteOne({_id: ObjectID(id)});
        return;
    }
}

module.exports = Product;