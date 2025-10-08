const mongoose = require('mongoose')

const products = new mongoose.Schema({
    name : {
        type : String,
        required : true
    }
},{ timestamps: true })

const product = mongoose.model('Product',products)
module.exports = product;